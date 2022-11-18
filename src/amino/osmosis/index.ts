import { AminoMsg } from '@cosmjs/amino';
import { fromBech32, toBech32 } from '@cosmjs/encoding';
import { AminoConverters } from '@cosmjs/stargate';
import {
    MsgDelegate,
    MsgUndelegate,
    MsgBeginRedelegate,
} from '../../proto/generated/osmosis/cosmos/staking/v1beta1/tx';
import {
    MsgLockTokens,
    MsgBeginUnlockingAll,
    MsgBeginUnlocking,
    MsgExtendLockup,
} from '../../proto/generated/osmosis/osmosis/lockup/tx';
import { MsgWithdrawDelegatorReward } from '../../proto/generated/osmosis/cosmos/distribution/v1beta1/tx';
import {
    MsgExitPool,
    MsgExitSwapExternAmountOut,
    MsgExitSwapShareAmountIn,
    MsgJoinPool,
    MsgJoinSwapExternAmountIn,
    MsgJoinSwapShareAmountOut,
    MsgSwapExactAmountIn,
    MsgSwapExactAmountOut,
} from '../../proto/generated/osmosis/osmosis/gamm/v1beta1/tx';
import {
    AminoMsgExitPool,
    AminoMsgExitSwapExternAmountOut,
    AminoMsgExitSwapShareAmountIn,
    AminoMsgJoinPool,
    AminoMsgJoinSwapExternAmountIn,
    AminoMsgJoinSwapShareAmountOut,
    AminoMsgSwapExactAmountIn,
    AminoMsgSwapExactAmountOut,
} from '../../proto/generated/osmosis/osmosis/gamm/v1beta1/tx.amino';

import { Long } from '../../proto/generated/osmosis/helpers';
import assert from 'assert';

export interface AminoMsgDelegate extends AminoMsg {
    type: 'cosmos-sdk/MsgDelegate';
    value: {
        delegator_address: string;
        validator_address: string;
        amount: {
            denom: string;
            amount: string;
        };
    };
}
export interface AminoMsgBeginRedelegate extends AminoMsg {
    type: 'cosmos-sdk/MsgBeginRedelegate';
    value: {
        delegator_address: string;
        validator_src_address: string;
        validator_dst_address: string;
        amount: {
            denom: string;
            amount: string;
        };
    };
}
export interface AminoMsgUndelegate extends AminoMsg {
    type: 'cosmos-sdk/MsgUndelegate';
    value: {
        delegator_address: string;
        validator_address: string;
        amount: {
            denom: string;
            amount: string;
        };
    };
}

export interface AminoMsgWithdrawDelegatorReward extends AminoMsg {
    type: 'cosmos-sdk/MsgWithdrawDelegationReward';
    value: {
        delegator_address: string;
        validator_address: string;
    };
}

export interface AminoMsgLockTokens extends AminoMsg {
    type: 'osmosis/lockup/lock-tokens';
    value: {
        owner: string;
        duration: {
            seconds: string;
            nanos: number;
        };
        coins: {
            denom: string;
            amount: string;
        }[];
    };
}
export interface AminoMsgBeginUnlockingAll extends AminoMsg {
    type: 'osmosis/lockup/begin-unlocking-all';
    value: {
        owner: string;
    };
}
export interface AminoMsgBeginUnlocking extends AminoMsg {
    type: 'osmosis/lockup/begin-unlocking';
    value: {
        owner: string;
        ID: string;
        coins: {
            denom: string;
            amount: string;
        }[];
    };
}
export interface AminoMsgExtendLockup extends AminoMsg {
    type: 'osmosis/lockup/extend-lockup';
    value: {
        owner: string;
        ID: string;
        duration: {
            seconds: string;
            nanos: number;
        };
    };
}

export function createAminoConverters(): AminoConverters {
    return {
        '/cosmos.staking.v1beta1.MsgDelegate': {
            aminoType: 'cosmos-sdk/MsgDelegate',
            toAmino: ({
                delegatorAddress,
                validatorAddress,
                amount,
            }: MsgDelegate): AminoMsgDelegate['value'] => {
                assert(amount, 'amount must be provided.');
                return {
                    delegator_address: delegatorAddress,
                    validator_address: validatorAddress,
                    amount: {
                        denom: amount.denom,
                        amount: Long.fromValue(amount.amount).toString(),
                    },
                };
            },
            fromAmino: ({
                delegator_address,
                validator_address,
                amount,
            }: AminoMsgDelegate['value']): MsgDelegate => {
                return {
                    delegatorAddress: delegator_address,
                    validatorAddress: validator_address,
                    amount: {
                        denom: amount.denom,
                        amount: amount.amount,
                    },
                };
            },
        },
        '/cosmos.staking.v1beta1.MsgBeginRedelegate': {
            aminoType: 'cosmos-sdk/MsgBeginRedelegate',
            toAmino: ({
                delegatorAddress,
                validatorSrcAddress,
                validatorDstAddress,
                amount,
            }: MsgBeginRedelegate): AminoMsgBeginRedelegate['value'] => {
                assert(amount, 'amount must be provided.');
                return {
                    delegator_address: delegatorAddress,
                    validator_src_address: validatorSrcAddress,
                    validator_dst_address: validatorDstAddress,
                    amount: {
                        denom: amount.denom,
                        amount: Long.fromValue(amount.amount).toString(),
                    },
                };
            },
            fromAmino: ({
                delegator_address,
                validator_src_address,
                validator_dst_address,
                amount,
            }: AminoMsgBeginRedelegate['value']): MsgBeginRedelegate => {
                return {
                    delegatorAddress: delegator_address,
                    validatorSrcAddress: validator_src_address,
                    validatorDstAddress: validator_dst_address,
                    amount: {
                        denom: amount.denom,
                        amount: amount.amount,
                    },
                };
            },
        },
        '/cosmos.staking.v1beta1.MsgUndelegate': {
            aminoType: 'cosmos-sdk/MsgUndelegate',
            toAmino: ({
                delegatorAddress,
                validatorAddress,
                amount,
            }: MsgUndelegate): AminoMsgUndelegate['value'] => {
                assert(amount, 'amount must be provided.');
                return {
                    delegator_address: delegatorAddress,
                    validator_address: validatorAddress,
                    amount: {
                        denom: amount.denom,
                        amount: Long.fromValue(amount.amount).toString(),
                    },
                };
            },
            fromAmino: ({
                delegator_address,
                validator_address,
                amount,
            }: AminoMsgUndelegate['value']): MsgUndelegate => {
                return {
                    delegatorAddress: delegator_address,
                    validatorAddress: validator_address,
                    amount: {
                        denom: amount.denom,
                        amount: amount.amount,
                    },
                };
            },
        },
        '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': {
            aminoType: 'cosmos-sdk/MsgWithdrawDelegationReward',
            toAmino: ({
                delegatorAddress,
                validatorAddress,
            }: MsgWithdrawDelegatorReward): AminoMsgWithdrawDelegatorReward['value'] => {
                return {
                    delegator_address: delegatorAddress,
                    validator_address: validatorAddress,
                };
            },
            fromAmino: ({
                delegator_address,
                validator_address,
            }: AminoMsgWithdrawDelegatorReward['value']): MsgWithdrawDelegatorReward => {
                return {
                    delegatorAddress: delegator_address,
                    validatorAddress: validator_address,
                };
            },
        },
        '/osmosis.gamm.v1beta1.MsgJoinPool': {
            aminoType: 'osmosis/gamm/join-pool',
            toAmino: ({
                sender,
                poolId,
                shareOutAmount,
                tokenInMaxs,
            }: MsgJoinPool): AminoMsgJoinPool['value'] => {
                return {
                    sender,
                    pool_id: poolId.toString(),
                    share_out_amount: shareOutAmount,
                    token_in_maxs: tokenInMaxs.map((el0) => ({
                        denom: el0.denom,
                        amount: el0.amount,
                    })),
                };
            },
            fromAmino: ({
                sender,
                pool_id,
                share_out_amount,
                token_in_maxs,
            }: AminoMsgJoinPool['value']): MsgJoinPool => {
                return {
                    sender,
                    poolId: Long.fromString(pool_id),
                    shareOutAmount: share_out_amount,
                    tokenInMaxs: token_in_maxs.map((el0) => ({
                        denom: el0.denom,
                        amount: el0.amount,
                    })),
                };
            },
        },
        '/osmosis.gamm.v1beta1.MsgExitPool': {
            aminoType: 'osmosis/gamm/exit-pool',
            toAmino: ({
                sender,
                poolId,
                shareInAmount,
                tokenOutMins,
            }: MsgExitPool): AminoMsgExitPool['value'] => {
                return {
                    sender,
                    pool_id: poolId.toString(),
                    share_in_amount: shareInAmount,
                    token_out_mins: tokenOutMins.map((el0) => ({
                        denom: el0.denom,
                        amount: el0.amount,
                    })),
                };
            },
            fromAmino: ({
                sender,
                pool_id,
                share_in_amount,
                token_out_mins,
            }: AminoMsgExitPool['value']): MsgExitPool => {
                return {
                    sender,
                    poolId: Long.fromString(pool_id),
                    shareInAmount: share_in_amount,
                    tokenOutMins: token_out_mins.map((el0) => ({
                        denom: el0.denom,
                        amount: el0.amount,
                    })),
                };
            },
        },
        '/osmosis.gamm.v1beta1.MsgSwapExactAmountIn': {
            aminoType: 'osmosis/gamm/swap-exact-amount-in',
            toAmino: ({
                sender,
                routes,
                tokenIn,
                tokenOutMinAmount,
            }: MsgSwapExactAmountIn): AminoMsgSwapExactAmountIn['value'] => {
                assert(
                    tokenIn?.denom,
                    'tokenIn denomination must be provided.'
                );
                return {
                    sender,
                    routes: routes.map((el0) => ({
                        pool_id: el0.poolId.toString(),
                        token_out_denom: el0.tokenOutDenom,
                    })),
                    token_in: {
                        denom: tokenIn.denom,
                        amount: Long.fromValue(tokenIn.amount).toString(),
                    },
                    token_out_min_amount: tokenOutMinAmount,
                };
            },
            fromAmino: ({
                sender,
                routes,
                token_in,
                token_out_min_amount,
            }: AminoMsgSwapExactAmountIn['value']): MsgSwapExactAmountIn => {
                return {
                    sender,
                    routes: routes.map((el0) => ({
                        poolId: Long.fromString(el0.pool_id),
                        tokenOutDenom: el0.token_out_denom,
                    })),
                    tokenIn: {
                        denom: token_in.denom,
                        amount: token_in.amount,
                    },
                    tokenOutMinAmount: token_out_min_amount,
                };
            },
        },
        '/osmosis.gamm.v1beta1.MsgSwapExactAmountOut': {
            aminoType: 'osmosis/gamm/swap-exact-amount-out',
            toAmino: ({
                sender,
                routes,
                tokenInMaxAmount,
                tokenOut,
            }: MsgSwapExactAmountOut): AminoMsgSwapExactAmountOut['value'] => {
                assert(
                    tokenOut?.denom,
                    'tokenOut denomination must be provided.'
                );
                return {
                    sender,
                    routes: routes.map((el0) => ({
                        pool_id: el0.poolId.toString(),
                        token_in_denom: el0.tokenInDenom,
                    })),
                    token_in_max_amount: tokenInMaxAmount,
                    token_out: {
                        denom: tokenOut.denom,
                        amount: Long.fromValue(tokenOut.amount).toString(),
                    },
                };
            },
            fromAmino: ({
                sender,
                routes,
                token_in_max_amount,
                token_out,
            }: AminoMsgSwapExactAmountOut['value']): MsgSwapExactAmountOut => {
                return {
                    sender,
                    routes: routes.map((el0) => ({
                        poolId: Long.fromString(el0.pool_id),
                        tokenInDenom: el0.token_in_denom,
                    })),
                    tokenInMaxAmount: token_in_max_amount,
                    tokenOut: {
                        denom: token_out.denom,
                        amount: token_out.amount,
                    },
                };
            },
        },
        '/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn': {
            aminoType: 'osmosis/gamm/join-swap-extern-amount-in',
            toAmino: ({
                sender,
                poolId,
                tokenIn,
                shareOutMinAmount,
            }: MsgJoinSwapExternAmountIn): AminoMsgJoinSwapExternAmountIn['value'] => {
                assert(
                    tokenIn?.denom,
                    'tokenIn denomination must be provided.'
                );
                return {
                    sender,
                    pool_id: poolId.toString(),
                    token_in: {
                        denom: tokenIn.denom,
                        amount: Long.fromValue(tokenIn.amount).toString(),
                    },
                    share_out_min_amount: shareOutMinAmount,
                };
            },
            fromAmino: ({
                sender,
                pool_id,
                token_in,
                share_out_min_amount,
            }: AminoMsgJoinSwapExternAmountIn['value']): MsgJoinSwapExternAmountIn => {
                return {
                    sender,
                    poolId: Long.fromString(pool_id),
                    tokenIn: {
                        denom: token_in.denom,
                        amount: token_in.amount,
                    },
                    shareOutMinAmount: share_out_min_amount,
                };
            },
        },
        '/osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOut': {
            aminoType: 'osmosis/gamm/join-swap-share-amount-out',
            toAmino: ({
                sender,
                poolId,
                tokenInDenom,
                shareOutAmount,
                tokenInMaxAmount,
            }: MsgJoinSwapShareAmountOut): AminoMsgJoinSwapShareAmountOut['value'] => {
                return {
                    sender,
                    pool_id: poolId.toString(),
                    token_in_denom: tokenInDenom,
                    share_out_amount: shareOutAmount,
                    token_in_max_amount: tokenInMaxAmount,
                };
            },
            fromAmino: ({
                sender,
                pool_id,
                token_in_denom,
                share_out_amount,
                token_in_max_amount,
            }: AminoMsgJoinSwapShareAmountOut['value']): MsgJoinSwapShareAmountOut => {
                return {
                    sender,
                    poolId: Long.fromString(pool_id),
                    tokenInDenom: token_in_denom,
                    shareOutAmount: share_out_amount,
                    tokenInMaxAmount: token_in_max_amount,
                };
            },
        },
        '/osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut': {
            aminoType: 'osmosis/gamm/exit-swap-extern-amount-out',
            toAmino: ({
                sender,
                poolId,
                tokenOut,
                shareInMaxAmount,
            }: MsgExitSwapExternAmountOut): AminoMsgExitSwapExternAmountOut['value'] => {
                assert(
                    tokenOut?.denom,
                    'tokenOut denomination must be provided.'
                );
                return {
                    sender,
                    pool_id: poolId.toString(),
                    token_out: {
                        denom: tokenOut.denom,
                        amount: Long.fromValue(tokenOut.amount).toString(),
                    },
                    share_in_max_amount: shareInMaxAmount,
                };
            },
            fromAmino: ({
                sender,
                pool_id,
                token_out,
                share_in_max_amount,
            }: AminoMsgExitSwapExternAmountOut['value']): MsgExitSwapExternAmountOut => {
                return {
                    sender,
                    poolId: Long.fromString(pool_id),
                    tokenOut: {
                        denom: token_out.denom,
                        amount: token_out.amount,
                    },
                    shareInMaxAmount: share_in_max_amount,
                };
            },
        },
        '/osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn': {
            aminoType: 'osmosis/gamm/exit-swap-share-amount-in',
            toAmino: ({
                sender,
                poolId,
                tokenOutDenom,
                shareInAmount,
                tokenOutMinAmount,
            }: MsgExitSwapShareAmountIn): AminoMsgExitSwapShareAmountIn['value'] => {
                return {
                    sender,
                    pool_id: poolId.toString(),
                    token_out_denom: tokenOutDenom,
                    share_in_amount: shareInAmount,
                    token_out_min_amount: tokenOutMinAmount,
                };
            },
            fromAmino: ({
                sender,
                pool_id,
                token_out_denom,
                share_in_amount,
                token_out_min_amount,
            }: AminoMsgExitSwapShareAmountIn['value']): MsgExitSwapShareAmountIn => {
                return {
                    sender,
                    poolId: Long.fromString(pool_id),
                    tokenOutDenom: token_out_denom,
                    shareInAmount: share_in_amount,
                    tokenOutMinAmount: token_out_min_amount,
                };
            },
        },
        '/osmosis.lockup.MsgLockTokens': {
            aminoType: 'osmosis/lockup/lock-tokens',
            toAmino: ({
                owner,
                duration,
                coins,
            }: MsgLockTokens): AminoMsgLockTokens['value'] => {
                assert(duration, 'lockup duration must be defined');
                return {
                    owner,
                    duration: {
                        seconds: duration.seconds.toString(),
                        nanos: duration.nanos,
                    },
                    coins: coins.map((el0) => ({
                        denom: el0.denom,
                        amount: el0.amount,
                    })),
                };
            },
            fromAmino: ({
                owner,
                duration,
                coins,
            }: AminoMsgLockTokens['value']): MsgLockTokens => {
                return {
                    owner,
                    duration: {
                        seconds: Long.fromNumber(parseInt(duration.seconds)),
                        nanos: duration.nanos,
                    },
                    coins: coins.map((el0) => ({
                        denom: el0.denom,
                        amount: el0.amount,
                    })),
                };
            },
        },
        '/osmosis.lockup.MsgBeginUnlockingAll': {
            aminoType: 'osmosis/lockup/begin-unlocking-all',
            toAmino: ({
                owner,
            }: MsgBeginUnlockingAll): AminoMsgBeginUnlockingAll['value'] => {
                return {
                    owner,
                };
            },
            fromAmino: ({
                owner,
            }: AminoMsgBeginUnlockingAll['value']): MsgBeginUnlockingAll => {
                return {
                    owner,
                };
            },
        },
        '/osmosis.lockup.MsgBeginUnlocking': {
            aminoType: 'osmosis/lockup/begin-unlocking',
            toAmino: ({
                owner,
                ID,
                coins,
            }: MsgBeginUnlocking): AminoMsgBeginUnlocking['value'] => {
                return {
                    owner,
                    ID: ID.toString(),
                    coins: coins.map((el0) => ({
                        denom: el0.denom,
                        amount: el0.amount,
                    })),
                };
            },
            fromAmino: ({
                owner,
                ID,
                coins,
            }: AminoMsgBeginUnlocking['value']): MsgBeginUnlocking => {
                return {
                    owner,
                    ID: Long.fromString(ID),
                    coins: coins.map((el0) => ({
                        denom: el0.denom,
                        amount: el0.amount,
                    })),
                };
            },
        },
        '/osmosis.lockup.MsgExtendLockup': {
            aminoType: 'osmosis/lockup/extend-lockup',
            toAmino: ({
                owner,
                ID,
                duration,
            }: MsgExtendLockup): AminoMsgExtendLockup['value'] => {
                assert(duration, 'lockup duration must be defined.');
                return {
                    owner,
                    ID: ID.toString(),
                    duration: {
                        seconds: duration.seconds.toString(),
                        nanos: duration.nanos,
                    },
                };
            },
            fromAmino: ({
                owner,
                ID,
                duration,
            }: AminoMsgExtendLockup['value']): MsgExtendLockup => {
                return {
                    owner,
                    ID: Long.fromString(ID),
                    duration: {
                        seconds: Long.fromNumber(parseInt(duration.seconds)),
                        nanos: duration.nanos,
                    },
                };
            },
        },
    };
}
