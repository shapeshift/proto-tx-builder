/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Tx } from "../../../../../thorchain/v1/common/common";
import { ReserveContributor } from "../../../../../thorchain/v1/x/thorchain/types/type_reserve_contributor";

export interface MsgReserveContributor {
  tx?: Tx;
  contributor?: ReserveContributor;
  signer: Uint8Array;
}

function createBaseMsgReserveContributor(): MsgReserveContributor {
  return { tx: undefined, contributor: undefined, signer: new Uint8Array() };
}

export const MsgReserveContributor = {
  encode(
    message: MsgReserveContributor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    if (message.contributor !== undefined) {
      ReserveContributor.encode(
        message.contributor,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.signer.length !== 0) {
      writer.uint32(26).bytes(message.signer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgReserveContributor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReserveContributor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = Tx.decode(reader, reader.uint32());
          break;
        case 2:
          message.contributor = ReserveContributor.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.signer = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgReserveContributor {
    return {
      tx: isSet(object.tx) ? Tx.fromJSON(object.tx) : undefined,
      contributor: isSet(object.contributor)
        ? ReserveContributor.fromJSON(object.contributor)
        : undefined,
      signer: isSet(object.signer)
        ? bytesFromBase64(object.signer)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgReserveContributor): unknown {
    const obj: any = {};
    message.tx !== undefined &&
      (obj.tx = message.tx ? Tx.toJSON(message.tx) : undefined);
    message.contributor !== undefined &&
      (obj.contributor = message.contributor
        ? ReserveContributor.toJSON(message.contributor)
        : undefined);
    message.signer !== undefined &&
      (obj.signer = base64FromBytes(
        message.signer !== undefined ? message.signer : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgReserveContributor>, I>>(
    object: I
  ): MsgReserveContributor {
    const message = createBaseMsgReserveContributor();
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? Tx.fromPartial(object.tx)
        : undefined;
    message.contributor =
      object.contributor !== undefined && object.contributor !== null
        ? ReserveContributor.fromPartial(object.contributor)
        : undefined;
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
