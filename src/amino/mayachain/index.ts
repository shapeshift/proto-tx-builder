import { AminoMsg } from '@cosmjs/amino'
import { fromBech32, toBech32 } from '@cosmjs/encoding'
import { AminoConverters } from '@cosmjs/stargate'

import * as codecs from '../../proto'
import * as cosmos from '../../proto/generated/cosmos/base/v1beta1/coin'
import * as thorchain from '../../proto/generated/thorchain/v1/common/common'

export interface AminoMsgSend extends AminoMsg {
  readonly type: 'mayachain/MsgSend'
  readonly value: {
    readonly from_address: string
    readonly to_address: string
    readonly amount: readonly cosmos.Coin[]
  }
}

export interface AminoMsgDeposit extends AminoMsg {
  readonly type: 'mayachain/MsgDeposit'
  readonly value: {
    readonly coins: readonly thorchain.Coin[]
    readonly memo: string
    readonly signer: string
  }
}

export function createAminoConverters(): AminoConverters {
  return {
    '/types.MsgSend': {
      aminoType: 'mayachain/MsgSend',
      toAmino: ({ fromAddress, toAddress, amount }: codecs.thorchain.MsgSend): AminoMsgSend['value'] => ({
        from_address: toBech32('maya', fromAddress),
        to_address: toBech32('maya', toAddress),
        amount: [...amount],
      }),
      fromAmino: ({ from_address, to_address, amount }: AminoMsgSend['value']): codecs.thorchain.MsgSend => ({
        fromAddress: fromBech32(from_address).data,
        toAddress: fromBech32(to_address).data,
        amount: [...amount],
      }),
    },
    '/types.MsgDeposit': {
      aminoType: 'mayachain/MsgDeposit',
      toAmino: ({ coins, memo, signer }: codecs.thorchain.MsgDeposit): AminoMsgDeposit['value'] => ({
        coins: [...coins],
        memo: memo,
        signer: toBech32('maya', signer),
      }),
      fromAmino: ({ coins, memo, signer }: AminoMsgDeposit['value']): codecs.thorchain.MsgDeposit => ({
        coins: [...coins],
        memo: memo,
        signer: fromBech32(signer).data,
      }),
    },
  }
}
