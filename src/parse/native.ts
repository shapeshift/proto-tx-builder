import {
  Array,
  match,
  Record,
  Static,
  String,
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

const nativeMsgMatchers = asTuple([
  ...cosmos.native,
  ...ibc.native,
  ...osmosis.native,
  ...thorchain.native,
]);
export const NativeMsg = Union(...runtypesOfMatcherList(nativeMsgMatchers));
export type NativeMsg = Static<typeof NativeMsg>;

const NativeMsgBase = Record({
  typeUrl: String,
  value: Unknown,
});
type NativeMsgBase = Static<typeof NativeMsgBase>;

export const NativeTxBase = Record({
  from: String,
  fee: StdFee,
  msgs: Array(NativeMsgBase),
  memo: String.optional(),
});
export type NativeTxBase = Static<typeof NativeTxBase>;

export const NativeTx = NativeTxBase.omit("msgs").extend({
  msgs: Array(NativeMsg),
});
export type NativeTx = Static<typeof NativeTx>;

export function parseNativeTx(tx: NativeTxBase) {
  return {
    from: tx.from,
    msgs: tx.msgs.map(
      match(
        ...nativeMsgMatchers,
        when(
          Record({
            typeUrl: fieldOfUnionOfRecords(NativeMsg, "typeUrl"),
            value: Unknown,
          }),
          (x) => {
            throw new Error(`Malformed ${x.typeUrl} message`);
          }
        ),
        when(
          Record({
            typeUrl: String,
            value: Unknown,
          }),
          (x) => {
            throw new Error(`Unhandled native tx message type: ${x.typeUrl}`);
          }
        )
      )
    ),
    fee: {
      amount: tx.fee.amount.filter((x) => x.amount !== "0"),
      gas: tx.fee.gas,
    },
    memo: tx.memo,
  };
}
