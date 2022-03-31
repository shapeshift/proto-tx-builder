/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ObservedTx } from "../../../../../thorchain/v1/x/thorchain/types/type_observed_tx";

export interface MsgNoOp {
  observedTx?: ObservedTx;
  signer: Uint8Array;
  action: string;
}

function createBaseMsgNoOp(): MsgNoOp {
  return { observedTx: undefined, signer: new Uint8Array(), action: "" };
}

export const MsgNoOp = {
  encode(
    message: MsgNoOp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.observedTx !== undefined) {
      ObservedTx.encode(message.observedTx, writer.uint32(10).fork()).ldelim();
    }
    if (message.signer.length !== 0) {
      writer.uint32(18).bytes(message.signer);
    }
    if (message.action !== "") {
      writer.uint32(26).string(message.action);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgNoOp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgNoOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.observedTx = ObservedTx.decode(reader, reader.uint32());
          break;
        case 2:
          message.signer = reader.bytes();
          break;
        case 3:
          message.action = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgNoOp {
    return {
      observedTx: isSet(object.observedTx)
        ? ObservedTx.fromJSON(object.observedTx)
        : undefined,
      signer: isSet(object.signer)
        ? bytesFromBase64(object.signer)
        : new Uint8Array(),
      action: isSet(object.action) ? String(object.action) : "",
    };
  },

  toJSON(message: MsgNoOp): unknown {
    const obj: any = {};
    message.observedTx !== undefined &&
      (obj.observedTx = message.observedTx
        ? ObservedTx.toJSON(message.observedTx)
        : undefined);
    message.signer !== undefined &&
      (obj.signer = base64FromBytes(
        message.signer !== undefined ? message.signer : new Uint8Array()
      ));
    message.action !== undefined && (obj.action = message.action);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgNoOp>, I>>(object: I): MsgNoOp {
    const message = createBaseMsgNoOp();
    message.observedTx =
      object.observedTx !== undefined && object.observedTx !== null
        ? ObservedTx.fromPartial(object.observedTx)
        : undefined;
    message.signer = object.signer ?? new Uint8Array();
    message.action = object.action ?? "";
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
