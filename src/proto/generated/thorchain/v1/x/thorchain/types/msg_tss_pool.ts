/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  KeygenType,
  keygenTypeFromJSON,
  keygenTypeToJSON,
} from "../../../../../thorchain/v1/x/thorchain/types/type_keygen";
import { Blame } from "../../../../../thorchain/v1/x/thorchain/types/type_blame";

export interface MsgTssPool {
  id: string;
  poolPubKey: string;
  keygenType: KeygenType;
  pubKeys: string[];
  height: Long;
  blame?: Blame;
  chains: string[];
  signer: Uint8Array;
  keygenTime: Long;
}

function createBaseMsgTssPool(): MsgTssPool {
  return {
    id: "",
    poolPubKey: "",
    keygenType: 0,
    pubKeys: [],
    height: Long.ZERO,
    blame: undefined,
    chains: [],
    signer: new Uint8Array(),
    keygenTime: Long.ZERO,
  };
}

export const MsgTssPool = {
  encode(
    message: MsgTssPool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.poolPubKey !== "") {
      writer.uint32(18).string(message.poolPubKey);
    }
    if (message.keygenType !== 0) {
      writer.uint32(24).int32(message.keygenType);
    }
    for (const v of message.pubKeys) {
      writer.uint32(34).string(v!);
    }
    if (!message.height.isZero()) {
      writer.uint32(40).int64(message.height);
    }
    if (message.blame !== undefined) {
      Blame.encode(message.blame, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.chains) {
      writer.uint32(58).string(v!);
    }
    if (message.signer.length !== 0) {
      writer.uint32(66).bytes(message.signer);
    }
    if (!message.keygenTime.isZero()) {
      writer.uint32(72).int64(message.keygenTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTssPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTssPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.poolPubKey = reader.string();
          break;
        case 3:
          message.keygenType = reader.int32() as any;
          break;
        case 4:
          message.pubKeys.push(reader.string());
          break;
        case 5:
          message.height = reader.int64() as Long;
          break;
        case 6:
          message.blame = Blame.decode(reader, reader.uint32());
          break;
        case 7:
          message.chains.push(reader.string());
          break;
        case 8:
          message.signer = reader.bytes();
          break;
        case 9:
          message.keygenTime = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTssPool {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      poolPubKey: isSet(object.poolPubKey) ? String(object.poolPubKey) : "",
      keygenType: isSet(object.keygenType)
        ? keygenTypeFromJSON(object.keygenType)
        : 0,
      pubKeys: Array.isArray(object?.pubKeys)
        ? object.pubKeys.map((e: any) => String(e))
        : [],
      height: isSet(object.height) ? Long.fromString(object.height) : Long.ZERO,
      blame: isSet(object.blame) ? Blame.fromJSON(object.blame) : undefined,
      chains: Array.isArray(object?.chains)
        ? object.chains.map((e: any) => String(e))
        : [],
      signer: isSet(object.signer)
        ? bytesFromBase64(object.signer)
        : new Uint8Array(),
      keygenTime: isSet(object.keygenTime)
        ? Long.fromString(object.keygenTime)
        : Long.ZERO,
    };
  },

  toJSON(message: MsgTssPool): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.poolPubKey !== undefined && (obj.poolPubKey = message.poolPubKey);
    message.keygenType !== undefined &&
      (obj.keygenType = keygenTypeToJSON(message.keygenType));
    if (message.pubKeys) {
      obj.pubKeys = message.pubKeys.map((e) => e);
    } else {
      obj.pubKeys = [];
    }
    message.height !== undefined &&
      (obj.height = (message.height || Long.ZERO).toString());
    message.blame !== undefined &&
      (obj.blame = message.blame ? Blame.toJSON(message.blame) : undefined);
    if (message.chains) {
      obj.chains = message.chains.map((e) => e);
    } else {
      obj.chains = [];
    }
    message.signer !== undefined &&
      (obj.signer = base64FromBytes(
        message.signer !== undefined ? message.signer : new Uint8Array()
      ));
    message.keygenTime !== undefined &&
      (obj.keygenTime = (message.keygenTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTssPool>, I>>(
    object: I
  ): MsgTssPool {
    const message = createBaseMsgTssPool();
    message.id = object.id ?? "";
    message.poolPubKey = object.poolPubKey ?? "";
    message.keygenType = object.keygenType ?? 0;
    message.pubKeys = object.pubKeys?.map((e) => e) || [];
    message.height =
      object.height !== undefined && object.height !== null
        ? Long.fromValue(object.height)
        : Long.ZERO;
    message.blame =
      object.blame !== undefined && object.blame !== null
        ? Blame.fromPartial(object.blame)
        : undefined;
    message.chains = object.chains?.map((e) => e) || [];
    message.signer = object.signer ?? new Uint8Array();
    message.keygenTime =
      object.keygenTime !== undefined && object.keygenTime !== null
        ? Long.fromValue(object.keygenTime)
        : Long.ZERO;
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
