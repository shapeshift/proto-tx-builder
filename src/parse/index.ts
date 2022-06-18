import { match, Static, Union, Unknown, when } from "runtypes";
import { LegacyTxBase, parseLegacyTx } from "./legacy";
import { NativeTxBase, parseNativeTx } from "./native";

export const TxBase = Union(LegacyTxBase, NativeTxBase);
export type TxBase = Static<typeof TxBase>;

export function parseTx(tx: TxBase) {
  return match(
    when(LegacyTxBase, parseLegacyTx),
    when(NativeTxBase, parseNativeTx),
    when(Unknown, (x) => {
      throw new TypeError(
        `Unrecognised transaction type! tx = ${JSON.stringify(x)}`
      );
    })
  )(tx);
}
