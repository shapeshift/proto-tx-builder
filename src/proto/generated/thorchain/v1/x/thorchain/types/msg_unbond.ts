/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Tx } from "../../../../../thorchain/v1/common/common";

export interface MsgUnBond {
  txIn?: Tx;
  nodeAddress: Uint8Array;
  bondAddress: string;
  amount: string;
  signer: Uint8Array;
  bondProviderAddress: Uint8Array;
}

function createBaseMsgUnBond(): MsgUnBond {
  return {
    txIn: undefined,
    nodeAddress: new Uint8Array(),
    bondAddress: "",
    amount: "",
    signer: new Uint8Array(),
    bondProviderAddress: new Uint8Array(),
  };
}

export const MsgUnBond = {
  encode(
    message: MsgUnBond,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.txIn !== undefined) {
      Tx.encode(message.txIn, writer.uint32(10).fork()).ldelim();
    }
    if (message.nodeAddress.length !== 0) {
      writer.uint32(18).bytes(message.nodeAddress);
    }
    if (message.bondAddress !== "") {
      writer.uint32(42).string(message.bondAddress);
    }
    if (message.amount !== "") {
      writer.uint32(50).string(message.amount);
    }
    if (message.signer.length !== 0) {
      writer.uint32(58).bytes(message.signer);
    }
    if (message.bondProviderAddress.length !== 0) {
      writer.uint32(66).bytes(message.bondProviderAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnBond {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnBond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txIn = Tx.decode(reader, reader.uint32());
          break;
        case 2:
          message.nodeAddress = reader.bytes();
          break;
        case 5:
          message.bondAddress = reader.string();
          break;
        case 6:
          message.amount = reader.string();
          break;
        case 7:
          message.signer = reader.bytes();
          break;
        case 8:
          message.bondProviderAddress = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUnBond {
    return {
      txIn: isSet(object.txIn) ? Tx.fromJSON(object.txIn) : undefined,
      nodeAddress: isSet(object.nodeAddress)
        ? bytesFromBase64(object.nodeAddress)
        : new Uint8Array(),
      bondAddress: isSet(object.bondAddress) ? String(object.bondAddress) : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
      signer: isSet(object.signer)
        ? bytesFromBase64(object.signer)
        : new Uint8Array(),
      bondProviderAddress: isSet(object.bondProviderAddress)
        ? bytesFromBase64(object.bondProviderAddress)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgUnBond): unknown {
    const obj: any = {};
    message.txIn !== undefined &&
      (obj.txIn = message.txIn ? Tx.toJSON(message.txIn) : undefined);
    message.nodeAddress !== undefined &&
      (obj.nodeAddress = base64FromBytes(
        message.nodeAddress !== undefined
          ? message.nodeAddress
          : new Uint8Array()
      ));
    message.bondAddress !== undefined &&
      (obj.bondAddress = message.bondAddress);
    message.amount !== undefined && (obj.amount = message.amount);
    message.signer !== undefined &&
      (obj.signer = base64FromBytes(
        message.signer !== undefined ? message.signer : new Uint8Array()
      ));
    message.bondProviderAddress !== undefined &&
      (obj.bondProviderAddress = base64FromBytes(
        message.bondProviderAddress !== undefined
          ? message.bondProviderAddress
          : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnBond>, I>>(
    object: I
  ): MsgUnBond {
    const message = createBaseMsgUnBond();
    message.txIn =
      object.txIn !== undefined && object.txIn !== null
        ? Tx.fromPartial(object.txIn)
        : undefined;
    message.nodeAddress = object.nodeAddress ?? new Uint8Array();
    message.bondAddress = object.bondAddress ?? "";
    message.amount = object.amount ?? "";
    message.signer = object.signer ?? new Uint8Array();
    message.bondProviderAddress =
      object.bondProviderAddress ?? new Uint8Array();
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
