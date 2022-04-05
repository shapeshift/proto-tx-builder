import BN from "bn.js";
import { Array, Record, Static, String } from "runtypes";

import { asTuple, Coin, legacyMsgMatcher, legacyMsgSimpleMatcher, nativeMsgMatcher } from "./utils";

import * as genRt from "../../proto/runtypes";

export const Route = Record({
  poolId: String,
  tokenOutDenom: String,
});
export type Route = Static<typeof Route>;

export const native = asTuple([
  nativeMsgMatcher(
    "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
    genRt.osmosis.gamm.v1beta1.IMsgSwapExactAmountIn
  ),
  nativeMsgMatcher(
    "/osmosis.gamm.v1beta1.MsgJoinPool",
    genRt.osmosis.gamm.v1beta1.IMsgJoinPool
  ),
  nativeMsgMatcher(
    "/osmosis.gamm.v1beta1.MsgExitPool",
    genRt.osmosis.gamm.v1beta1.IMsgExitPool
  ),
  nativeMsgMatcher(
    "/osmosis.lockup.MsgLockTokens",
    genRt.osmosis.lockup.IMsgLockTokens
  ),
  nativeMsgMatcher(
    "/osmosis.lockup.MsgBeginUnlockingAll",
    genRt.osmosis.lockup.IMsgBeginUnlockingAll
  ),
]);

export const legacy = asTuple([
  legacyMsgSimpleMatcher(
    "osmosis/gamm/swap-exact-amount-in",
    "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
    genRt.osmosis.gamm.v1beta1.IMsgSwapExactAmountIn,
    (x) => x.sender
  ),
  legacyMsgSimpleMatcher(
    "osmosis/gamm/join-pool",
    "/osmosis.gamm.v1beta1.MsgJoinPool",
    genRt.osmosis.gamm.v1beta1.IMsgJoinPool,
    (x) => x.sender
  ),
  legacyMsgSimpleMatcher(
    "osmosis/gamm/exit-pool",
    "/osmosis.gamm.v1beta1.MsgExitPool",
    genRt.osmosis.gamm.v1beta1.IMsgExitPool,
    (x) => x.sender
  ),
  legacyMsgMatcher(
    "osmosis/lockup/lock-tokens",
    Record({
      owner: String,
      duration: String,
      coins: Array(Coin),
    }),
    "/osmosis.lockup.MsgLockTokens",
    genRt.osmosis.lockup.IMsgLockTokens,
    (x) => x.owner,
    (x) => {
      const duration = new BN(x.duration)
      const nanosPerSecond = new BN("1000000000")
      const seconds = duration.div(nanosPerSecond).toString()
      const nanos = duration.umod(nanosPerSecond).toNumber()

      return {
        owner: x.owner,
        duration: {
          seconds, nanos
        },
        coins: x.coins,
      }
    }
  ),
  legacyMsgSimpleMatcher(
    "osmosis/lockup/begin-unlock-period-lock",
    "/osmosis.lockup.MsgBeginUnlockingAll",
    genRt.osmosis.lockup.IMsgBeginUnlockingAll,
    (x) => x.owner
  ),
]);
