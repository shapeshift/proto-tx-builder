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
  readonly messages: readonly EncodeObject[]
  readonly fee: {
    readonly amount: readonly Coin[];
    readonly gas: string;
  }
  readonly signatures: readonly amino.StdSignature[]
  readonly memo: string | undefined
}

const isProtoTx = (tx: unknown): tx is ProtoTx => {
  const message = (tx as ProtoTx).messages[0]
  return 'typeUrl' in message
}

const getMessages = (tx: StdTxWithMsgs | ProtoTx) => 'msgs' in tx ? tx.msgs : tx.messages

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
  const txMessages = getMessages(tx)

  if (txMessages.length !== 1) throw new Error('support for single message signing only')

  const { messages, fee, memo } = (() => {
    if (isProtoTx(tx)) {
      return tx
    } else {
      return parse_legacy_tx_format(tx)
    }
  })()

  if (!fee) throw new Error('fee must be defined after conversion')

  const signerData: SignerData = { accountNumber: Number(accountNumber), sequence: Number(sequence), chainId }
  const txRaw = await clientOffline.sign(signerAddress, messages, fee, memo ?? '', signerData)
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

function convertLegacyMsg(message: amino.AminoMsg): Pick<ProtoTx, 'messages'> {
  // switch for each tx type supported
  switch (message.type) {
    case 'thorchain/MsgSend':
      if (!message.value.from_address) throw new Error('Missing from_address in msgs')
      if (!message.value.to_address) throw new Error('Missing to_address in msgs')

      return {
        messages: [{
          typeUrl: '/types.MsgSend',
          value: {
            fromAddress: toAccAddress(message.value.from_address),
            toAddress: toAccAddress(message.value.to_address),
            amount: scrubCoins(message.value.amount)
          }
        }],
      }
    case 'thorchain/MsgDeposit':
      if (message.value.coins?.length !== 1) {
        throw new Error(`expected 1 input coin got ${message.value.coins?.length}`)
      }
      const inCoin = message.value.coins[0]
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
        messages: [{
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
            memo: message.value.memo,
            signer: toAccAddress(message.value.signer)
          }
        }]
      }
    case 'cosmos-sdk/MsgSend':
      if (!message.value.from_address) throw new Error('Missing from_address in msgs')
      if (!message.value.to_address) throw new Error('Missing to_address in msgs')

      return {
        messages: [{
          typeUrl: '/cosmos.bank.v1beta1.MsgSend',
          value: {
            fromAddress: message.value.from_address,
            toAddress: message.value.to_address,
            amount: scrubCoins(message.value.amount)
          }
        }]
      }
    case 'cosmos-sdk/MsgDelegate':
      if (!message.value.delegator_address) throw new Error('Missing delegator_address in msgs')
      if (!message.value.validator_address) throw new Error('Missing validator_address in msgs')

      return {
        messages: [{
          typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
          value: {
            delegatorAddress: message.value.delegator_address,
            validatorAddress: message.value.validator_address,
            amount: scrubCoin(message.value.amount)
          }
        }]
      }
    case 'cosmos-sdk/MsgUndelegate':
      if (!message.value.delegator_address) throw new Error('Missing delegator_address in msgs')
      if (!message.value.validator_address) throw new Error('Missing validator_address in msgs')

      return {
        messages: [{
          typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
          value: {
            delegatorAddress: message.value.delegator_address,
            validatorAddress: message.value.validator_address,
            amount: scrubCoin(message.value.amount)
          }
        }]
      }
    case 'cosmos-sdk/MsgBeginRedelegate':
      if (!message.value.delegator_address) throw new Error('Missing delegator_address in msgs')
      if (!message.value.validator_src_address) throw new Error('Missing validator_src_address in msgs')
      if (!message.value.validator_dst_address) throw new Error('Missing validator_dst_address in msgs')

      return {
        messages: [{
          typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
          value: {
            delegatorAddress: message.value.delegator_address,
            validatorSrcAddress: message.value.validator_src_address,
            validatorDstAddress: message.value.validator_dst_address,
            amount: scrubCoin(message.value.amount)
          }
        }]
      }
    case 'cosmos-sdk/MsgWithdrawDelegationReward':
      if (!message.value.delegator_address) throw new Error('Missing delegator_address in msgs')
      if (!message.value.validator_address) throw new Error('Missing validator_address in msgs')

      return {
        messages: [{
          typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
          value: {
            delegatorAddress: message.value.delegator_address,
            validatorAddress: message.value.validator_address,
            amount: message.value.amount ? scrubCoin(message.value.amount) : undefined
          }
        }]
      }
    case 'cosmos-sdk/MsgTransfer':
      if (!message.value.receiver) throw new Error('Missing receiver in msgs')
      if (!message.value.sender) throw new Error('Missing sender in msgs')
      if (!message.value.source_channel) throw new Error('Missing source_channel in msgs')
      if (!message.value.source_port) throw new Error('Missing source_port in msgs')
      if (!message.value.timeout_height.revision_height)
        throw new Error('Missing revision_height in msgs value.timeout_height')

      return {
        messages: [{
          typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
          value: {
            receiver: message.value.receiver,
            sender: message.value.sender,
            sourceChannel: message.value.source_channel,
            sourcePort: message.value.source_port,
            token: scrubCoin(message.value.token),
            timeoutHeight: {
              revisionHeight: message.value.timeout_height.revision_height,
              revisionNumber: message.value.timeout_height.revision_number
            },
            timeoutTimestamp: "0"
          }
        }]
      }
    case 'osmosis/gamm/swap-exact-amount-in':
      if (!message.value.sender) throw new Error('Missing sender in msgs')
      if (!message.value.token_in) throw new Error('Missing token_in in msgs')
      if (!message.value.token_out_min_amount) throw new Error('Missing token_out_min_amount in msgs')
      if (message.value.routes.length !== 1) throw new Error('bad routes length')

      return {
        messages: [{
          typeUrl: '/osmosis.gamm.v1beta1.MsgSwapExactAmountIn',
          value: {
            sender: message.value.sender,
            tokenIn: scrubCoin(message.value.token_in),
            tokenOutMinAmount: message.value.token_out_min_amount,
            routes: scrubRoutes(message.value.routes)
          }
        }]
      }
    case 'osmosis/gamm/join-swap-extern-amount-in':
        if (!message.value.pool_id) throw new Error('Missing pool_id in msgs')
        if (!message.value.sender) throw new Error('Missing sender in msgs')
        if (!message.value.share_out_min_amount) throw new Error('Missing share_out_min_amount in msgs')
        if (!message.value.tokenIn) throw new Error('Missing tokenIn in msgs')
  
        return {
          messages: [{
            typeUrl: '/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn',
            value: {
              poolId: message.value.pool_id,
              sender: message.value.sender,
              shareOutMinAmount: message.value.share_out_min_amount,
              tokenIn: scrubCoin(message.value.token_in),
              
            }
          }]
        }
    case 'osmosis/gamm/join-pool':
      if (!message.value.sender) throw new Error('Missing sender in msgs')
      if (!message.value.pool_id) throw new Error('Missing pool_id in msgs')
      if (!message.value.share_out_amount) throw new Error('Missing share_out_amount in msgs')
      if (message.value.token_in_maxs.length  !== 2) throw new Error('Bad token_in_maxs length')

      return {
        messages: [{
          typeUrl: '/osmosis.gamm.v1beta1.MsgJoinPool',
          value: {
            sender: message.value.sender,
            poolId: message.value.pool_id,
            shareOutAmount: message.value.share_out_amount,
            tokenInMaxs: scrubCoins(message.value.token_in_maxs)
          }
        }]
      }
    case 'osmosis/gamm/exit-pool':
      if (!message.value.sender) throw new Error('Missing sender in msgs')
      if (!message.value.pool_id) throw new Error('Missing pool_id in msgs')
      if (!message.value.share_in_amount) throw new Error('Missing share_in_amount in msgs')
      if (message.value.token_out_mins.length !== 2) throw new Error('Bad token_out_mins length')

      return {
        messages: [{
          typeUrl: '/osmosis.gamm.v1beta1.MsgExitPool',
          value: {
            sender: message.value.sender,
            poolId: message.value.pool_id,
            shareInAmount: message.value.share_in_amount,
            tokenOutMins: scrubCoins(message.value.token_out_mins)
          }
        }]
      }
    case 'osmosis/lockup/lock-tokens': {
      if (!message.value.owner) throw new Error('Missing owner in msgs')
      if (!message.value.duration) throw new Error('Missing duration in msgs')

      const duration = new BN(message.value.duration)
      const nanosPerSecond = new BN("1000000000")
      const seconds = duration.div(nanosPerSecond).toString()
      const nanos = duration.umod(nanosPerSecond).toString()

      return {
        messages: [{
          typeUrl: '/osmosis.lockup.MsgLockTokens',
          value: {
            owner: message.value.owner,
            duration: { seconds, nanos },
            coins: scrubCoins(message.value.coins)
          }
        }]
      }
    }
    case 'osmosis/lockup/begin-unlock-period-lock':
      if (!message.value.owner) throw new Error('Missing owner in msgs')

      return {
        messages: [{
          typeUrl: '/osmosis.lockup.MsgBeginUnlockingAll',
          value: {
            owner: message.value.owner
          }
        }]
      }
    case 'osmosis/lockup/begin-unlock-by-id':
      if (!message.value.id) throw new Error('Missing id in msgs')
      if (!message.value.owner) throw new Error('Missing owner in msgs')

      return {
        messages: [{
          typeUrl: '/osmosis.lockup.MsgBeginUnlocking',
          value: {
            owner: message.value.owner,
            id: message.value.id
          }
        }]
      }
    default:
      throw new Error('Unhandled tx type! type: ' + message.type)
  }
}
