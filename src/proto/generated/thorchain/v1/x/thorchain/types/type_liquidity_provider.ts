/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Asset } from "../../../../../thorchain/v1/common/common";

export interface LiquidityProvider {
  asset?: Asset;
  runeAddress: string;
  assetAddress: string;
  lastAddHeight: Long;
  lastWithdrawHeight: Long;
  units: string;
  pendingRune: string;
  pendingAsset: string;
  pendingTxId: string;
  runeDepositValue: string;
  assetDepositValue: string;
}

function createBaseLiquidityProvider(): LiquidityProvider {
  return {
    asset: undefined,
    runeAddress: "",
    assetAddress: "",
    lastAddHeight: Long.ZERO,
    lastWithdrawHeight: Long.ZERO,
    units: "",
    pendingRune: "",
    pendingAsset: "",
    pendingTxId: "",
    runeDepositValue: "",
    assetDepositValue: "",
  };
}

export const LiquidityProvider = {
  encode(
    message: LiquidityProvider,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.asset !== undefined) {
      Asset.encode(message.asset, writer.uint32(10).fork()).ldelim();
    }
    if (message.runeAddress !== "") {
      writer.uint32(18).string(message.runeAddress);
    }
    if (message.assetAddress !== "") {
      writer.uint32(26).string(message.assetAddress);
    }
    if (!message.lastAddHeight.isZero()) {
      writer.uint32(32).int64(message.lastAddHeight);
    }
    if (!message.lastWithdrawHeight.isZero()) {
      writer.uint32(40).int64(message.lastWithdrawHeight);
    }
    if (message.units !== "") {
      writer.uint32(50).string(message.units);
    }
    if (message.pendingRune !== "") {
      writer.uint32(58).string(message.pendingRune);
    }
    if (message.pendingAsset !== "") {
      writer.uint32(66).string(message.pendingAsset);
    }
    if (message.pendingTxId !== "") {
      writer.uint32(74).string(message.pendingTxId);
    }
    if (message.runeDepositValue !== "") {
      writer.uint32(82).string(message.runeDepositValue);
    }
    if (message.assetDepositValue !== "") {
      writer.uint32(90).string(message.assetDepositValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LiquidityProvider {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidityProvider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.asset = Asset.decode(reader, reader.uint32());
          break;
        case 2:
          message.runeAddress = reader.string();
          break;
        case 3:
          message.assetAddress = reader.string();
          break;
        case 4:
          message.lastAddHeight = reader.int64() as Long;
          break;
        case 5:
          message.lastWithdrawHeight = reader.int64() as Long;
          break;
        case 6:
          message.units = reader.string();
          break;
        case 7:
          message.pendingRune = reader.string();
          break;
        case 8:
          message.pendingAsset = reader.string();
          break;
        case 9:
          message.pendingTxId = reader.string();
          break;
        case 10:
          message.runeDepositValue = reader.string();
          break;
        case 11:
          message.assetDepositValue = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LiquidityProvider {
    return {
      asset: isSet(object.asset) ? Asset.fromJSON(object.asset) : undefined,
      runeAddress: isSet(object.runeAddress) ? String(object.runeAddress) : "",
      assetAddress: isSet(object.assetAddress)
        ? String(object.assetAddress)
        : "",
      lastAddHeight: isSet(object.lastAddHeight)
        ? Long.fromString(object.lastAddHeight)
        : Long.ZERO,
      lastWithdrawHeight: isSet(object.lastWithdrawHeight)
        ? Long.fromString(object.lastWithdrawHeight)
        : Long.ZERO,
      units: isSet(object.units) ? String(object.units) : "",
      pendingRune: isSet(object.pendingRune) ? String(object.pendingRune) : "",
      pendingAsset: isSet(object.pendingAsset)
        ? String(object.pendingAsset)
        : "",
      pendingTxId: isSet(object.pendingTxId) ? String(object.pendingTxId) : "",
      runeDepositValue: isSet(object.runeDepositValue)
        ? String(object.runeDepositValue)
        : "",
      assetDepositValue: isSet(object.assetDepositValue)
        ? String(object.assetDepositValue)
        : "",
    };
  },

  toJSON(message: LiquidityProvider): unknown {
    const obj: any = {};
    message.asset !== undefined &&
      (obj.asset = message.asset ? Asset.toJSON(message.asset) : undefined);
    message.runeAddress !== undefined &&
      (obj.runeAddress = message.runeAddress);
    message.assetAddress !== undefined &&
      (obj.assetAddress = message.assetAddress);
    message.lastAddHeight !== undefined &&
      (obj.lastAddHeight = (message.lastAddHeight || Long.ZERO).toString());
    message.lastWithdrawHeight !== undefined &&
      (obj.lastWithdrawHeight = (
        message.lastWithdrawHeight || Long.ZERO
      ).toString());
    message.units !== undefined && (obj.units = message.units);
    message.pendingRune !== undefined &&
      (obj.pendingRune = message.pendingRune);
    message.pendingAsset !== undefined &&
      (obj.pendingAsset = message.pendingAsset);
    message.pendingTxId !== undefined &&
      (obj.pendingTxId = message.pendingTxId);
    message.runeDepositValue !== undefined &&
      (obj.runeDepositValue = message.runeDepositValue);
    message.assetDepositValue !== undefined &&
      (obj.assetDepositValue = message.assetDepositValue);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LiquidityProvider>, I>>(
    object: I
  ): LiquidityProvider {
    const message = createBaseLiquidityProvider();
    message.asset =
      object.asset !== undefined && object.asset !== null
        ? Asset.fromPartial(object.asset)
        : undefined;
    message.runeAddress = object.runeAddress ?? "";
    message.assetAddress = object.assetAddress ?? "";
    message.lastAddHeight =
      object.lastAddHeight !== undefined && object.lastAddHeight !== null
        ? Long.fromValue(object.lastAddHeight)
        : Long.ZERO;
    message.lastWithdrawHeight =
      object.lastWithdrawHeight !== undefined &&
      object.lastWithdrawHeight !== null
        ? Long.fromValue(object.lastWithdrawHeight)
        : Long.ZERO;
    message.units = object.units ?? "";
    message.pendingRune = object.pendingRune ?? "";
    message.pendingAsset = object.pendingAsset ?? "";
    message.pendingTxId = object.pendingTxId ?? "";
    message.runeDepositValue = object.runeDepositValue ?? "";
    message.assetDepositValue = object.assetDepositValue ?? "";
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
