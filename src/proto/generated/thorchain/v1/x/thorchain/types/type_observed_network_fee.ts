/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface ObservedNetworkFeeVoter {
  blockHeight: Long;
  reportBlockHeight: Long;
  chain: string;
  signers: string[];
  feeRate: Long;
}

function createBaseObservedNetworkFeeVoter(): ObservedNetworkFeeVoter {
  return {
    blockHeight: Long.ZERO,
    reportBlockHeight: Long.ZERO,
    chain: "",
    signers: [],
    feeRate: Long.ZERO,
  };
}

export const ObservedNetworkFeeVoter = {
  encode(
    message: ObservedNetworkFeeVoter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.blockHeight.isZero()) {
      writer.uint32(8).int64(message.blockHeight);
    }
    if (!message.reportBlockHeight.isZero()) {
      writer.uint32(16).int64(message.reportBlockHeight);
    }
    if (message.chain !== "") {
      writer.uint32(26).string(message.chain);
    }
    for (const v of message.signers) {
      writer.uint32(34).string(v!);
    }
    if (!message.feeRate.isZero()) {
      writer.uint32(40).int64(message.feeRate);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ObservedNetworkFeeVoter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObservedNetworkFeeVoter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeight = reader.int64() as Long;
          break;
        case 2:
          message.reportBlockHeight = reader.int64() as Long;
          break;
        case 3:
          message.chain = reader.string();
          break;
        case 4:
          message.signers.push(reader.string());
          break;
        case 5:
          message.feeRate = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObservedNetworkFeeVoter {
    return {
      blockHeight: isSet(object.blockHeight)
        ? Long.fromString(object.blockHeight)
        : Long.ZERO,
      reportBlockHeight: isSet(object.reportBlockHeight)
        ? Long.fromString(object.reportBlockHeight)
        : Long.ZERO,
      chain: isSet(object.chain) ? String(object.chain) : "",
      signers: Array.isArray(object?.signers)
        ? object.signers.map((e: any) => String(e))
        : [],
      feeRate: isSet(object.feeRate)
        ? Long.fromString(object.feeRate)
        : Long.ZERO,
    };
  },

  toJSON(message: ObservedNetworkFeeVoter): unknown {
    const obj: any = {};
    message.blockHeight !== undefined &&
      (obj.blockHeight = (message.blockHeight || Long.ZERO).toString());
    message.reportBlockHeight !== undefined &&
      (obj.reportBlockHeight = (
        message.reportBlockHeight || Long.ZERO
      ).toString());
    message.chain !== undefined && (obj.chain = message.chain);
    if (message.signers) {
      obj.signers = message.signers.map((e) => e);
    } else {
      obj.signers = [];
    }
    message.feeRate !== undefined &&
      (obj.feeRate = (message.feeRate || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ObservedNetworkFeeVoter>, I>>(
    object: I
  ): ObservedNetworkFeeVoter {
    const message = createBaseObservedNetworkFeeVoter();
    message.blockHeight =
      object.blockHeight !== undefined && object.blockHeight !== null
        ? Long.fromValue(object.blockHeight)
        : Long.ZERO;
    message.reportBlockHeight =
      object.reportBlockHeight !== undefined &&
      object.reportBlockHeight !== null
        ? Long.fromValue(object.reportBlockHeight)
        : Long.ZERO;
    message.chain = object.chain ?? "";
    message.signers = object.signers?.map((e) => e) || [];
    message.feeRate =
      object.feeRate !== undefined && object.feeRate !== null
        ? Long.fromValue(object.feeRate)
        : Long.ZERO;
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
