/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface Asset {
  chain: string;
  symbol: string;
  ticker: string;
  synth: boolean;
  trade: boolean;
  secured: boolean;
}

export interface Coin {
  asset?: Asset;
  amount: string;
  decimals: Long;
}

function createBaseAsset(): Asset {
  return { chain: "", symbol: "", ticker: "", synth: false, trade: false, secured: false };
}

export const Asset = {
  encode(message: Asset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chain !== "") {
      writer.uint32(10).string(message.chain);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (message.ticker !== "") {
      writer.uint32(26).string(message.ticker);
    }
    if (message.synth === true) {
      writer.uint32(32).bool(message.synth);
    }
    if (message.trade === true) {
      writer.uint32(40).bool(message.trade);
    }
    if (message.secured === true) {
      writer.uint32(48).bool(message.secured);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Asset {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chain = reader.string();
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.ticker = reader.string();
          break;
        case 4:
          message.synth = reader.bool();
          break;
        case 5:
          message.trade = reader.bool();
          break;
        case 6:
          message.secured = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Asset {
    return {
      chain: isSet(object.chain) ? String(object.chain) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      ticker: isSet(object.ticker) ? String(object.ticker) : "",
      synth: isSet(object.synth) ? Boolean(object.synth) : false,
      trade: isSet(object.trade) ? Boolean(object.trade) : false,
      secured: isSet(object.secured) ? Boolean(object.secured) : false,
    };
  },

  toJSON(message: Asset): unknown {
    const obj: any = {};
    message.chain !== undefined && (obj.chain = message.chain);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.ticker !== undefined && (obj.ticker = message.ticker);
    message.synth !== undefined && (obj.synth = message.synth);
    message.trade !== undefined && (obj.trade = message.trade);
    message.secured !== undefined && (obj.secured = message.secured);
    return obj;
  },

  create<I extends Exact<DeepPartial<Asset>, I>>(base?: I): Asset {
    return Asset.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Asset>, I>>(object: I): Asset {
    const message = createBaseAsset();
    message.chain = object.chain ?? "";
    message.symbol = object.symbol ?? "";
    message.ticker = object.ticker ?? "";
    message.synth = object.synth ?? false;
    message.trade = object.trade ?? false;
    message.secured = object.secured ?? false;
    return message;
  },
};

function createBaseCoin(): Coin {
  return { asset: undefined, amount: "", decimals: Long.ZERO };
}

export const Coin = {
  encode(message: Coin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.asset !== undefined) {
      Asset.encode(message.asset, writer.uint32(10).fork()).ldelim();
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (!message.decimals.isZero()) {
      writer.uint32(24).int64(message.decimals);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Coin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.asset = Asset.decode(reader, reader.uint32());
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.decimals = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Coin {
    return {
      asset: isSet(object.asset) ? Asset.fromJSON(object.asset) : undefined,
      amount: isSet(object.amount) ? String(object.amount) : "",
      decimals: isSet(object.decimals) ? Long.fromValue(object.decimals) : Long.ZERO,
    };
  },

  toJSON(message: Coin): unknown {
    const obj: any = {};
    message.asset !== undefined && (obj.asset = message.asset ? Asset.toJSON(message.asset) : undefined);
    message.amount !== undefined && (obj.amount = message.amount);
    message.decimals !== undefined && (obj.decimals = (message.decimals || Long.ZERO).toString());
    return obj;
  },

  create<I extends Exact<DeepPartial<Coin>, I>>(base?: I): Coin {
    return Coin.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Coin>, I>>(object: I): Coin {
    const message = createBaseCoin();
    message.asset = (object.asset !== undefined && object.asset !== null) ? Asset.fromPartial(object.asset) : undefined;
    message.amount = object.amount ?? "";
    message.decimals = (object.decimals !== undefined && object.decimals !== null)
      ? Long.fromValue(object.decimals)
      : Long.ZERO;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
