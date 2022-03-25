/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface ChainContract {
  chain: string;
  router: string;
}

function createBaseChainContract(): ChainContract {
  return { chain: "", router: "" };
}

export const ChainContract = {
  encode(
    message: ChainContract,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.chain !== "") {
      writer.uint32(10).string(message.chain);
    }
    if (message.router !== "") {
      writer.uint32(18).string(message.router);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChainContract {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChainContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chain = reader.string();
          break;
        case 2:
          message.router = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChainContract {
    return {
      chain: isSet(object.chain) ? String(object.chain) : "",
      router: isSet(object.router) ? String(object.router) : "",
    };
  },

  toJSON(message: ChainContract): unknown {
    const obj: any = {};
    message.chain !== undefined && (obj.chain = message.chain);
    message.router !== undefined && (obj.router = message.router);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChainContract>, I>>(
    object: I
  ): ChainContract {
    const message = createBaseChainContract();
    message.chain = object.chain ?? "";
    message.router = object.router ?? "";
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
