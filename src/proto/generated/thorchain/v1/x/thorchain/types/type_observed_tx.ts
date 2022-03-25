/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Tx } from "../../../../../thorchain/v1/common/common";
import { TxOutItem } from "../../../../../thorchain/v1/x/thorchain/types/type_tx_out";

export enum Status {
  incomplete = 0,
  done = 1,
  reverted = 2,
  UNRECOGNIZED = -1,
}

export function statusFromJSON(object: any): Status {
  switch (object) {
    case 0:
    case "incomplete":
      return Status.incomplete;
    case 1:
    case "done":
      return Status.done;
    case 2:
    case "reverted":
      return Status.reverted;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Status.UNRECOGNIZED;
  }
}

export function statusToJSON(object: Status): string {
  switch (object) {
    case Status.incomplete:
      return "incomplete";
    case Status.done:
      return "done";
    case Status.reverted:
      return "reverted";
    default:
      return "UNKNOWN";
  }
}

export interface ObservedTx {
  tx?: Tx;
  status: Status;
  outHashes: string[];
  blockHeight: Long;
  signers: string[];
  observedPubKey: string;
  keysignMs: Long;
  finaliseHeight: Long;
}

export interface ObservedTxVoter {
  txId: string;
  tx?: ObservedTx;
  height: Long;
  txs: ObservedTx[];
  actions: TxOutItem[];
  outTxs: Tx[];
  finalisedHeight: Long;
  updatedVault: boolean;
  reverted: boolean;
  outboundHeight: Long;
}

function createBaseObservedTx(): ObservedTx {
  return {
    tx: undefined,
    status: 0,
    outHashes: [],
    blockHeight: Long.ZERO,
    signers: [],
    observedPubKey: "",
    keysignMs: Long.ZERO,
    finaliseHeight: Long.ZERO,
  };
}

export const ObservedTx = {
  encode(
    message: ObservedTx,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    for (const v of message.outHashes) {
      writer.uint32(26).string(v!);
    }
    if (!message.blockHeight.isZero()) {
      writer.uint32(32).int64(message.blockHeight);
    }
    for (const v of message.signers) {
      writer.uint32(42).string(v!);
    }
    if (message.observedPubKey !== "") {
      writer.uint32(50).string(message.observedPubKey);
    }
    if (!message.keysignMs.isZero()) {
      writer.uint32(56).int64(message.keysignMs);
    }
    if (!message.finaliseHeight.isZero()) {
      writer.uint32(64).int64(message.finaliseHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObservedTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObservedTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = Tx.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.outHashes.push(reader.string());
          break;
        case 4:
          message.blockHeight = reader.int64() as Long;
          break;
        case 5:
          message.signers.push(reader.string());
          break;
        case 6:
          message.observedPubKey = reader.string();
          break;
        case 7:
          message.keysignMs = reader.int64() as Long;
          break;
        case 8:
          message.finaliseHeight = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObservedTx {
    return {
      tx: isSet(object.tx) ? Tx.fromJSON(object.tx) : undefined,
      status: isSet(object.status) ? statusFromJSON(object.status) : 0,
      outHashes: Array.isArray(object?.outHashes)
        ? object.outHashes.map((e: any) => String(e))
        : [],
      blockHeight: isSet(object.blockHeight)
        ? Long.fromString(object.blockHeight)
        : Long.ZERO,
      signers: Array.isArray(object?.signers)
        ? object.signers.map((e: any) => String(e))
        : [],
      observedPubKey: isSet(object.observedPubKey)
        ? String(object.observedPubKey)
        : "",
      keysignMs: isSet(object.keysignMs)
        ? Long.fromString(object.keysignMs)
        : Long.ZERO,
      finaliseHeight: isSet(object.finaliseHeight)
        ? Long.fromString(object.finaliseHeight)
        : Long.ZERO,
    };
  },

  toJSON(message: ObservedTx): unknown {
    const obj: any = {};
    message.tx !== undefined &&
      (obj.tx = message.tx ? Tx.toJSON(message.tx) : undefined);
    message.status !== undefined && (obj.status = statusToJSON(message.status));
    if (message.outHashes) {
      obj.outHashes = message.outHashes.map((e) => e);
    } else {
      obj.outHashes = [];
    }
    message.blockHeight !== undefined &&
      (obj.blockHeight = (message.blockHeight || Long.ZERO).toString());
    if (message.signers) {
      obj.signers = message.signers.map((e) => e);
    } else {
      obj.signers = [];
    }
    message.observedPubKey !== undefined &&
      (obj.observedPubKey = message.observedPubKey);
    message.keysignMs !== undefined &&
      (obj.keysignMs = (message.keysignMs || Long.ZERO).toString());
    message.finaliseHeight !== undefined &&
      (obj.finaliseHeight = (message.finaliseHeight || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ObservedTx>, I>>(
    object: I
  ): ObservedTx {
    const message = createBaseObservedTx();
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? Tx.fromPartial(object.tx)
        : undefined;
    message.status = object.status ?? 0;
    message.outHashes = object.outHashes?.map((e) => e) || [];
    message.blockHeight =
      object.blockHeight !== undefined && object.blockHeight !== null
        ? Long.fromValue(object.blockHeight)
        : Long.ZERO;
    message.signers = object.signers?.map((e) => e) || [];
    message.observedPubKey = object.observedPubKey ?? "";
    message.keysignMs =
      object.keysignMs !== undefined && object.keysignMs !== null
        ? Long.fromValue(object.keysignMs)
        : Long.ZERO;
    message.finaliseHeight =
      object.finaliseHeight !== undefined && object.finaliseHeight !== null
        ? Long.fromValue(object.finaliseHeight)
        : Long.ZERO;
    return message;
  },
};

function createBaseObservedTxVoter(): ObservedTxVoter {
  return {
    txId: "",
    tx: undefined,
    height: Long.ZERO,
    txs: [],
    actions: [],
    outTxs: [],
    finalisedHeight: Long.ZERO,
    updatedVault: false,
    reverted: false,
    outboundHeight: Long.ZERO,
  };
}

export const ObservedTxVoter = {
  encode(
    message: ObservedTxVoter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.txId !== "") {
      writer.uint32(10).string(message.txId);
    }
    if (message.tx !== undefined) {
      ObservedTx.encode(message.tx, writer.uint32(18).fork()).ldelim();
    }
    if (!message.height.isZero()) {
      writer.uint32(24).int64(message.height);
    }
    for (const v of message.txs) {
      ObservedTx.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.actions) {
      TxOutItem.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.outTxs) {
      Tx.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (!message.finalisedHeight.isZero()) {
      writer.uint32(56).int64(message.finalisedHeight);
    }
    if (message.updatedVault === true) {
      writer.uint32(64).bool(message.updatedVault);
    }
    if (message.reverted === true) {
      writer.uint32(72).bool(message.reverted);
    }
    if (!message.outboundHeight.isZero()) {
      writer.uint32(80).int64(message.outboundHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObservedTxVoter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObservedTxVoter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txId = reader.string();
          break;
        case 2:
          message.tx = ObservedTx.decode(reader, reader.uint32());
          break;
        case 3:
          message.height = reader.int64() as Long;
          break;
        case 4:
          message.txs.push(ObservedTx.decode(reader, reader.uint32()));
          break;
        case 5:
          message.actions.push(TxOutItem.decode(reader, reader.uint32()));
          break;
        case 6:
          message.outTxs.push(Tx.decode(reader, reader.uint32()));
          break;
        case 7:
          message.finalisedHeight = reader.int64() as Long;
          break;
        case 8:
          message.updatedVault = reader.bool();
          break;
        case 9:
          message.reverted = reader.bool();
          break;
        case 10:
          message.outboundHeight = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObservedTxVoter {
    return {
      txId: isSet(object.txId) ? String(object.txId) : "",
      tx: isSet(object.tx) ? ObservedTx.fromJSON(object.tx) : undefined,
      height: isSet(object.height) ? Long.fromString(object.height) : Long.ZERO,
      txs: Array.isArray(object?.txs)
        ? object.txs.map((e: any) => ObservedTx.fromJSON(e))
        : [],
      actions: Array.isArray(object?.actions)
        ? object.actions.map((e: any) => TxOutItem.fromJSON(e))
        : [],
      outTxs: Array.isArray(object?.outTxs)
        ? object.outTxs.map((e: any) => Tx.fromJSON(e))
        : [],
      finalisedHeight: isSet(object.finalisedHeight)
        ? Long.fromString(object.finalisedHeight)
        : Long.ZERO,
      updatedVault: isSet(object.updatedVault)
        ? Boolean(object.updatedVault)
        : false,
      reverted: isSet(object.reverted) ? Boolean(object.reverted) : false,
      outboundHeight: isSet(object.outboundHeight)
        ? Long.fromString(object.outboundHeight)
        : Long.ZERO,
    };
  },

  toJSON(message: ObservedTxVoter): unknown {
    const obj: any = {};
    message.txId !== undefined && (obj.txId = message.txId);
    message.tx !== undefined &&
      (obj.tx = message.tx ? ObservedTx.toJSON(message.tx) : undefined);
    message.height !== undefined &&
      (obj.height = (message.height || Long.ZERO).toString());
    if (message.txs) {
      obj.txs = message.txs.map((e) => (e ? ObservedTx.toJSON(e) : undefined));
    } else {
      obj.txs = [];
    }
    if (message.actions) {
      obj.actions = message.actions.map((e) =>
        e ? TxOutItem.toJSON(e) : undefined
      );
    } else {
      obj.actions = [];
    }
    if (message.outTxs) {
      obj.outTxs = message.outTxs.map((e) => (e ? Tx.toJSON(e) : undefined));
    } else {
      obj.outTxs = [];
    }
    message.finalisedHeight !== undefined &&
      (obj.finalisedHeight = (message.finalisedHeight || Long.ZERO).toString());
    message.updatedVault !== undefined &&
      (obj.updatedVault = message.updatedVault);
    message.reverted !== undefined && (obj.reverted = message.reverted);
    message.outboundHeight !== undefined &&
      (obj.outboundHeight = (message.outboundHeight || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ObservedTxVoter>, I>>(
    object: I
  ): ObservedTxVoter {
    const message = createBaseObservedTxVoter();
    message.txId = object.txId ?? "";
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? ObservedTx.fromPartial(object.tx)
        : undefined;
    message.height =
      object.height !== undefined && object.height !== null
        ? Long.fromValue(object.height)
        : Long.ZERO;
    message.txs = object.txs?.map((e) => ObservedTx.fromPartial(e)) || [];
    message.actions =
      object.actions?.map((e) => TxOutItem.fromPartial(e)) || [];
    message.outTxs = object.outTxs?.map((e) => Tx.fromPartial(e)) || [];
    message.finalisedHeight =
      object.finalisedHeight !== undefined && object.finalisedHeight !== null
        ? Long.fromValue(object.finalisedHeight)
        : Long.ZERO;
    message.updatedVault = object.updatedVault ?? false;
    message.reverted = object.reverted ?? false;
    message.outboundHeight =
      object.outboundHeight !== undefined && object.outboundHeight !== null
        ? Long.fromValue(object.outboundHeight)
        : Long.ZERO;
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
