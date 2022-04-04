import { Coin, coin, Registry, OfflineDirectSigner } from '@cosmjs/proto-signing'
import {
  SigningStargateClient,
  defaultRegistryTypes as defaultStargateTypes
} from '@cosmjs/stargate'
import { toAccAddress } from '@cosmjs/stargate/build/queryclient/utils'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'

import * as codecs from './protobuf'

export async function sign(
  jsonTx: any,
  signer: OfflineDirectSigner,
  sequence: string,
  accountNumber: string,
  chainId: string
): Promise<{
  serialized: string
  body: string
  authInfoBytes: string
  signatures: string[]
}> {
  const myRegistry = new Registry(defaultStargateTypes)
  console.log(`proto-tx-builder.sign seq: ${sequence}, acctNum: ${accountNumber}, chainId: ${chainId}`)

  // custom osmosis modules
  myRegistry.register(
    '/osmosis.gamm.v1beta1.MsgSwapExactAmountIn',
    codecs.osmosis.gamm.v1beta1.MsgSwapExactAmountIn
  )
  myRegistry.register(
    '/osmosis.gamm.v1beta1.MsgSwapExactAmountOut',
    codecs.osmosis.gamm.v1beta1.MsgSwapExactAmountOut
  )
  myRegistry.register('/osmosis.gamm.v1beta1.MsgJoinPool', codecs.osmosis.gamm.v1beta1.MsgJoinPool)
  myRegistry.register('/osmosis.gamm.v1beta1.MsgExitPool', codecs.osmosis.gamm.v1beta1.MsgExitPool)
  myRegistry.register(
    '/osmosis.gamm.v1beta1.MsgCreatePool',
    codecs.osmosis.gamm.v1beta1.MsgCreatePool
  )
  myRegistry.register('/osmosis.gamm.v1beta1.PoolParams', codecs.osmosis.gamm.v1beta1.PoolParams)
  myRegistry.register('/osmosis.gamm.v1beta1.PoolAsset', codecs.osmosis.gamm.v1beta1.PoolAsset)
  myRegistry.register(
    '/osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn',
    codecs.osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn
  )
  myRegistry.register(
    '/osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut',
    codecs.osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut
  )
  myRegistry.register(
    '/osmosis.gamm.v1beta1.SwapAmountInRoute',
    codecs.osmosis.gamm.v1beta1.SwapAmountInRoute
  )
  myRegistry.register(
    '/osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn',
    codecs.osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn
  )

  // staking
  myRegistry.register('/osmosis.lockup.MsgLockTokens', codecs.osmosis.lockup.MsgLockTokens)
  myRegistry.register('/osmosis.lockup.MsgBeginUnlocking', codecs.osmosis.lockup.MsgBeginUnlocking)
  myRegistry.register(
    '/osmosis.lockup.MsgBeginUnlockingAll',
    codecs.osmosis.lockup.MsgBeginUnlockingAll
  )

  // thorchain
  myRegistry.register('/types.MsgSend', codecs.thorchain_types.MsgSend)
  myRegistry.register('/types.MsgDeposit', codecs.thorchain_types.MsgDeposit)

  const clientOffline = await SigningStargateClient.offline(signer, {
    registry: myRegistry
  })

  const convertedMsg = parse_legacy_tx_format(jsonTx)
  // console.info('CONVERTED TX: ', JSON.stringify(x))
  const { msg, from, fee, memo } = convertedMsg

  if (!fee) {
    throw new Error('fee must be defined after conversion')
  }

  // console.info(`calling clientOffline.sign with ${from}, ${JSON.stringify(fee)}, ${memo}. msg: `, JSON.stringify(msg))
  const txRaw = await clientOffline.sign(from, [msg], fee, memo || '', {
    accountNumber: Number(accountNumber),
    sequence: Number(sequence),
    chainId
  })
  // console.log('signedTx: ', JSON.stringify(txRaw))

  const encoded = TxRaw.encode(txRaw).finish()
  const output = {
    serialized: Buffer.from(encoded).toString('base64'),
    body: Buffer.from(txRaw.bodyBytes).toString('base64'),
    authInfoBytes: Buffer.from(txRaw.authInfoBytes).toString('base64'),
    signatures: txRaw.signatures.map((x) => Buffer.from(x).toString('base64'))
  }
  // console.log('output: ', JSON.stringify(output))
  return output
}

const scrubCoin = (x: Coin) => {
  if (!x.amount) throw new Error('missing coin amount')
  if (!x.denom) throw new Error('missing coin denom')

  return coin(x.amount, x.denom)
}
const scrubCoins = (x: Coin[]) => x.filter(c => c.amount && c.amount !== "0").map(scrubCoin)

type Route = { poolId: unknown; tokenOutDenom: unknown }
const scrubRoute = (x: Route) => {
  if (!x.poolId) throw new Error('missing route poolId')
  if (!x.tokenOutDenom) throw new Error('missing route tokenOutDenom')

  return {
    poolId: x.poolId,
    tokenOutDenom: x.tokenOutDenom
  }
}
const scrubRoutes = (x: Route[]) => x.map(scrubRoute)

function parse_legacy_tx_format(jsonTx: any): ConvertedMsg {
  if (jsonTx.msg.length !== 1) throw new Error('multiple msgs not supported!')

  return {
    ...convertLegacyMsg(jsonTx.msg[0]),
    fee: {
      amount: scrubCoins(jsonTx.fee.amount),
      gas: jsonTx.fee.gas
    },
    memo: jsonTx.memo
  }
}

type LegacyMsg = { type: string; value: any }
type ConvertedMsg = {
  from: string
  msg: {
    typeUrl: string,
    value: any
  }
  memo?: string
  fee?: {
    gas: string
    amount: Coin[]
    gas_limit?: string
  }
}

function convertLegacyMsg(msg: LegacyMsg): ConvertedMsg {
  // switch for each tx type supported
  switch (msg.type) {
    case 'thorchain/MsgSend':
      if (!msg.value.from_address) throw new Error('Missing from_address in msg')
      if (!msg.value.to_address) throw new Error('Missing to_address in msg')

      return {
        from: msg.value.from_address,
        msg: {
          typeUrl: '/types.MsgSend',
          value: {
            fromAddress: toAccAddress(msg.value.from_address),
            toAddress: toAccAddress(msg.value.to_address),
            amount: scrubCoins(msg.value.amount)
          }
        },
    }
    case 'thorchain/MsgDeposit':
      if (msg.value.coins?.length !== 1) {
        throw new Error(`expected 1 input coin got ${msg.value.coins?.length}`)
      }
      // console.info('MsgDeposit IN: ', JSON.stringify(msg))
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
        from: msg.value.signer,
        msg: {
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
        }
      }
    case 'cosmos-sdk/MsgSend':
      if (!msg.value.from_address) throw new Error('Missing from_address in msg')
      if (!msg.value.to_address) throw new Error('Missing to_address in msg')

      return {
        from: msg.value.from_address,
        msg: {
          typeUrl: '/cosmos.bank.v1beta1.MsgSend',
          value: {
            fromAddress: msg.value.from_address,
            toAddress: msg.value.to_address,
            amount: scrubCoins(msg.value.amount)
          }
        }
      }
    case 'cosmos-sdk/MsgDelegate':
      if (!msg.value.delegator_address) throw new Error('Missing delegator_address in msg')
      if (!msg.value.validator_address) throw new Error('Missing validator_address in msg')

      return {
        from: msg.value.delegator_address,
        msg: {
          typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
          value: {
            delegatorAddress: msg.value.delegator_address,
            validatorAddress: msg.value.validator_address,
            amount: scrubCoin(msg.value.amount)
          }
        }
      }
    case 'cosmos-sdk/MsgUndelegate':
      if (!msg.value.delegator_address) throw new Error('Missing delegator_address in msg')
      if (!msg.value.validator_address) throw new Error('Missing validator_address in msg')

      return {
        from: msg.value.delegator_address,
        msg: {
          typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
          value: {
            delegatorAddress: msg.value.delegator_address,
            validatorAddress: msg.value.validator_address,
            amount: scrubCoin(msg.value.amount)
          }
        }
      }
    case 'cosmos-sdk/MsgBeginRedelegate':
      if (!msg.value.delegator_address) throw new Error('Missing delegator_address in msg')
      if (!msg.value.validator_src_address) throw new Error('Missing validator_src_address in msg')
      if (!msg.value.validator_dst_address) throw new Error('Missing validator_dst_address in msg')

      return {
        from: msg.value.delegator_address,
        msg: {
          typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
          value: {
            delegatorAddress: msg.value.delegator_address,
            validatorSrcAddress: msg.value.validator_src_address,
            validatorDstAddress: msg.value.validator_dst_address,
            amount: scrubCoin(msg.value.amount)
          }
        }
      }
    case 'cosmos-sdk/MsgWithdrawDelegatorReward':
      if (!msg.value.delegator_address) throw new Error('Missing delegator_address in msg')
      if (!msg.value.validator_address) throw new Error('Missing validator_address in msg')

      return {
        from: msg.value.delegator_address,
        msg: {
          typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
          value: {
            delegatorAddress: msg.value.delegator_address,
            validatorAddress: msg.value.validator_address,
            amount: scrubCoin(msg.value.amount)
          }
        }
      }
    case 'cosmos-sdk/MsgTransfer':
      if (!msg.value.receiver) throw new Error('Missing receiver in msg')
      if (!msg.value.sender) throw new Error('Missing sender in msg')
      if (!msg.value.source_channel) throw new Error('Missing source_channel in msg')
      if (!msg.value.source_port) throw new Error('Missing source_port in msg')
      if (!msg.value.timeout_height.revision_height)
        throw new Error('Missing revision_height in msg value.timeout_height')

      return {
        from: msg.value.sender,
        msg: {
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
            }
          }
        }
      }
    case 'osmosis/gamm/swap-exact-amount-in':
      if (!msg.value.sender) throw new Error('Missing sender in msg')
      if (!msg.value.tokenIn) throw new Error('Missing tokenIn in msg')
      if (!msg.value.tokenOutMinAmount) throw new Error('Missing tokenOutMinAmount in msg')
      if (msg.value.routes.length !== 1) throw new Error('bad routes length')

      return {
        from: msg.value.sender,
        msg: {
          typeUrl: '/osmosis.gamm.v1beta1.MsgSwapExactAmountIn',
          value: {
            sender: msg.value.sender,
            tokenIn: scrubCoin(msg.value.tokenIn),
            tokenOutMinAmount: msg.value.tokenOutMinAmount,
            routes: scrubRoutes(msg.value.routes)
          }
        }
      }
    case 'osmosis/gamm/join-pool':
      if (!msg.value.sender) throw new Error('Missing sender in msg')
      if (!msg.value.poolId) throw new Error('Missing poolId in msg')
      if (!msg.value.shareOutAmount) throw new Error('Missing poolId in msg')
      if (msg.value.tokenInMaxs.length !== 2) throw new Error('bad tokenInMaxs length')

      return {
        from: msg.value.sender,
        msg: {
          typeUrl: '/osmosis.gamm.v1beta1.MsgJoinPool',
          value: {
            sender: msg.value.sender,
            poolId: msg.value.poolId,
            shareOutAmount: msg.value.shareOutAmount,
            tokenInMaxs: scrubCoins(msg.value.tokenInMaxs)
          }
        }
      }
    case 'osmosis/gamm/exit-pool':
      if (!msg.value.sender) throw new Error('Missing sender in msg')
      if (!msg.value.poolId) throw new Error('Missing poolId in msg')
      if (!msg.value.shareOutAmount) throw new Error('Missing poolId in msg')
      if (msg.value.tokenOutMins.length !== 2) throw new Error('bad tokenOutMins length')

      return {
        from: msg.value.sender,
        msg: {
          typeUrl: '/osmosis.gamm.v1beta1.MsgExitPool',
          value: {
            sender: msg.value.sender,
            poolId: msg.value.poolId,
            shareInAmount: msg.value.shareOutAmount,
            tokenOutMins: scrubCoins(msg.value.tokenOutMins)
          }
        }
      }
    case 'osmosis/lockup/lock-tokens':
      if (!msg.value.owner) throw new Error('Missing owner in msg')
      if (!msg.value.duration) throw new Error('Missing duration in msg')

      return {
        from: msg.value.owner,
        msg: {
          typeUrl: '/osmosis.lockup.MsgLockTokens',
          value: {
            owner: msg.value.owner,
            duration: msg.value.poolId,
            coins: scrubCoins(msg.value.coins)
          }
        }
      }
    case 'osmosis/lockup/begin-unlock-period-lock':
      if (!msg.value.owner) throw new Error('Missing owner in msg')

      return {
        from: msg.value.owner,
        msg: {
          typeUrl: '/osmosis.lockup.MsgBeginUnlockingAll',
          value: {
            owner: msg.value.owner
          }
        }
      }
    default:
      throw new Error('Unhandled tx type! type: ' + msg.type)
  }
}
