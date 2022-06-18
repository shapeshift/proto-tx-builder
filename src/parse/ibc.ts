import { asTuple, Coin, legacyMsgMatcher, nativeMsgMatcher } from "./utils";

import * as genRt from "../../proto/runtypes";
import { Record, String } from "runtypes";

export const native = asTuple([
  nativeMsgMatcher(
    "/ibc.applications.transfer.v1.MsgTransfer",
    genRt.ibc.applications.transfer.v1.IMsgTransfer
  ),
]);

export const legacy = asTuple([
  legacyMsgMatcher(
    "cosmos-sdk/MsgTransfer",
    Record({
      source_port: String,
      source_channel: String,
      token: Coin,
      receiver: String,
      sender: String,
      timeout_height: Record({
        revision_height: String,
        revision_number: String,
      }),
    }),
    "/ibc.applications.transfer.v1.MsgTransfer",
    genRt.ibc.applications.transfer.v1.IMsgTransfer,
    (x) => x.sender,
    (x) => ({
      sourcePort: x.source_port,
      sourceChannel: x.source_channel,
      token: x.token,
      receiver: x.receiver,
      sender: x.sender,
      timeoutHeight: {
        revisionHeight: x.timeout_height.revision_height,
        revisionNumber: x.timeout_height.revision_number,
      },
    }),
  ),
]);
