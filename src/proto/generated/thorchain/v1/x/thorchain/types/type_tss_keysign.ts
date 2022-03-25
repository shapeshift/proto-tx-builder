/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface TssKeysignFailVoter {
  id: string;
  height: Long;
  signers: string[];
}

function createBaseTssKeysignFailVoter(): TssKeysignFailVoter {
  return { id: "", height: Long.ZERO, signers: [] };
}

export const TssKeysignFailVoter = {
  encode(
    message: TssKeysignFailVoter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (!message.height.isZero()) {
      writer.uint32(32).int64(message.height);
    }
    for (const v of message.signers) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TssKeysignFailVoter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTssKeysignFailVoter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 4:
          message.height = reader.int64() as Long;
          break;
        case 6:
          message.signers.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TssKeysignFailVoter {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      height: isSet(object.height) ? Long.fromString(object.height) : Long.ZERO,
      signers: Array.isArray(object?.signers)
        ? object.signers.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: TssKeysignFailVoter): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.height !== undefined &&
      (obj.height = (message.height || Long.ZERO).toString());
    if (message.signers) {
      obj.signers = message.signers.map((e) => e);
    } else {
      obj.signers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TssKeysignFailVoter>, I>>(
    object: I
  ): TssKeysignFailVoter {
    const message = createBaseTssKeysignFailVoter();
    message.id = object.id ?? "";
    message.height =
      object.height !== undefined && object.height !== null
        ? Long.fromValue(object.height)
        : Long.ZERO;
    message.signers = object.signers?.map((e) => e) || [];
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
