import { toAccAddress } from "@cosmjs/stargate/build/queryclient/utils";
import { Array, Record, String } from "runtypes";

import { asTuple, Coin, legacyMsgMatcher, nativeMsgMatcher } from "./utils";

import * as genRt from "../../proto/runtypes";

export const native = asTuple([
  nativeMsgMatcher("/types.MsgSend", genRt.types.IMsgSend),
  nativeMsgMatcher("/types.MsgDeposit", genRt.types.IMsgDeposit),
]);

/**
 * Parses THORChain asset notation.
 * Ref: https://gitlab.com/thorchain/thornode/-/blob/fdbbb25ecb8245bb76a4d5b976e31c0f3e1dd1e0/common/asset.go#L40-75
 * Ref: https://regexr.com/6il5h
 */
export function parseThorchainAsset(x: string) {
  const groups =
    /^(?:(?<chain>[A-Z]{3,10})(?<synthIfSlash>[/.]))?(?<symbol>(?<ticker>[A-Z0-9._]{1,13})(?:-(?<id>[A-Z0-9-._]*))?)$/.exec(
      x.toUpperCase()
    )?.groups;
  if (!groups) throw new Error(`Invalid THORChain asset: ${x}`);
  return {
    chain: groups.chain ?? "THOR",
    symbol: groups.symbol,
    ticker: groups.ticker,
    // This must return undefined rather than false to ensure the field is omitted from the Asset's protobuf encoding.
    synth: groups.synthIfSlash === "/" ? (true as const) : undefined,
  };
}

export const legacy = asTuple([
  legacyMsgMatcher(
    "thorchain/MsgSend",
    Record({
      from_address: String,
      to_address: String,
      amount: Array(Coin),
    }),
    "/types.MsgSend",
    genRt.types.IMsgSend,
    (x) => x.from_address,
    (x) => ({
      fromAddress: toAccAddress(x.from_address),
      toAddress: toAccAddress(x.to_address),
      amount: x.amount,
    })
  ),
  legacyMsgMatcher(
    "thorchain/MsgDeposit",
    Record({
      signer: String,
      coins: Array(
        Record({
          asset: String,
          amount: String,
        })
      ),
      memo: String,
    }),
    "/types.MsgDeposit",
    genRt.types.IMsgDeposit,
    (x) => x.signer,
    (x) => ({
      coins: x.coins.map((coin) => ({
        asset: parseThorchainAsset(coin.asset),
        amount: coin.amount,
      })),
      memo: x.memo,
      signer: toAccAddress(x.signer),
    })
  ),
]);
