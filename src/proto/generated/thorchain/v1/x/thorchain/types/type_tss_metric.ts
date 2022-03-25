/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface NodeTssTime {
  address: Uint8Array;
  tssTime: Long;
}

export interface TssKeygenMetric {
  pubKey: string;
  nodeTssTimes: NodeTssTime[];
}

export interface TssKeysignMetric {
  txId: string;
  nodeTssTimes: NodeTssTime[];
}

function createBaseNodeTssTime(): NodeTssTime {
  return { address: new Uint8Array(), tssTime: Long.ZERO };
}

export const NodeTssTime = {
  encode(
    message: NodeTssTime,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    if (!message.tssTime.isZero()) {
      writer.uint32(16).int64(message.tssTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeTssTime {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeTssTime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;
        case 2:
          message.tssTime = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NodeTssTime {
    return {
      address: isSet(object.address)
        ? bytesFromBase64(object.address)
        : new Uint8Array(),
      tssTime: isSet(object.tssTime)
        ? Long.fromString(object.tssTime)
        : Long.ZERO,
    };
  },

  toJSON(message: NodeTssTime): unknown {
    const obj: any = {};
    message.address !== undefined &&
      (obj.address = base64FromBytes(
        message.address !== undefined ? message.address : new Uint8Array()
      ));
    message.tssTime !== undefined &&
      (obj.tssTime = (message.tssTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NodeTssTime>, I>>(
    object: I
  ): NodeTssTime {
    const message = createBaseNodeTssTime();
    message.address = object.address ?? new Uint8Array();
    message.tssTime =
      object.tssTime !== undefined && object.tssTime !== null
        ? Long.fromValue(object.tssTime)
        : Long.ZERO;
    return message;
  },
};

function createBaseTssKeygenMetric(): TssKeygenMetric {
  return { pubKey: "", nodeTssTimes: [] };
}

export const TssKeygenMetric = {
  encode(
    message: TssKeygenMetric,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pubKey !== "") {
      writer.uint32(10).string(message.pubKey);
    }
    for (const v of message.nodeTssTimes) {
      NodeTssTime.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TssKeygenMetric {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTssKeygenMetric();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pubKey = reader.string();
          break;
        case 2:
          message.nodeTssTimes.push(
            NodeTssTime.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TssKeygenMetric {
    return {
      pubKey: isSet(object.pubKey) ? String(object.pubKey) : "",
      nodeTssTimes: Array.isArray(object?.nodeTssTimes)
        ? object.nodeTssTimes.map((e: any) => NodeTssTime.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TssKeygenMetric): unknown {
    const obj: any = {};
    message.pubKey !== undefined && (obj.pubKey = message.pubKey);
    if (message.nodeTssTimes) {
      obj.nodeTssTimes = message.nodeTssTimes.map((e) =>
        e ? NodeTssTime.toJSON(e) : undefined
      );
    } else {
      obj.nodeTssTimes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TssKeygenMetric>, I>>(
    object: I
  ): TssKeygenMetric {
    const message = createBaseTssKeygenMetric();
    message.pubKey = object.pubKey ?? "";
    message.nodeTssTimes =
      object.nodeTssTimes?.map((e) => NodeTssTime.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTssKeysignMetric(): TssKeysignMetric {
  return { txId: "", nodeTssTimes: [] };
}

export const TssKeysignMetric = {
  encode(
    message: TssKeysignMetric,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.txId !== "") {
      writer.uint32(10).string(message.txId);
    }
    for (const v of message.nodeTssTimes) {
      NodeTssTime.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TssKeysignMetric {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTssKeysignMetric();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txId = reader.string();
          break;
        case 2:
          message.nodeTssTimes.push(
            NodeTssTime.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TssKeysignMetric {
    return {
      txId: isSet(object.txId) ? String(object.txId) : "",
      nodeTssTimes: Array.isArray(object?.nodeTssTimes)
        ? object.nodeTssTimes.map((e: any) => NodeTssTime.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TssKeysignMetric): unknown {
    const obj: any = {};
    message.txId !== undefined && (obj.txId = message.txId);
    if (message.nodeTssTimes) {
      obj.nodeTssTimes = message.nodeTssTimes.map((e) =>
        e ? NodeTssTime.toJSON(e) : undefined
      );
    } else {
      obj.nodeTssTimes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TssKeysignMetric>, I>>(
    object: I
  ): TssKeysignMetric {
    const message = createBaseTssKeysignMetric();
    message.txId = object.txId ?? "";
    message.nodeTssTimes =
      object.nodeTssTimes?.map((e) => NodeTssTime.fromPartial(e)) || [];
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
