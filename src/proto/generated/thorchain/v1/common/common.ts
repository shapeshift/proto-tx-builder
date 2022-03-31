/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface Asset {
  chain: string;
  symbol: string;
  ticker: string;
  synth: boolean;
}

export interface Coin {
  asset?: Asset;
  amount: string;
  decimals: Long;
}

/** PubKeySet contains two pub keys , secp256k1 and ed25519 */
export interface PubKeySet {
  secp256k1: string;
  ed25519: string;
}

export interface Tx {
  id: string;
  chain: string;
  fromAddress: string;
  toAddress: string;
  coins: Coin[];
  gas: Coin[];
  memo: string;
}

export interface Fee {
  coins: Coin[];
  poolDeduct: string;
}

function createBaseAsset(): Asset {
  return { chain: "", symbol: "", ticker: "", synth: false };
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
    };
  },

  toJSON(message: Asset): unknown {
    const obj: any = {};
    message.chain !== undefined && (obj.chain = message.chain);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.ticker !== undefined && (obj.ticker = message.ticker);
    message.synth !== undefined && (obj.synth = message.synth);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Asset>, I>>(object: I): Asset {
    const message = createBaseAsset();
    message.chain = object.chain ?? "";
    message.symbol = object.symbol ?? "";
    message.ticker = object.ticker ?? "";
    message.synth = object.synth ?? false;
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
      decimals: isSet(object.decimals)
        ? Long.fromString(object.decimals)
        : Long.ZERO,
    };
  },

  toJSON(message: Coin): unknown {
    const obj: any = {};
    message.asset !== undefined &&
      (obj.asset = message.asset ? Asset.toJSON(message.asset) : undefined);
    message.amount !== undefined && (obj.amount = message.amount);
    message.decimals !== undefined &&
      (obj.decimals = (message.decimals || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Coin>, I>>(object: I): Coin {
    const message = createBaseCoin();
    message.asset =
      object.asset !== undefined && object.asset !== null
        ? Asset.fromPartial(object.asset)
        : undefined;
    message.amount = object.amount ?? "";
    message.decimals =
      object.decimals !== undefined && object.decimals !== null
        ? Long.fromValue(object.decimals)
        : Long.ZERO;
    return message;
  },
};

function createBasePubKeySet(): PubKeySet {
  return { secp256k1: "", ed25519: "" };
}

export const PubKeySet = {
  encode(
    message: PubKeySet,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.secp256k1 !== "") {
      writer.uint32(10).string(message.secp256k1);
    }
    if (message.ed25519 !== "") {
      writer.uint32(18).string(message.ed25519);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PubKeySet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePubKeySet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.secp256k1 = reader.string();
          break;
        case 2:
          message.ed25519 = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PubKeySet {
    return {
      secp256k1: isSet(object.secp256k1) ? String(object.secp256k1) : "",
      ed25519: isSet(object.ed25519) ? String(object.ed25519) : "",
    };
  },

  toJSON(message: PubKeySet): unknown {
    const obj: any = {};
    message.secp256k1 !== undefined && (obj.secp256k1 = message.secp256k1);
    message.ed25519 !== undefined && (obj.ed25519 = message.ed25519);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PubKeySet>, I>>(
    object: I
  ): PubKeySet {
    const message = createBasePubKeySet();
    message.secp256k1 = object.secp256k1 ?? "";
    message.ed25519 = object.ed25519 ?? "";
    return message;
  },
};

function createBaseTx(): Tx {
  return {
    id: "",
    chain: "",
    fromAddress: "",
    toAddress: "",
    coins: [],
    gas: [],
    memo: "",
  };
}

export const Tx = {
  encode(message: Tx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.chain !== "") {
      writer.uint32(18).string(message.chain);
    }
    if (message.fromAddress !== "") {
      writer.uint32(26).string(message.fromAddress);
    }
    if (message.toAddress !== "") {
      writer.uint32(34).string(message.toAddress);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.gas) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.memo !== "") {
      writer.uint32(58).string(message.memo);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.chain = reader.string();
          break;
        case 3:
          message.fromAddress = reader.string();
          break;
        case 4:
          message.toAddress = reader.string();
          break;
        case 5:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        case 6:
          message.gas.push(Coin.decode(reader, reader.uint32()));
          break;
        case 7:
          message.memo = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Tx {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      chain: isSet(object.chain) ? String(object.chain) : "",
      fromAddress: isSet(object.fromAddress) ? String(object.fromAddress) : "",
      toAddress: isSet(object.toAddress) ? String(object.toAddress) : "",
      coins: Array.isArray(object?.coins)
        ? object.coins.map((e: any) => Coin.fromJSON(e))
        : [],
      gas: Array.isArray(object?.gas)
        ? object.gas.map((e: any) => Coin.fromJSON(e))
        : [],
      memo: isSet(object.memo) ? String(object.memo) : "",
    };
  },

  toJSON(message: Tx): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.chain !== undefined && (obj.chain = message.chain);
    message.fromAddress !== undefined &&
      (obj.fromAddress = message.fromAddress);
    message.toAddress !== undefined && (obj.toAddress = message.toAddress);
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.coins = [];
    }
    if (message.gas) {
      obj.gas = message.gas.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.gas = [];
    }
    message.memo !== undefined && (obj.memo = message.memo);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tx>, I>>(object: I): Tx {
    const message = createBaseTx();
    message.id = object.id ?? "";
    message.chain = object.chain ?? "";
    message.fromAddress = object.fromAddress ?? "";
    message.toAddress = object.toAddress ?? "";
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.gas = object.gas?.map((e) => Coin.fromPartial(e)) || [];
    message.memo = object.memo ?? "";
    return message;
  },
};

function createBaseFee(): Fee {
  return { coins: [], poolDeduct: "" };
}

export const Fee = {
  encode(message: Fee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.poolDeduct !== "") {
      writer.uint32(18).string(message.poolDeduct);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.poolDeduct = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Fee {
    return {
      coins: Array.isArray(object?.coins)
        ? object.coins.map((e: any) => Coin.fromJSON(e))
        : [],
      poolDeduct: isSet(object.poolDeduct) ? String(object.poolDeduct) : "",
    };
  },

  toJSON(message: Fee): unknown {
    const obj: any = {};
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.coins = [];
    }
    message.poolDeduct !== undefined && (obj.poolDeduct = message.poolDeduct);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Fee>, I>>(object: I): Fee {
    const message = createBaseFee();
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.poolDeduct = object.poolDeduct ?? "";
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
