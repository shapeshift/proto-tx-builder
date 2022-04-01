import { toAccAddress } from '@cosmjs/stargate/build/queryclient/utils'
import BN from 'bn.js'

import { parseThorchainAsset, scrubCoin, scrubCoins, scrubRoutes } from './utils'

// Do not explicitly type output of this function; the union of all possible output
// types will be inferred by the type system.
export function convertLegacyMsg(msg: { type: string; value: any }) {
  // switch for each tx type supported.
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
      if (!Array.isArray(msg.value.coins)) throw new Error('Expected coins in msg to be an array')

      return {
        from: msg.value.signer,
        msg: {
          typeUrl: '/types.MsgDeposit',
          value: {
            coins: msg.value.coins.map((coin: Record<'asset' | 'amount', string>) => ({
              asset: parseThorchainAsset(coin.asset),
              amount: coin.amount
            })),
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
    case 'cosmos-sdk/MsgWithdrawDelegationReward':
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
      if (!msg.value.shareOutAmount) throw new Error('Missing shareOutAmount in msg')
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
      if (!msg.value.shareInAmount) throw new Error('Missing shareInAmount in msg')
      if (msg.value.tokenOutMins.length !== 2) throw new Error('bad tokenOutMins length')

      return {
        from: msg.value.sender,
        msg: {
          typeUrl: '/osmosis.gamm.v1beta1.MsgExitPool',
          value: {
            sender: msg.value.sender,
            poolId: msg.value.poolId,
            shareInAmount: msg.value.shareInAmount,
            tokenOutMins: scrubCoins(msg.value.tokenOutMins)
          }
        }
      }
    case 'osmosis/lockup/lock-tokens': {
      if (!msg.value.owner) throw new Error('Missing owner in msg')
      if (!msg.value.duration) throw new Error('Missing duration in msg')

      const duration = new BN(msg.value.duration)
      const nanosPerSecond = new BN("1000000000")
      const seconds = duration.div(nanosPerSecond).toString()
      const nanos = duration.umod(nanosPerSecond).toString()

      return {
        from: msg.value.owner,
        msg: {
          typeUrl: '/osmosis.lockup.MsgLockTokens',
          value: {
            owner: msg.value.owner,
            duration: { seconds, nanos },
            coins: scrubCoins(msg.value.coins)
          }
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
