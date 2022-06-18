import {
  match,
  Record,
  Static,
  String,
  Tuple,
  Union,
  Unknown,
  when,
} from "runtypes";

import {
  asTuple,
  fieldOfUnionOfRecords,
  runtypesOfMatcherList,
  StdFee,
} from "./utils";

import * as cosmos from "./cosmos";
import * as ibc from "./ibc";
import * as osmosis from "./osmosis";
import * as thorchain from "./thorchain";

const AminoMsgBase = Record({
  type: String,
  value: Unknown,
});
type AminoMsgBase = Static<typeof AminoMsgBase>;

const aminoMsgMatchers = asTuple([
  ...cosmos.legacy,
  ...ibc.legacy,
  ...osmosis.legacy,
  ...thorchain.legacy,
]);
export const AminoMsg = Union(...runtypesOfMatcherList(aminoMsgMatchers));
export type AminoMsg = Static<typeof AminoMsg>;

export const LegacyTxBase = Record({
  fee: StdFee,
  msg: Tuple(AminoMsgBase),
  memo: String.optional(),
});
export type LegacyTxBase = Static<typeof LegacyTxBase>;

export const LegacyTx = LegacyTxBase.omit("msg").extend({
  msg: Tuple(AminoMsg),
});
export type LegacyTx = Static<typeof LegacyTx>;

// Do not explicitly type output of this function; the union of all possible output
// types will be inferred by the type system.
export function parseLegacyTx(tx: LegacyTxBase) {
  const parsed = match(
    ...aminoMsgMatchers,
    when(
      Record({
        type: fieldOfUnionOfRecords(AminoMsg, "type"),
        value: Unknown,
      }),
      (x) => {
        throw new Error(`Malformed ${x.type} message`);
      }
    ),
    when(
      Record({
        type: String,
        value: Unknown,
      }),
      (x) => {
        throw new Error(`Unhandled legacy tx message type: ${x.type}`);
      }
    )
  )(tx.msg[0]);
  return {
    from: parsed.from,
    msgs: [parsed.msg],
    fee: tx.fee,
    memo: tx.memo,
  };
}
