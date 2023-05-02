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
import { arkeo, osmosis, thorchain } from './amino'
import * as codecs from './proto'

type AgnosticStdTx = Omit<amino.StdTx, 'msg'> &
  (
    | {
      readonly msg?: readonly amino.AminoMsg[]
      msgs?: never;
    }
    | {
      readonly msgs?: readonly amino.AminoMsg[]
      msg: never;
    }
  )

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

export async function sign(
  signerAddress: string,
  tx: amino.StdTx | ProtoTx,
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
    ...osmosis.createAminoConverters(),
    ...arkeo.createAminoConverters()
  })

  const myRegistry = new Registry(defaultStargateTypes)

  // arkeo
  myRegistry.register('/arkeo.arkeo.MsgBondProvider', codecs.arkeo.arkeo.MsgBondProvider)
  myRegistry.register('/arkeo.arkeo.MsgModProvider', codecs.arkeo.arkeo.MsgModProvider)
  myRegistry.register('/arkeo.arkeo.MsgOpenContract', codecs.arkeo.arkeo.MsgOpenContract)
  myRegistry.register('/arkeo.arkeo.MsgCloseContract', codecs.arkeo.arkeo.MsgCloseContract)
  myRegistry.register('/arkeo.arkeo.MsgClaimContractIncome', codecs.arkeo.arkeo.MsgClaimContractIncome)
  myRegistry.register('/arkeo.claim.MsgClaimEth', codecs.arkeo.claim.MsgClaimEth)
  myRegistry.register('/arkeo.claim.MsgClaimArkeo', codecs.arkeo.claim.MsgClaimArkeo)
  myRegistry.register('/arkeo.claim.MsgTransferClaim', codecs.arkeo.claim.MsgTransferClaim)
  myRegistry.register('/arkeo.claim.MsgAddClaim', codecs.arkeo.claim.MsgAddClaim)

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

  if (tx.msg.length !== 1) throw new Error('support for single message signing only')

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

function parse_legacy_tx_format(tx: AgnosticStdTx): ProtoTx {
  const msgOrMsgs = tx.msg ?? tx.msgs
  if (!msgOrMsgs) throw new Error('msgs array improperly formatted!')

  if (msgOrMsgs.length !== 1) throw new Error('multiple msgs not supported!')

  return {
    ...convertLegacyMsg(msgOrMsgs[0]),
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
      if (!msg.value.hasOwnProperty('from_address')) throw new Error('Missing from_address in msg')
      if (!msg.value.hasOwnProperty('to_address')) throw new Error('Missing to_address in msg')

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
      if (!msg.value.hasOwnProperty('from_address')) throw new Error('Missing from_address in msg')
      if (!msg.value.hasOwnProperty('to_address')) throw new Error('Missing to_address in msg')

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
      if (!msg.value.hasOwnProperty('delegator_address')) throw new Error('Missing delegator_address in msg')
      if (!msg.value.hasOwnProperty('validator_address')) throw new Error('Missing validator_address in msg')

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
      if (!msg.value.hasOwnProperty('delegator_address')) throw new Error('Missing delegator_address in msg')
      if (!msg.value.hasOwnProperty('validator_address')) throw new Error('Missing validator_address in msg')

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
      if (!msg.value.hasOwnProperty('delegator_address')) throw new Error('Missing delegator_address in msg')
      if (!msg.value.hasOwnProperty('validator_src_address')) throw new Error('Missing validator_src_address in msg')
      if (!msg.value.hasOwnProperty('validator_dst_address')) throw new Error('Missing validator_dst_address in msg')

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
      if (!msg.value.hasOwnProperty('delegator_address')) throw new Error('Missing delegator_address in msg')
      if (!msg.value.hasOwnProperty('validator_address')) throw new Error('Missing validator_address in msg')

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
      if (!msg.value.hasOwnProperty('receiver')) throw new Error('Missing receiver in msg')
      if (!msg.value.hasOwnProperty('sender')) throw new Error('Missing sender in msg')
      if (!msg.value.hasOwnProperty('source_channel')) throw new Error('Missing source_channel in msg')
      if (!msg.value.hasOwnProperty('source_port')) throw new Error('Missing source_port in msg')
      if (!msg.value.hasOwnProperty('timeout_height')) throw new Error('Missing timeout_height in msg')
      if (!msg.value.timeout_height.hasOwnProperty('revision_height')) throw new Error('Missing timeout_height.revision_height in msg')
      if (!msg.value.timeout_height.hasOwnProperty('revision_number')) throw new Error('Missing timeout_height.revision_number in msg')

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
      if (!msg.value.hasOwnProperty('sender')) throw new Error('Missing sender in msg')
      if (!msg.value.hasOwnProperty('token_in')) throw new Error('Missing token_in in msg')
      if (!msg.value.hasOwnProperty('token_out_min_amount')) throw new Error('Missing token_out_min_amount in msg')
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
      if (!msg.value.hasOwnProperty('pool_id')) throw new Error('Missing pool_id in msg')
      if (!msg.value.hasOwnProperty('sender')) throw new Error('Missing sender in msg')
      if (!msg.value.hasOwnProperty('share_out_min_amount')) throw new Error('Missing share_out_min_amount in msg')
      if (!msg.value.hasOwnProperty('tokenIn')) throw new Error('Missing tokenIn in msg')

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
      if (!msg.value.hasOwnProperty('sender')) throw new Error('Missing sender in msg')
      if (!msg.value.hasOwnProperty('pool_id')) throw new Error('Missing pool_id in msg')
      if (!msg.value.hasOwnProperty('share_out_amount')) throw new Error('Missing share_out_amount in msg')
      if (msg.value.token_in_maxs.length !== 2) throw new Error('Bad token_in_maxs length')

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
      if (!msg.value.hasOwnProperty('sender')) throw new Error('Missing sender in msg')
      if (!msg.value.hasOwnProperty('pool_id')) throw new Error('Missing pool_id in msg')
      if (!msg.value.hasOwnProperty('share_in_amount')) throw new Error('Missing share_in_amount in msg')
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
      if (!msg.value.hasOwnProperty('owner')) throw new Error('Missing owner in msg')
      if (!msg.value.hasOwnProperty('duration')) throw new Error('Missing duration in msg')

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
      if (!msg.value.hasOwnProperty('owner')) throw new Error('Missing owner in msg')

      return {
        msg: [{
          typeUrl: '/osmosis.lockup.MsgBeginUnlockingAll',
          value: {
            owner: msg.value.owner
          }
        }]
      }
    case 'osmosis/lockup/begin-unlock-by-id':
      if (!msg.value.hasOwnProperty('id')) throw new Error('Missing id in msg')
      if (!msg.value.hasOwnProperty('owner')) throw new Error('Missing owner in msg')

      return {
        msg: [{
          typeUrl: '/osmosis.lockup.MsgBeginUnlocking',
          value: {
            owner: msg.value.owner,
            id: msg.value.id
          }
        }]
      }
    case 'arkeo/BondProvider':
      if (!msg.value.hasOwnProperty('creator')) throw new Error('Missing creator in msg')
      if (!msg.value.hasOwnProperty('provider')) throw new Error('Missing provider in msg')
      if (!msg.value.hasOwnProperty('service')) throw new Error('Missing service in msg')
      if (!msg.value.hasOwnProperty('bond')) throw new Error('Missing bond in msg')

      return {
        msg: [{
          typeUrl: '/arkeo.arkeo.MsgBondProvider',
          value: {
            creator: msg.value.creator,
            provider: msg.value.provider,
            service: msg.value.service,            
            bond: msg.value.bond,
          }
        }]
      }
    case 'arkeo/ModProvider':
      if (!msg.value.hasOwnProperty('creator')) throw new Error('Missing creator in msg')
      if (!msg.value.hasOwnProperty('provider')) throw new Error('Missing provider in msg')
      if (!msg.value.hasOwnProperty('service')) throw new Error('Missing service in msg')
      if (!msg.value.hasOwnProperty('metadata_uri')) throw new Error('Missing metadata_uri in msg')
      if (!msg.value.hasOwnProperty('status')) throw new Error(`Missing status in msg`)
      if (!msg.value.hasOwnProperty('min_contract_duration')) throw new Error('Missing min_contract_duration in msg')
      if (!msg.value.hasOwnProperty('max_contract_duration')) throw new Error('Missing max_contract_duration in msg')
      if (!msg.value.hasOwnProperty('subscription_rate')) throw new Error('Missing subscription_rate in msg')
      if (!msg.value.hasOwnProperty('pay_as_you_go_rate')) throw new Error('Missing pay_as_you_go_rate in msg')
      if (!msg.value.hasOwnProperty('settlement_duration')) throw new Error('Missing settlement_duration in msg')

      return {
        msg: [{
          typeUrl: '/arkeo.arkeo.MsgModProvider',
          value: {
            creator: msg.value.creator,
            provider: msg.value.provider,
            service: msg.value.service,
            metadataUri: msg.value.metadata_uri,
            metadataNonce: msg.value.metadata_nonce,
            status: msg.value.status,
            minContractDuration: msg.value.min_contract_duration,
            maxContractDuration: msg.value.max_contract_duration,
            subscriptionRate: scrubCoins(msg.value.subscription_rate),
            payAsYouGoRate: scrubCoins(msg.value.pay_as_you_go_rate),            
            settlementDuration: msg.value.settlement_duration,
          }
        }]
      }
    case 'arkeo/OpenContract':
      if (!msg.value.hasOwnProperty('creator')) throw new Error('Missing creator in msg')
      if (!msg.value.hasOwnProperty('provider')) throw new Error('Missing provider in msg')
      if (!msg.value.hasOwnProperty('service')) throw new Error('Missing service in msg')
      if (!msg.value.hasOwnProperty('client')) throw new Error('Missing client in msg')
      if (!msg.value.hasOwnProperty('delegate')) throw new Error('Missing delegate in msg')
      if (!msg.value.hasOwnProperty('contract_type')) throw new Error('Missing contract_type in msg')
      if (!msg.value.hasOwnProperty('duration')) throw new Error('Missing duration in msg')
      if (!msg.value.hasOwnProperty('rate')) throw new Error('Missing rate in msg')
      if (!msg.value.hasOwnProperty('deposit')) throw new Error('Missing deposit in msg')
      if (!msg.value.hasOwnProperty('settlement_duration')) throw new Error('Missing settlement_duration in msg')
      if (!msg.value.hasOwnProperty('authorization')) throw new Error('Missing authorization in msg')

      return {
        msg: [{
          typeUrl: '/arkeo.arkeo.MsgOpenContract',
          value: {
            creator: msg.value.creator,
            provider: msg.value.provider,
            service: msg.value.service,
            client: msg.value.client,
            delegate: msg.value.delegate,
            contractType: msg.value.contract_type,
            duration: msg.value.duration,
            rate: scrubCoins(msg.value.rate),            
            deposit: msg.value.deposit,
            settlementDuration: msg.value.settlement_duration,
            authorization: msg.value.authorization
          }
        }]
      }

    case 'arkeo/CloseContract':
      if (!msg.value.hasOwnProperty('creator')) throw new Error('Missing creator in msg')
      if (!msg.value.hasOwnProperty('contract_id')) throw new Error('Missing contract_id in msg')

      return {
        msg: [{
          typeUrl: '/arkeo.arkeo.MsgCloseContract',
          value: {
            creator: msg.value.creator,
            contractId: msg.value.contract_id,
          }
        }]
      }

    case 'arkeo/ClaimContractIncome':
      if (!msg.value.hasOwnProperty('creator')) throw new Error('Missing creator in msg')
      if (!msg.value.hasOwnProperty('contract_id')) throw new Error('Missing contract_id in msg')
      if (!msg.value.hasOwnProperty('signature')) throw new Error('Missing signature in msg')
      if (!msg.value.hasOwnProperty('nonce')) throw new Error('Missing nonce in msg')

      return {
        msg: [{
          typeUrl: '/arkeo.arkeo.MsgClaimContractIncome',
          value: {
            creator: msg.value.creator,
            contractId: msg.value.contract_id,
            signature: msg.value.signature,
            nonce: msg.value.nonce,
          }
        }]
      }

    case 'claim/ClaimEth':
      if (!msg.value.hasOwnProperty('creator')) throw new Error('Missing creator in msg')
      if (!msg.value.hasOwnProperty('eth_address')) throw new Error('Missing eth_address in msg')
      if (!msg.value.hasOwnProperty('signature')) throw new Error('Missing signature in msg')

      return {
        msg: [{
          typeUrl: '/arkeo.claim.MsgClaimEth',
          value: {
            creator: msg.value.creator,
            ethAddress: msg.value.eth_address,
            signature: msg.value.signature,
          }
        }]
      }

    case 'claim/ClaimArkeo':
      if (!msg.value.hasOwnProperty('creator')) throw new Error('Missing creator in msg')

      return {
        msg: [{
          typeUrl: '/arkeo.claim.MsgClaimArkeo',
          value: {
            creator: msg.value.creator,
          }
        }]
      }

    case 'claim/TransferClaim':
      if (!msg.value.hasOwnProperty('creator')) throw new Error('Missing creator in msg')
      if (!msg.value.hasOwnProperty('to_address')) throw new Error('Missing to_address in msg')

      return {
        msg: [{
          typeUrl: '/arkeo.claim.MsgTransferClaim',
          value: {
            creator: msg.value.creator,
            toAddress: msg.value.to_address,
          }
        }]
      }

    case 'claim/AddClaim':
      if (!msg.value.hasOwnProperty('creator')) throw new Error('Missing creator in msg')
      if (!msg.value.hasOwnProperty('chain')) throw new Error('Missing chain in msg')
      if (!msg.value.hasOwnProperty('address')) throw new Error('Missing address in msg')
      if (!msg.value.hasOwnProperty('amount')) throw new Error('Missing amount in msg')

      return {
        msg: [{
          typeUrl: '/arkeo.claim.MsgAddClaim',
          value: {
            creator: msg.value.creator,
            chain: msg.value.chain,
            address: msg.value.address,
            amount: msg.value.amount
          }
        }]
      }
    default:
      throw new Error('Unhandled tx type! type: ' + msg.type)
  }
}
