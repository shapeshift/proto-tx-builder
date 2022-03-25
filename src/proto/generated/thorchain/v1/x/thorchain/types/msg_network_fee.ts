/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface MsgNetworkFee {
  blockHeight: Long;
  chain: string;
  transactionSize: Long;
  transactionFeeRate: Long;
  signer: Uint8Array;
}

function createBaseMsgNetworkFee(): MsgNetworkFee {
  return {
    blockHeight: Long.ZERO,
    chain: "",
    transactionSize: Long.UZERO,
    transactionFeeRate: Long.UZERO,
    signer: new Uint8Array(),
  };
}

export const MsgNetworkFee = {
  encode(
    message: MsgNetworkFee,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.blockHeight.isZero()) {
      writer.uint32(8).int64(message.blockHeight);
    }
    if (message.chain !== "") {
      writer.uint32(18).string(message.chain);
    }
    if (!message.transactionSize.isZero()) {
      writer.uint32(24).uint64(message.transactionSize);
    }
    if (!message.transactionFeeRate.isZero()) {
      writer.uint32(32).uint64(message.transactionFeeRate);
    }
    if (message.signer.length !== 0) {
      writer.uint32(42).bytes(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNetworkFee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNetworkFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeight = reader.int64() as Long;
          break;
        case 2:
          message.chain = reader.string();
          break;
        case 3:
          message.transactionSize = reader.uint64() as Long;
          break;
        case 4:
          message.transactionFeeRate = reader.uint64() as Long;
          break;
        case 5:
          message.signer = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgNetworkFee {
    return {
      blockHeight: isSet(object.blockHeight)
        ? Long.fromString(object.blockHeight)
        : Long.ZERO,
      chain: isSet(object.chain) ? String(object.chain) : "",
      transactionSize: isSet(object.transactionSize)
        ? Long.fromString(object.transactionSize)
        : Long.UZERO,
      transactionFeeRate: isSet(object.transactionFeeRate)
        ? Long.fromString(object.transactionFeeRate)
        : Long.UZERO,
      signer: isSet(object.signer)
        ? bytesFromBase64(object.signer)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgNetworkFee): unknown {
    const obj: any = {};
    message.blockHeight !== undefined &&
      (obj.blockHeight = (message.blockHeight || Long.ZERO).toString());
    message.chain !== undefined && (obj.chain = message.chain);
    message.transactionSize !== undefined &&
      (obj.transactionSize = (
        message.transactionSize || Long.UZERO
      ).toString());
    message.transactionFeeRate !== undefined &&
      (obj.transactionFeeRate = (
        message.transactionFeeRate || Long.UZERO
      ).toString());
    message.signer !== undefined &&
      (obj.signer = base64FromBytes(
        message.signer !== undefined ? message.signer : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgNetworkFee>, I>>(
    object: I
  ): MsgNetworkFee {
    const message = createBaseMsgNetworkFee();
    message.blockHeight =
      object.blockHeight !== undefined && object.blockHeight !== null
        ? Long.fromValue(object.blockHeight)
        : Long.ZERO;
    message.chain = object.chain ?? "";
    message.transactionSize =
      object.transactionSize !== undefined && object.transactionSize !== null
        ? Long.fromValue(object.transactionSize)
        : Long.UZERO;
    message.transactionFeeRate =
      object.transactionFeeRate !== undefined &&
      object.transactionFeeRate !== null
        ? Long.fromValue(object.transactionFeeRate)
        : Long.UZERO;
    message.signer = object.signer ?? new Uint8Array();
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

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
