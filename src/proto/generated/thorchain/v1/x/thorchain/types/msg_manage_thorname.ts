/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin, Asset } from "../../../../../thorchain/v1/common/common";

export interface MsgManageTHORName {
  name: string;
  chain: string;
  address: string;
  coin?: Coin;
  expireBlockHeight: Long;
  preferredAsset?: Asset;
  owner: Uint8Array;
  signer: Uint8Array;
}

function createBaseMsgManageTHORName(): MsgManageTHORName {
  return {
    name: "",
    chain: "",
    address: "",
    coin: undefined,
    expireBlockHeight: Long.ZERO,
    preferredAsset: undefined,
    owner: new Uint8Array(),
    signer: new Uint8Array(),
  };
}

export const MsgManageTHORName = {
  encode(
    message: MsgManageTHORName,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.chain !== "") {
      writer.uint32(18).string(message.chain);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(34).fork()).ldelim();
    }
    if (!message.expireBlockHeight.isZero()) {
      writer.uint32(40).int64(message.expireBlockHeight);
    }
    if (message.preferredAsset !== undefined) {
      Asset.encode(message.preferredAsset, writer.uint32(50).fork()).ldelim();
    }
    if (message.owner.length !== 0) {
      writer.uint32(58).bytes(message.owner);
    }
    if (message.signer.length !== 0) {
      writer.uint32(66).bytes(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgManageTHORName {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgManageTHORName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.chain = reader.string();
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.coin = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.expireBlockHeight = reader.int64() as Long;
          break;
        case 6:
          message.preferredAsset = Asset.decode(reader, reader.uint32());
          break;
        case 7:
          message.owner = reader.bytes();
          break;
        case 8:
          message.signer = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgManageTHORName {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      chain: isSet(object.chain) ? String(object.chain) : "",
      address: isSet(object.address) ? String(object.address) : "",
      coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
      expireBlockHeight: isSet(object.expireBlockHeight)
        ? Long.fromString(object.expireBlockHeight)
        : Long.ZERO,
      preferredAsset: isSet(object.preferredAsset)
        ? Asset.fromJSON(object.preferredAsset)
        : undefined,
      owner: isSet(object.owner)
        ? bytesFromBase64(object.owner)
        : new Uint8Array(),
      signer: isSet(object.signer)
        ? bytesFromBase64(object.signer)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgManageTHORName): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.chain !== undefined && (obj.chain = message.chain);
    message.address !== undefined && (obj.address = message.address);
    message.coin !== undefined &&
      (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
    message.expireBlockHeight !== undefined &&
      (obj.expireBlockHeight = (
        message.expireBlockHeight || Long.ZERO
      ).toString());
    message.preferredAsset !== undefined &&
      (obj.preferredAsset = message.preferredAsset
        ? Asset.toJSON(message.preferredAsset)
        : undefined);
    message.owner !== undefined &&
      (obj.owner = base64FromBytes(
        message.owner !== undefined ? message.owner : new Uint8Array()
      ));
    message.signer !== undefined &&
      (obj.signer = base64FromBytes(
        message.signer !== undefined ? message.signer : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgManageTHORName>, I>>(
    object: I
  ): MsgManageTHORName {
    const message = createBaseMsgManageTHORName();
    message.name = object.name ?? "";
    message.chain = object.chain ?? "";
    message.address = object.address ?? "";
    message.coin =
      object.coin !== undefined && object.coin !== null
        ? Coin.fromPartial(object.coin)
        : undefined;
    message.expireBlockHeight =
      object.expireBlockHeight !== undefined &&
      object.expireBlockHeight !== null
        ? Long.fromValue(object.expireBlockHeight)
        : Long.ZERO;
    message.preferredAsset =
      object.preferredAsset !== undefined && object.preferredAsset !== null
        ? Asset.fromPartial(object.preferredAsset)
        : undefined;
    message.owner = object.owner ?? new Uint8Array();
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
