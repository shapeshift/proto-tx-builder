import { AminoMsg } from "@cosmjs/amino";
import { fromBech32, toBech32 } from '@cosmjs/encoding'
import { AminoConverters } from "@cosmjs/stargate";

import * as codecs from '../../proto'
import * as cosmos from '../../proto/generated/cosmos/base/v1beta1/coin'
import * as thorchain from '../../proto/generated/thorchain/v1/common/common'

export interface AminoMsgSend extends AminoMsg {
	readonly type: "thorchain/MsgSend";
	readonly value: {
		readonly from_address: string;
		readonly to_address: string;
		readonly amount: readonly cosmos.Coin[]
	};
}

export interface AminoMsgDeposit extends AminoMsg {
	readonly type: "thorchain/MsgDeposit";
	readonly value: {
		readonly coins: readonly thorchain.Coin[];
		readonly memo: string
		readonly signer: string
	};
}

export function createAminoConverters(): AminoConverters {
	return {
		"/types.MsgSend": {
			aminoType: "thorchain/MsgSend",
			toAmino: ({ fromAddress, toAddress, amount }: codecs.thorchain_types.MsgSend): AminoMsgSend["value"] => ({
				from_address: toBech32("thor", fromAddress),
				to_address: toBech32("thor", toAddress),
				amount: [...amount],
			}),
			fromAmino: ({ from_address, to_address, amount }: AminoMsgSend["value"]): codecs.thorchain_types.MsgSend => ({
				fromAddress: fromBech32(from_address).data,
				toAddress: fromBech32(to_address).data,
				amount: [...amount],
			}),
		},
		"/types.MsgDeposit": {
			aminoType: "thorchain/MsgDeposit",
			toAmino: ({ coins, memo, signer }: codecs.thorchain_types.MsgDeposit): AminoMsgDeposit["value"] => ({
				coins: [...coins],
				memo: memo,
				signer: toBech32("thor", signer),
			}),
			fromAmino: ({ coins, memo, signer }: AminoMsgDeposit["value"]): codecs.thorchain_types.MsgDeposit => ({
				coins: [...coins],
				memo: memo,
				signer: fromBech32(signer).data,
			}),
		},
	}
}