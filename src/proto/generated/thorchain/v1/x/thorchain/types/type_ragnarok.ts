/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Asset } from "../../../../../thorchain/v1/common/common";

export interface RagnarokWithdrawPosition {
  number: Long;
  pool?: Asset;
}

function createBaseRagnarokWithdrawPosition(): RagnarokWithdrawPosition {
  return { number: Long.ZERO, pool: undefined };
}

export const RagnarokWithdrawPosition = {
  encode(
    message: RagnarokWithdrawPosition,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.number.isZero()) {
      writer.uint32(8).int64(message.number);
    }
    if (message.pool !== undefined) {
      Asset.encode(message.pool, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RagnarokWithdrawPosition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRagnarokWithdrawPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.number = reader.int64() as Long;
          break;
        case 2:
          message.pool = Asset.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RagnarokWithdrawPosition {
    return {
      number: isSet(object.number) ? Long.fromString(object.number) : Long.ZERO,
      pool: isSet(object.pool) ? Asset.fromJSON(object.pool) : undefined,
    };
  },

  toJSON(message: RagnarokWithdrawPosition): unknown {
    const obj: any = {};
    message.number !== undefined &&
      (obj.number = (message.number || Long.ZERO).toString());
    message.pool !== undefined &&
      (obj.pool = message.pool ? Asset.toJSON(message.pool) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RagnarokWithdrawPosition>, I>>(
    object: I
  ): RagnarokWithdrawPosition {
    const message = createBaseRagnarokWithdrawPosition();
    message.number =
      object.number !== undefined && object.number !== null
        ? Long.fromValue(object.number)
        : Long.ZERO;
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Asset.fromPartial(object.pool)
        : undefined;
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
