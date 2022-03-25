/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface Jail {
  nodeAddress: Uint8Array;
  releaseHeight: Long;
  reason: string;
}

function createBaseJail(): Jail {
  return {
    nodeAddress: new Uint8Array(),
    releaseHeight: Long.ZERO,
    reason: "",
  };
}

export const Jail = {
  encode(message: Jail, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeAddress.length !== 0) {
      writer.uint32(10).bytes(message.nodeAddress);
    }
    if (!message.releaseHeight.isZero()) {
      writer.uint32(16).int64(message.releaseHeight);
    }
    if (message.reason !== "") {
      writer.uint32(26).string(message.reason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Jail {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJail();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodeAddress = reader.bytes();
          break;
        case 2:
          message.releaseHeight = reader.int64() as Long;
          break;
        case 3:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Jail {
    return {
      nodeAddress: isSet(object.nodeAddress)
        ? bytesFromBase64(object.nodeAddress)
        : new Uint8Array(),
      releaseHeight: isSet(object.releaseHeight)
        ? Long.fromString(object.releaseHeight)
        : Long.ZERO,
      reason: isSet(object.reason) ? String(object.reason) : "",
    };
  },

  toJSON(message: Jail): unknown {
    const obj: any = {};
    message.nodeAddress !== undefined &&
      (obj.nodeAddress = base64FromBytes(
        message.nodeAddress !== undefined
          ? message.nodeAddress
          : new Uint8Array()
      ));
    message.releaseHeight !== undefined &&
      (obj.releaseHeight = (message.releaseHeight || Long.ZERO).toString());
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Jail>, I>>(object: I): Jail {
    const message = createBaseJail();
    message.nodeAddress = object.nodeAddress ?? new Uint8Array();
    message.releaseHeight =
      object.releaseHeight !== undefined && object.releaseHeight !== null
        ? Long.fromValue(object.releaseHeight)
        : Long.ZERO;
    message.reason = object.reason ?? "";
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
