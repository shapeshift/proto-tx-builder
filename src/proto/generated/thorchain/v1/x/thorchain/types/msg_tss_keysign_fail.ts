/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Blame } from "../../../../../thorchain/v1/x/thorchain/types/type_blame";
import { Coin } from "../../../../../thorchain/v1/common/common";

export interface MsgTssKeysignFail {
  id: string;
  height: Long;
  blame?: Blame;
  memo: string;
  coins: Coin[];
  pubKey: string;
  signer: Uint8Array;
}

function createBaseMsgTssKeysignFail(): MsgTssKeysignFail {
  return {
    id: "",
    height: Long.ZERO,
    blame: undefined,
    memo: "",
    coins: [],
    pubKey: "",
    signer: new Uint8Array(),
  };
}

export const MsgTssKeysignFail = {
  encode(
    message: MsgTssKeysignFail,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (!message.height.isZero()) {
      writer.uint32(16).int64(message.height);
    }
    if (message.blame !== undefined) {
      Blame.encode(message.blame, writer.uint32(26).fork()).ldelim();
    }
    if (message.memo !== "") {
      writer.uint32(34).string(message.memo);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.pubKey !== "") {
      writer.uint32(50).string(message.pubKey);
    }
    if (message.signer.length !== 0) {
      writer.uint32(58).bytes(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTssKeysignFail {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTssKeysignFail();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.height = reader.int64() as Long;
          break;
        case 3:
          message.blame = Blame.decode(reader, reader.uint32());
          break;
        case 4:
          message.memo = reader.string();
          break;
        case 5:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        case 6:
          message.pubKey = reader.string();
          break;
        case 7:
          message.signer = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTssKeysignFail {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      height: isSet(object.height) ? Long.fromString(object.height) : Long.ZERO,
      blame: isSet(object.blame) ? Blame.fromJSON(object.blame) : undefined,
      memo: isSet(object.memo) ? String(object.memo) : "",
      coins: Array.isArray(object?.coins)
        ? object.coins.map((e: any) => Coin.fromJSON(e))
        : [],
      pubKey: isSet(object.pubKey) ? String(object.pubKey) : "",
      signer: isSet(object.signer)
        ? bytesFromBase64(object.signer)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgTssKeysignFail): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.height !== undefined &&
      (obj.height = (message.height || Long.ZERO).toString());
    message.blame !== undefined &&
      (obj.blame = message.blame ? Blame.toJSON(message.blame) : undefined);
    message.memo !== undefined && (obj.memo = message.memo);
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.coins = [];
    }
    message.pubKey !== undefined && (obj.pubKey = message.pubKey);
    message.signer !== undefined &&
      (obj.signer = base64FromBytes(
        message.signer !== undefined ? message.signer : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTssKeysignFail>, I>>(
    object: I
  ): MsgTssKeysignFail {
    const message = createBaseMsgTssKeysignFail();
    message.id = object.id ?? "";
    message.height =
      object.height !== undefined && object.height !== null
        ? Long.fromValue(object.height)
        : Long.ZERO;
    message.blame =
      object.blame !== undefined && object.blame !== null
        ? Blame.fromPartial(object.blame)
        : undefined;
    message.memo = object.memo ?? "";
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.pubKey = object.pubKey ?? "";
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
