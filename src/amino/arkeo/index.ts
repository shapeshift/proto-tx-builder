import { AminoMsg } from '@cosmjs/amino';
import { fromBech32, toBech32 } from '@cosmjs/encoding';
import { AminoConverters } from '@cosmjs/stargate';

import * as codecs from '../../proto';
import * as cosmos from '../../proto/generated/cosmos/base/v1beta1/coin'
import { ProviderStatus, ContractType, ContractAuthorization } from '../../proto/generated/arkeo/arkeo.arkeo/types/arkeo/arkeo/keeper'
import { Chain } from '../../proto/generated/arkeo/arkeo.claim/types/arkeo/claim/claim_record'


export interface AminoMsgBondProvider extends AminoMsg {
    readonly type: 'arkeo/MsgBondProvider',
    readonly value: {
        readonly creator: string,
        readonly provider: string,
        readonly service: string,
        readonly bond: string,
    },
}

export interface AminoMsgModProvider extends AminoMsg {
    readonly type: 'arkeo/MsgModProvider',
    readonly value: {
        readonly creator: string,
        readonly provider: string,
        readonly service: string,
        readonly metadata_uri: string,
        readonly metadata_nonce: number,
        readonly status: ProviderStatus,
        readonly min_contract_duration: number,
        readonly max_contract_duration: number,
        readonly subscription_rate: cosmos.Coin[],
        readonly pay_as_you_go_rate: cosmos.Coin[],
        readonly settlement_duration: number,
    },
}

export interface AminoMsgOpenContract extends AminoMsg {
    readonly type: 'arkeo/MsgOpenContract',
    readonly value: {
        readonly creator: string,
        readonly provider: string,
        readonly service: string,
        readonly client: string,
        readonly delegate: string,
        readonly contract_type: ContractType,
        readonly duration: number,
        readonly rate: cosmos.Coin,
        readonly deposit: string,
        readonly settlement_duration: number,
        readonly authorization: ContractAuthorization
    },
}

export interface AminoMsgCloseContract extends AminoMsg {
    readonly type: 'arkeo/MsgCloseContract',
    readonly value: {
        readonly creator: string,
        readonly contract_id: number,
    },
}

export interface AminoMsgClaimContractIncome extends AminoMsg {
    readonly type: 'arkeo/MsgClaimContractIncome',
    readonly value: {
        readonly creator: string,
        readonly contract_id: number,
        readonly signature: Uint8Array,
        readonly nonce: number,
    },
}

export interface AminoMsgClaimEth extends AminoMsg {
    readonly type: 'arkeo/MsgClaimEth',
    readonly value: {
        readonly creator: string,
        readonly eth_address: string,
        readonly signature: string,
    },
}

export interface AminoMsgClaimArkeo extends AminoMsg {
    readonly type: 'arkeo/MsgClaimArkeo',
    readonly value: {
        readonly creator: string,
    },
}

export interface AminoMsgTransferClaim extends AminoMsg {
    readonly type: 'arkeo/MsgTransferClaim',
    readonly value: {
        readonly creator: string,
        readonly to_address: string,
    },
}

export interface AminoMsgAddClaim extends AminoMsg {
    readonly type: 'arkeo/MsgAddClaim',
    readonly value: {
        readonly creator: string,
        readonly chain: Chain,
        readonly address: string,
        readonly amount: number,
    },
}

export function createAminoConverters(): AminoConverters {
    return {
        '/arkeo.arkeo.MsgBondProvider': {
            aminoType: 'arkeo/arkeo/MsgBondProvider',
            toAmino: ({
                creator,
                provider,
                service,
                bond,
            }: codecs.arkeo.arkeo.MsgBondProvider): AminoMsgBondProvider['value'] => ({
                creator:  toBech32('arkeo', creator),
                provider:  toBech32('arkeo', provider),
                service: service,
                bond: bond,
            }),
            fromAmino: ({
                creator,
                provider,
                service,
                bond,
            }: AminoMsgBondProvider['value']): codecs.arkeo.arkeo.MsgBondProvider => ({
                creator: fromBech32(creator).data,
                provider: fromBech32(provider).data,
                service: service,
                bond: bond,
            }),
        },
        '/arkeo.arkeo.MsgModProvider': {
            aminoType: 'arkeo/arkeo/MsgModProvider',
            toAmino: ({
                creator,
                provider,
                service,
                metadataUri,
                metadataNonce,
                status,
                minContractDuration,
                maxContractDuration,
                subscriptionRate,
                payAsYouGoRate,
                settlementDuration,
            }: codecs.arkeo.arkeo.MsgModProvider): AminoMsgModProvider['value'] => ({
                creator: toBech32('arkeo', creator),
                provider: toBech32('arkeo', provider),
                service: service,
                metadata_uri: metadataUri,
                metadata_nonce: metadataNonce,
                status: status,
                min_contract_duration: minContractDuration,
                max_contract_duration: maxContractDuration,
                subscription_rate: subscriptionRate,
                pay_as_you_go_rate: payAsYouGoRate,
                settlement_duration: settlementDuration,
            }),
            fromAmino: ({
                creator,
                provider,
                service,
                metadata_uri,
                metadata_nonce,
                status,
                min_contract_duration,
                max_contract_duration,
                subscription_rate,
                pay_as_you_go_rate,
                settlement_duration,
            }: AminoMsgModProvider['value']): codecs.arkeo.arkeo.MsgModProvider => ({
                creator: fromBech32(creator).data,
                provider: fromBech32(provider).data,
                service: service,
                metadataUri: metadata_uri,
                metadataNonce: metadata_nonce,
                status: status,
                minContractDuration: min_contract_duration,
                maxContractDuration: max_contract_duration,
                subscriptionRate: subscription_rate,
                payAsYouGoRate: pay_as_you_go_rate,
                settlementDuration: settlement_duration,
            }),
        },
        '/arkeo.arkeo.MsgOpenContract': {
            aminoType: 'arkeo/arkeo/MsgOpenContract',
            toAmino: ({
                creator,
                provider,
                service,
                client,
                delegate,
                contractType,
                duration,
                rate,
                deposit,
                settlementDuration,
                authorization
            }: codecs.arkeo.arkeo.MsgOpenContract): AminoMsgOpenContract['value'] => ({
                creator: toBech32('arkeo', creator),
                provider: toBech32('arkeo', provider),
                service: service,
                client: toBech32('arkeo', client),
                delegate: toBech32('arkeo', delegate),
                contract_type: contractType,
                duration: duration,
                rate: rate ?? {amount: '0', denom: 'uarkeo'},
                deposit: deposit,
                settlement_duration: settlementDuration,
                authorization: authorization
            }),
            fromAmino: ({
                creator,
                provider,
                service,
                client,
                delegate,
                contract_type,
                duration,
                rate,
                deposit,
                settlement_duration,
                authorization
            }: AminoMsgOpenContract['value']): codecs.arkeo.arkeo.MsgOpenContract => ({
                creator: fromBech32(creator).data,
                provider: fromBech32(provider).data,
                service: service,
                client: fromBech32(client).data,
                delegate: fromBech32(delegate).data,
                contractType: contract_type,
                duration: duration,
                rate: rate,
                deposit: deposit,
                settlementDuration: settlement_duration,
                authorization: authorization
            }),
        },
        '/arkeo.arkeo.MsgCloseContract': {
            aminoType: 'arkeo/arkeo/MsgCloseContract',
            toAmino: ({
                creator,
                contractId
            }: codecs.arkeo.arkeo.MsgCloseContract): AminoMsgCloseContract['value'] => ({
                creator: toBech32('arkeo', creator),
                contract_id: contractId
            }),
            fromAmino: ({
                creator,
                contract_id,
            }: AminoMsgCloseContract['value']): codecs.arkeo.arkeo.MsgCloseContract => ({
                creator: fromBech32(creator).data,
                contractId: contract_id,
            }),
        },
        '/arkeo.arkeo.MsgClaimContractIncome': {
            aminoType: 'arkeo/arkeo/MsgClaimContractIncome',
            toAmino: ({
                creator,
                contractId,
                signature,
                nonce,
            }: codecs.arkeo.arkeo.MsgClaimContractIncome): AminoMsgClaimContractIncome['value'] => ({
                creator: toBech32('arkeo', creator),
                contract_id: contractId,
                signature: signature,
                nonce: nonce,
            }),
            fromAmino: ({
                creator,
                contract_id,
                signature,
                nonce,
            }: AminoMsgClaimContractIncome['value']): codecs.arkeo.arkeo.MsgClaimContractIncome => ({
                creator: fromBech32(creator).data,
                contractId: contract_id,
                signature: signature,
                nonce: nonce,
            }),
        },
        '/arkeo.arkeo.MsgClaimEth': {
            aminoType: 'arkeo/claim/MsgClaimEth',
            toAmino: ({
                creator,
                ethAddress,
                signature,
            }: codecs.arkeo.claim.MsgClaimEth): AminoMsgClaimEth['value'] => ({
                creator: toBech32('arkeo', creator),
                eth_address: ethAddress,
                signature: signature,
            }),
            fromAmino: ({
                creator,
                eth_address,
                signature,
            }: AminoMsgClaimEth['value']): codecs.arkeo.claim.MsgClaimEth => ({
                creator: fromBech32(creator).data,
                ethAddress: eth_address,
                signature: signature,
            }),
        },
        '/arkeo.arkeo.MsgClaimArkeo': {
            aminoType: 'arkeo/claim/MsgClaimArkeo',
            toAmino: ({
                creator
            }: codecs.arkeo.claim.MsgClaimArkeo): AminoMsgClaimArkeo['value'] => ({
                creator: toBech32('arkeo', creator)
            }),
            fromAmino: ({
                creator
            }: AminoMsgClaimArkeo['value']): codecs.arkeo.claim.MsgClaimArkeo => ({
                creator: fromBech32(creator).data
            }),
        },
        '/arkeo.arkeo.MsgTransferClaim': {
            aminoType: 'arkeo/claim/MsgTransferClaim',
            toAmino: ({
                creator,
                toAddress,
            }: codecs.arkeo.claim.MsgTransferClaim): AminoMsgTransferClaim['value'] => ({
                creator: toBech32('arkeo', creator),
                to_address: toBech32('arkeo', toAddress),
            }),
            fromAmino: ({
                creator,
                to_address,
            }: AminoMsgTransferClaim['value']): codecs.arkeo.claim.MsgTransferClaim => ({
                creator: fromBech32(creator).data,
                toAddress: fromBech32(to_address).data,
            }),
        },
        '/arkeo.arkeo.MsgAddClaim': {
            aminoType: 'arkeo/claim/MsgAddClaim',
            toAmino: ({
                creator,
                chain,
                address,
                amount,
            }: codecs.arkeo.claim.MsgAddClaim): AminoMsgAddClaim['value'] => ({
                creator: toBech32('arkeo', creator),
                chain: chain,
                address: address,
                amount: amount,
            }),
            fromAmino: ({
                creator,
                chain,
                address,
                amount,
            }: AminoMsgAddClaim['value']): codecs.arkeo.claim.MsgAddClaim => ({
                creator: fromBech32(creator).data,
                chain: chain,
                address: address,
                amount: amount,
            }),
        },
    };
}
