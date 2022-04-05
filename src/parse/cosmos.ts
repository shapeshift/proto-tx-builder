import { Array, Record, String } from "runtypes";

import { asTuple, Coin, legacyMsgMatcher, nativeMsgMatcher } from "./utils";

import * as genRt from "../../proto/runtypes";

const foo = {
  "/cosmos.bank.v1beta1.MsgSend": genRt.cosmos.bank.v1beta1.IMsgSend,
  "/cosmos.bank.v1beta1.MsgMultiSend": genRt.cosmos.bank.v1beta1.IMsgMultiSend,
  "/cosmos.staking.v1beta1.MsgDelegate":
    genRt.cosmos.staking.v1beta1.IMsgDelegate,
  "/cosmos.staking.v1beta1.MsgUndelegate":
    genRt.cosmos.staking.v1beta1.IMsgUndelegate,
  "/cosmos.staking.v1beta1.MsgBeginRedelegate":
    genRt.cosmos.staking.v1beta1.IMsgBeginRedelegate,
  "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward":
    genRt.cosmos.distribution.v1beta1.IMsgWithdrawDelegatorReward,
};

export const native = asTuple([
  nativeMsgMatcher(
    "/cosmos.bank.v1beta1.MsgSend",
    genRt.cosmos.bank.v1beta1.IMsgSend
  ),
  nativeMsgMatcher(
    "/cosmos.bank.v1beta1.MsgMultiSend",
    genRt.cosmos.bank.v1beta1.IMsgMultiSend
  ),
  nativeMsgMatcher(
    "/cosmos.staking.v1beta1.MsgDelegate",
    genRt.cosmos.staking.v1beta1.IMsgDelegate
  ),
  nativeMsgMatcher(
    "/cosmos.staking.v1beta1.MsgUndelegate",
    genRt.cosmos.staking.v1beta1.IMsgUndelegate
  ),
  nativeMsgMatcher(
    "/cosmos.staking.v1beta1.MsgBeginRedelegate",
    genRt.cosmos.staking.v1beta1.IMsgBeginRedelegate
  ),
  nativeMsgMatcher(
    "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
    genRt.cosmos.distribution.v1beta1.IMsgWithdrawDelegatorReward
  ),
]);

export const legacy = asTuple([
  legacyMsgMatcher(
    "cosmos-sdk/MsgSend",
    Record({
      from_address: String,
      to_address: String,
      amount: Array(Coin),
    }),
    "/cosmos.bank.v1beta1.MsgSend",
    genRt.cosmos.bank.v1beta1.IMsgSend,
    (x) => x.from_address,
    (x) => ({
      fromAddress: x.from_address,
      toAddress: x.to_address,
      amount: x.amount,
    })
  ),
  legacyMsgMatcher(
    "cosmos-sdk/MsgDelegate",
    Record({
      delegator_address: String,
      validator_address: String,
      amount: Coin,
    }),
    "/cosmos.staking.v1beta1.MsgDelegate",
    genRt.cosmos.staking.v1beta1.IMsgDelegate,
    (x) => x.delegator_address,
    (x) => ({
      delegatorAddress: x.delegator_address,
      validatorAddress: x.validator_address,
      amount: x.amount,
    })
  ),
  legacyMsgMatcher(
    "cosmos-sdk/MsgUndelegate",
    Record({
      delegator_address: String,
      validator_address: String,
      amount: Coin,
    }),
    "/cosmos.staking.v1beta1.MsgUndelegate",
    genRt.cosmos.staking.v1beta1.IMsgUndelegate,
    (x) => x.delegator_address,
    (x) => ({
      delegatorAddress: x.delegator_address,
      validatorAddress: x.validator_address,
      amount: x.amount,
    })
  ),
  legacyMsgMatcher(
    "cosmos-sdk/MsgBeginRedelegate",
    Record({
      delegator_address: String,
      validator_src_address: String,
      validator_dst_address: String,
      amount: Coin,
    }),
    "/cosmos.staking.v1beta1.MsgBeginRedelegate",
    genRt.cosmos.staking.v1beta1.IMsgBeginRedelegate,
    (x) => x.delegator_address,
    (x) => ({
      delegatorAddress: x.delegator_address,
      validatorSrcAddress: x.validator_src_address,
      validatorDstAddress: x.validator_dst_address,
      amount: x.amount,
    })
  ),
  legacyMsgMatcher(
    "cosmos-sdk/MsgWithdrawDelegationReward",
    Record({
      delegator_address: String,
      validator_address: String,
      amount: Coin,
    }),
    "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
    genRt.cosmos.distribution.v1beta1.IMsgWithdrawDelegatorReward,
    (x) => x.delegator_address,
    (x) => ({
      delegatorAddress: x.delegator_address,
      validatorAddress: x.validator_address,
      amount: x.amount,
    })
  ),
]);
