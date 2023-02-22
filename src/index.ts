import { Coin, coin, Registry, OfflineSigner, EncodeObject } from '@cosmjs/proto-signing'
import {
  SigningStargateClient,
  SignerData,
  defaultRegistryTypes as defaultStargateTypes,
  AminoTypes,
  createAuthzAminoConverters,
  createBankAminoConverters,
  createDistributionAminoConverters,
  createFeegrantAminoConverters,
  createGovAminoConverters,
  createIbcAminoConverters,
  createStakingAminoConverters,
} from '@cosmjs/stargate'

import * as amino from '@cosmjs/amino'
import { createVestingAminoConverters } from '@cosmjs/stargate/build/modules' // not exported from top level, but included in default amino converter types
import { toAccAddress } from '@cosmjs/stargate/build/queryclient/utils'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'

import BN from 'bn.js'
import { osmosis, thorchain } from './amino'
import * as codecs from './proto'

type StdTxWithMsgs = Omit<amino.StdTx, 'msg'> & {
  readonly msgs: readonly amino.AminoMsg[]
}
  

export interface ProtoTx {
  readonly msg: readonly EncodeObject[]
  readonly fee: {
    readonly amount: readonly Coin[];
    readonly gas: string;
  }
  readonly signatures: readonly amino.StdSignature[]
  readonly memo: string | undefined
}

const isProtoTx = (tx: unknown): tx is ProtoTx => {
  const msg = (tx as ProtoTx).msg[0]
  return 'typeUrl' in msg
}

const getMessages = (tx: StdTxWithMsgs | ProtoTx) => 'msgs' in tx ? tx.msgs : tx.msg

export async function sign(
  signerAddress: string,
  tx: StdTxWithMsgs | ProtoTx,
  signer: OfflineSigner,
  { accountNumber, sequence, chainId }: SignerData,
  prefix = "cosmos" // should ideally come from signer, but not exposed by cosmjs at this time
): Promise<{
  serialized: string
  body: string
  authInfoBytes: string
  signatures: string[]
}> {

  const myAminoTypes = new AminoTypes({
    ...createAuthzAminoConverters(),
    ...createBankAminoConverters(),
    ...createDistributionAminoConverters(),
    ...createFeegrantAminoConverters(),
    ...createGovAminoConverters(),
    ...createIbcAminoConverters(),
    ...createStakingAminoConverters(prefix),
    ...createVestingAminoConverters(),
    ...thorchain.createAminoConverters(),
    ...osmosis.createAminoConverters()
  })

  const myRegistry = new Registry(defaultStargateTypes)

  // osmosis
  myRegistry.register('/osmosis.gamm.v1beta1.MsgSwapExactAmountIn', codecs.osmosis.gamm.v1beta1.MsgSwapExactAmountIn)
  myRegistry.register('/osmosis.gamm.v1beta1.MsgSwapExactAmountOut', codecs.osmosis.gamm.v1beta1.MsgSwapExactAmountOut)
  myRegistry.register('/osmosis.gamm.v1beta1.MsgJoinPool', codecs.osmosis.gamm.v1beta1.MsgJoinPool)
  myRegistry.register('/osmosis.gamm.v1beta1.MsgExitPool', codecs.osmosis.gamm.v1beta1.MsgExitPool)
  myRegistry.register('/osmosis.gamm.v1beta1.MsgCreatePool', codecs.osmosis.gamm.v1beta1.MsgCreatePool)
  myRegistry.register('/osmosis.gamm.v1beta1.PoolParams', codecs.osmosis.gamm.v1beta1.PoolParams)
  myRegistry.register('/osmosis.gamm.v1beta1.PoolAsset', codecs.osmosis.gamm.v1beta1.PoolAsset)
  myRegistry.register('/osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn', codecs.osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn)
  myRegistry.register('/osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut', codecs.osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut)
  myRegistry.register('/osmosis.gamm.v1beta1.SwapAmountInRoute', codecs.osmosis.gamm.v1beta1.SwapAmountInRoute)
  myRegistry.register('/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn', codecs.osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn)
  myRegistry.register('/osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn', codecs.osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn)
  myRegistry.register('/osmosis.lockup.MsgLockTokens', codecs.osmosis.lockup.MsgLockTokens)
  myRegistry.register('/osmosis.lockup.MsgBeginUnlocking', codecs.osmosis.lockup.MsgBeginUnlocking)
  myRegistry.register('/osmosis.lockup.MsgBeginUnlockingAll', codecs.osmosis.lockup.MsgBeginUnlockingAll)

  // thorchain
  myRegistry.register('/types.MsgSend', codecs.thorchain_types.MsgSend)
  myRegistry.register('/types.MsgDeposit', codecs.thorchain_types.MsgDeposit)

  const clientOffline = await SigningStargateClient.offline(signer, { registry: myRegistry, aminoTypes: myAminoTypes, })
  const messages = getMessages(tx)

  if (messages.length !== 1) throw new Error('support for single message signing only')

  const { msg, fee, memo } = (() => {
    if (isProtoTx(tx)) {
      return tx
    } else {
      return parse_legacy_tx_format(tx)
    }
  })()

  if (!fee) throw new Error('fee must be defined after conversion')

  const signerData: SignerData = { accountNumber: Number(accountNumber), sequence: Number(sequence), chainId }
  const txRaw = await clientOffline.sign(signerAddress, msg, fee, memo ?? '', signerData)
  const encoded = TxRaw.encode(txRaw).finish()

  const output = {
    serialized: Buffer.from(encoded).toString('base64'),
    body: Buffer.from(txRaw.bodyBytes).toString('base64'),
    authInfoBytes: Buffer.from(txRaw.authInfoBytes).toString('base64'),
    signatures: txRaw.signatures.map((x) => Buffer.from(x).toString('base64'))
  }

  return output
}

const scrubCoin = (x: Coin) => {
  if (!x.amount) throw new Error('missing coin amount')
  if (!x.denom) throw new Error('missing coin denom')

  return coin(x.amount, x.denom)
}

const scrubCoins = (x: readonly Coin[]) => x.filter(c => c.amount).map(scrubCoin)

type Route = { pool_id: unknown; token_out_denom: unknown }

const scrubRoute = (x: Route) => {
  if (!x.pool_id) throw new Error('missing route pool_id')
  if (!x.token_out_denom) throw new Error('missing route token_out_denom')

  return {
    poolId: x.pool_id,
    tokenOutDenom: x.token_out_denom
  }
}

const scrubRoutes = (x: Route[]) => x.map(scrubRoute)

function parse_legacy_tx_format(tx:  StdTxWithMsgs): ProtoTx {
  if(!tx.msgs) throw new Error('msgs array improperly formatted!')

  if (tx.msgs.length !== 1) throw new Error('multiple msgs not supported!')

  return {
    ...convertLegacyMsg(tx.msgs[0]),
    fee: {
      amount: scrubCoins(tx.fee.amount),
      gas: tx.fee.gas
    },
    memo: tx.memo,
    signatures: tx.signatures,
  }
}

function convertLegacyMsg(msg: amino.AminoMsg): Pick<ProtoTx, 'msg'> {
  // switch for each tx type supported
  switch (msg.type) {
    case 'thorchain/MsgSend':
      if (!msg.value.from_address) throw new Error('Missing from_address in msg')
      if (!msg.value.to_address) throw new Error('Missing to_address in msg')

      return {
        msg: [{
          typeUrl: '/types.MsgSend',
          value: {
            fromAddress: toAccAddress(msg.value.from_address),
            toAddress: toAccAddress(msg.value.to_address),
            amount: scrubCoins(msg.value.amount)
          }
        }],
      }
    case 'thorchain/MsgDeposit':
      if (msg.value.coins?.length !== 1) {
        throw new Error(`expected 1 input coin got ${msg.value.coins?.length}`)
      }
      const inCoin = msg.value.coins[0]
      const parts = inCoin.asset.split(".")
      if (parts.length < 1) {
        throw new Error(`expected 1 or 2 parts to asset got ${parts.length}`)
      }

      var chain: string
      var symbol: string
      if (parts.length > 1) {
        [chain, symbol] = parts
      } else {
        [symbol] = parts
        chain = "THOR"
      }

      const [ticker] = symbol.split('-')
      return {
        msg: [{
          typeUrl: '/types.MsgDeposit',
          value: {
            coins: [
              {
                asset: {
                  chain: chain,
                  symbol: symbol,
                  ticker: ticker,
                  synth: false
                },
                amount: inCoin.amount
              }
            ],
            memo: msg.value.memo,
            signer: toAccAddress(msg.value.signer)
          }
        }]
      }
    case 'cosmos-sdk/MsgSend':
      if (!msg.value.from_address) throw new Error('Missing from_address in msg')
      if (!msg.value.to_address) throw new Error('Missing to_address in msg')

      return {
        msg: [{
          typeUrl: '/cosmos.bank.v1beta1.MsgSend',
          value: {
            fromAddress: msg.value.from_address,
            toAddress: msg.value.to_address,
            amount: scrubCoins(msg.value.amount)
          }
        }]
      }
    case 'cosmos-sdk/MsgDelegate':
      if (!msg.value.delegator_address) throw new Error('Missing delegator_address in msg')
      if (!msg.value.validator_address) throw new Error('Missing validator_address in msg')

      return {
        msg: [{
          typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
          value: {
            delegatorAddress: msg.value.delegator_address,
            validatorAddress: msg.value.validator_address,
            amount: scrubCoin(msg.value.amount)
          }
        }]
      }
    case 'cosmos-sdk/MsgUndelegate':
      if (!msg.value.delegator_address) throw new Error('Missing delegator_address in msg')
      if (!msg.value.validator_address) throw new Error('Missing validator_address in msg')

      return {
        msg: [{
          typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
          value: {
            delegatorAddress: msg.value.delegator_address,
            validatorAddress: msg.value.validator_address,
            amount: scrubCoin(msg.value.amount)
          }
        }]
      }
    case 'cosmos-sdk/MsgBeginRedelegate':
      if (!msg.value.delegator_address) throw new Error('Missing delegator_address in msg')
      if (!msg.value.validator_src_address) throw new Error('Missing validator_src_address in msg')
      if (!msg.value.validator_dst_address) throw new Error('Missing validator_dst_address in msg')

      return {
        msg: [{
          typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
          value: {
            delegatorAddress: msg.value.delegator_address,
            validatorSrcAddress: msg.value.validator_src_address,
            validatorDstAddress: msg.value.validator_dst_address,
            amount: scrubCoin(msg.value.amount)
          }
        }]
      }
    case 'cosmos-sdk/MsgWithdrawDelegationReward':
      if (!msg.value.delegator_address) throw new Error('Missing delegator_address in msg')
      if (!msg.value.validator_address) throw new Error('Missing validator_address in msg')

      return {
        msg: [{
          typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
          value: {
            delegatorAddress: msg.value.delegator_address,
            validatorAddress: msg.value.validator_address,
            amount: msg.value.amount ? scrubCoin(msg.value.amount) : undefined
          }
        }]
      }
    case 'cosmos-sdk/MsgTransfer':
      if (!msg.value.receiver) throw new Error('Missing receiver in msg')
      if (!msg.value.sender) throw new Error('Missing sender in msg')
      if (!msg.value.source_channel) throw new Error('Missing source_channel in msg')
      if (!msg.value.source_port) throw new Error('Missing source_port in msg')
      if (!msg.value.timeout_height.revision_height)
        throw new Error('Missing revision_height in msg value.timeout_height')

      return {
        msg: [{
          typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
          value: {
            receiver: msg.value.receiver,
            sender: msg.value.sender,
            sourceChannel: msg.value.source_channel,
            sourcePort: msg.value.source_port,
            token: scrubCoin(msg.value.token),
            timeoutHeight: {
              revisionHeight: msg.value.timeout_height.revision_height,
              revisionNumber: msg.value.timeout_height.revision_number
            },
            timeoutTimestamp: "0"
          }
        }]
      }
    case 'osmosis/gamm/swap-exact-amount-in':
      if (!msg.value.sender) throw new Error('Missing sender in msg')
      if (!msg.value.token_in) throw new Error('Missing token_in in msg')
      if (!msg.value.token_out_min_amount) throw new Error('Missing token_out_min_amount in msg')
      if (msg.value.routes.length !== 1) throw new Error('bad routes length')

      return {
        msg: [{
          typeUrl: '/osmosis.gamm.v1beta1.MsgSwapExactAmountIn',
          value: {
            sender: msg.value.sender,
            tokenIn: scrubCoin(msg.value.token_in),
            tokenOutMinAmount: msg.value.token_out_min_amount,
            routes: scrubRoutes(msg.value.routes)
          }
        }]
      }
    case 'osmosis/gamm/join-swap-extern-amount-in':
        if (!msg.value.pool_id) throw new Error('Missing pool_id in msg')
        if (!msg.value.sender) throw new Error('Missing sender in msg')
        if (!msg.value.share_out_min_amount) throw new Error('Missing share_out_min_amount in msg')
        if (!msg.value.tokenIn) throw new Error('Missing tokenIn in msg')
  
        return {
          msg: [{
            typeUrl: '/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn',
            value: {
              poolId: msg.value.pool_id,
              sender: msg.value.sender,
              shareOutMinAmount: msg.value.share_out_min_amount,
              tokenIn: scrubCoin(msg.value.token_in),
              
            }
          }]
        }
    case 'osmosis/gamm/join-pool':
      if (!msg.value.sender) throw new Error('Missing sender in msg')
      if (!msg.value.pool_id) throw new Error('Missing pool_id in msg')
      if (!msg.value.share_out_amount) throw new Error('Missing share_out_amount in msg')
      if (msg.value.token_in_maxs.length  !== 2) throw new Error('Bad token_in_maxs length')

      return {
        msg: [{
          typeUrl: '/osmosis.gamm.v1beta1.MsgJoinPool',
          value: {
            sender: msg.value.sender,
            poolId: msg.value.pool_id,
            shareOutAmount: msg.value.share_out_amount,
            tokenInMaxs: scrubCoins(msg.value.token_in_maxs)
          }
        }]
      }
    case 'osmosis/gamm/exit-pool':
      if (!msg.value.sender) throw new Error('Missing sender in msg')
      if (!msg.value.pool_id) throw new Error('Missing pool_id in msg')
      if (!msg.value.share_in_amount) throw new Error('Missing share_in_amount in msg')
      if (msg.value.token_out_mins.length !== 2) throw new Error('Bad token_out_mins length')

      return {
        msg: [{
          typeUrl: '/osmosis.gamm.v1beta1.MsgExitPool',
          value: {
            sender: msg.value.sender,
            poolId: msg.value.pool_id,
            shareInAmount: msg.value.share_in_amount,
            tokenOutMins: scrubCoins(msg.value.token_out_mins)
          }
        }]
      }
    case 'osmosis/lockup/lock-tokens': {
      if (!msg.value.owner) throw new Error('Missing owner in msg')
      if (!msg.value.duration) throw new Error('Missing duration in msg')

      const duration = new BN(msg.value.duration)
      const nanosPerSecond = new BN("1000000000")
      const seconds = duration.div(nanosPerSecond).toString()
      const nanos = duration.umod(nanosPerSecond).toString()

      return {
        msg: [{
          typeUrl: '/osmosis.lockup.MsgLockTokens',
          value: {
            owner: msg.value.owner,
            duration: { seconds, nanos },
            coins: scrubCoins(msg.value.coins)
          }
        }]
      }
    }
    case 'osmosis/lockup/begin-unlock-period-lock':
      if (!msg.value.owner) throw new Error('Missing owner in msg')

      return {
        msg: [{
          typeUrl: '/osmosis.lockup.MsgBeginUnlockingAll',
          value: {
            owner: msg.value.owner
          }
        }]
      }
    case 'osmosis/lockup/begin-unlock-by-id':
      if (!msg.value.id) throw new Error('Missing id in msg')
      if (!msg.value.owner) throw new Error('Missing owner in msg')

      return {
        msg: [{
          typeUrl: '/osmosis.lockup.MsgBeginUnlocking',
          value: {
            owner: msg.value.owner,
            id: msg.value.id
          }
        }]
      }
    default:
      throw new Error('Unhandled tx type! type: ' + msg.type)
  }
}
