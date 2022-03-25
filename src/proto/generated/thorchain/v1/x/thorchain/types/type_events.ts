/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  Asset,
  Tx,
  Coin,
  Fee,
} from "../../../../../thorchain/v1/common/common";
import {
  PoolStatus,
  poolStatusFromJSON,
  poolStatusToJSON,
} from "../../../../../thorchain/v1/x/thorchain/types/type_pool";
import { ReserveContributor } from "../../../../../thorchain/v1/x/thorchain/types/type_reserve_contributor";

export enum PendingLiquidityType {
  add = 0,
  withdraw = 1,
  UNRECOGNIZED = -1,
}

export function pendingLiquidityTypeFromJSON(
  object: any
): PendingLiquidityType {
  switch (object) {
    case 0:
    case "add":
      return PendingLiquidityType.add;
    case 1:
    case "withdraw":
      return PendingLiquidityType.withdraw;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PendingLiquidityType.UNRECOGNIZED;
  }
}

export function pendingLiquidityTypeToJSON(
  object: PendingLiquidityType
): string {
  switch (object) {
    case PendingLiquidityType.add:
      return "add";
    case PendingLiquidityType.withdraw:
      return "withdraw";
    default:
      return "UNKNOWN";
  }
}

export enum BondType {
  bond_paid = 0,
  bond_returned = 1,
  bond_reward = 2,
  bond_cost = 3,
  UNRECOGNIZED = -1,
}

export function bondTypeFromJSON(object: any): BondType {
  switch (object) {
    case 0:
    case "bond_paid":
      return BondType.bond_paid;
    case 1:
    case "bond_returned":
      return BondType.bond_returned;
    case 2:
    case "bond_reward":
      return BondType.bond_reward;
    case 3:
    case "bond_cost":
      return BondType.bond_cost;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BondType.UNRECOGNIZED;
  }
}

export function bondTypeToJSON(object: BondType): string {
  switch (object) {
    case BondType.bond_paid:
      return "bond_paid";
    case BondType.bond_returned:
      return "bond_returned";
    case BondType.bond_reward:
      return "bond_reward";
    case BondType.bond_cost:
      return "bond_cost";
    default:
      return "UNKNOWN";
  }
}

export interface PoolMod {
  asset?: Asset;
  runeAmt: string;
  runeAdd: boolean;
  assetAmt: string;
  assetAdd: boolean;
}

export interface EventSwap {
  pool?: Asset;
  swapTarget: string;
  swapSlip: string;
  liquidityFee: string;
  liquidityFeeInRune: string;
  inTx?: Tx;
  outTxs?: Tx;
  emitAsset?: Coin;
  synthUnits: string;
}

export interface EventAddLiquidity {
  pool?: Asset;
  providerUnits: string;
  runeAddress: string;
  runeAmount: string;
  assetAmount: string;
  runeTxId: string;
  assetTxId: string;
  assetAddress: string;
}

export interface EventWithdraw {
  pool?: Asset;
  providerUnits: string;
  basisPoints: Long;
  asymmetry: Uint8Array;
  inTx?: Tx;
  emitAsset: string;
  emitRune: string;
  impLossProtection: string;
}

export interface EventPendingLiquidity {
  pool?: Asset;
  pendingType: PendingLiquidityType;
  runeAddress: string;
  runeAmount: string;
  assetAddress: string;
  assetAmount: string;
  runeTxId: string;
  assetTxId: string;
}

export interface EventDonate {
  pool?: Asset;
  inTx?: Tx;
}

export interface EventPool {
  pool?: Asset;
  Status: PoolStatus;
}

export interface PoolAmt {
  asset?: Asset;
  amount: Long;
}

export interface EventRewards {
  bondReward: string;
  poolRewards: PoolAmt[];
}

export interface EventRefund {
  code: number;
  reason: string;
  inTx?: Tx;
  fee?: Fee;
}

export interface EventBond {
  amount: string;
  bondType: BondType;
  txIn?: Tx;
}

export interface GasPool {
  asset?: Asset;
  runeAmt: string;
  assetAmt: string;
  count: Long;
}

export interface EventGas {
  pools: GasPool[];
}

export interface EventReserve {
  reserveContributor?: ReserveContributor;
  inTx?: Tx;
}

export interface EventSlash {
  pool?: Asset;
  slashAmount: PoolAmt[];
}

export interface EventErrata {
  txId: string;
  pools: PoolMod[];
}

export interface EventFee {
  txId: string;
  fee?: Fee;
  synthUnits: string;
}

export interface EventOutbound {
  inTxId: string;
  tx?: Tx;
}

export interface EventTssKeygenMetric {
  pubKey: string;
  medianDurationMs: Long;
}

export interface EventTssKeysignMetric {
  txId: string;
  medianDurationMs: Long;
}

export interface EventSlashPoint {
  nodeAddress: Uint8Array;
  slashPoints: Long;
  reason: string;
}

export interface EventPoolBalanceChanged {
  poolChange?: PoolMod;
  reason: string;
}

export interface EventSwitch {
  toAddress: Uint8Array;
  fromAddress: string;
  burn?: Coin;
}

export interface EventSwitchV56 {
  toAddress: Uint8Array;
  fromAddress: string;
  burn?: Coin;
  txId: string;
}

export interface EventTHORName {
  name: string;
  chain: string;
  address: string;
  registrationFee: string;
  fundAmt: string;
  expire: Long;
  owner: Uint8Array;
}

function createBasePoolMod(): PoolMod {
  return {
    asset: undefined,
    runeAmt: "",
    runeAdd: false,
    assetAmt: "",
    assetAdd: false,
  };
}

export const PoolMod = {
  encode(
    message: PoolMod,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.asset !== undefined) {
      Asset.encode(message.asset, writer.uint32(10).fork()).ldelim();
    }
    if (message.runeAmt !== "") {
      writer.uint32(18).string(message.runeAmt);
    }
    if (message.runeAdd === true) {
      writer.uint32(24).bool(message.runeAdd);
    }
    if (message.assetAmt !== "") {
      writer.uint32(34).string(message.assetAmt);
    }
    if (message.assetAdd === true) {
      writer.uint32(40).bool(message.assetAdd);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolMod {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolMod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.asset = Asset.decode(reader, reader.uint32());
          break;
        case 2:
          message.runeAmt = reader.string();
          break;
        case 3:
          message.runeAdd = reader.bool();
          break;
        case 4:
          message.assetAmt = reader.string();
          break;
        case 5:
          message.assetAdd = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoolMod {
    return {
      asset: isSet(object.asset) ? Asset.fromJSON(object.asset) : undefined,
      runeAmt: isSet(object.runeAmt) ? String(object.runeAmt) : "",
      runeAdd: isSet(object.runeAdd) ? Boolean(object.runeAdd) : false,
      assetAmt: isSet(object.assetAmt) ? String(object.assetAmt) : "",
      assetAdd: isSet(object.assetAdd) ? Boolean(object.assetAdd) : false,
    };
  },

  toJSON(message: PoolMod): unknown {
    const obj: any = {};
    message.asset !== undefined &&
      (obj.asset = message.asset ? Asset.toJSON(message.asset) : undefined);
    message.runeAmt !== undefined && (obj.runeAmt = message.runeAmt);
    message.runeAdd !== undefined && (obj.runeAdd = message.runeAdd);
    message.assetAmt !== undefined && (obj.assetAmt = message.assetAmt);
    message.assetAdd !== undefined && (obj.assetAdd = message.assetAdd);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PoolMod>, I>>(object: I): PoolMod {
    const message = createBasePoolMod();
    message.asset =
      object.asset !== undefined && object.asset !== null
        ? Asset.fromPartial(object.asset)
        : undefined;
    message.runeAmt = object.runeAmt ?? "";
    message.runeAdd = object.runeAdd ?? false;
    message.assetAmt = object.assetAmt ?? "";
    message.assetAdd = object.assetAdd ?? false;
    return message;
  },
};

function createBaseEventSwap(): EventSwap {
  return {
    pool: undefined,
    swapTarget: "",
    swapSlip: "",
    liquidityFee: "",
    liquidityFeeInRune: "",
    inTx: undefined,
    outTxs: undefined,
    emitAsset: undefined,
    synthUnits: "",
  };
}

export const EventSwap = {
  encode(
    message: EventSwap,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool !== undefined) {
      Asset.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    if (message.swapTarget !== "") {
      writer.uint32(18).string(message.swapTarget);
    }
    if (message.swapSlip !== "") {
      writer.uint32(26).string(message.swapSlip);
    }
    if (message.liquidityFee !== "") {
      writer.uint32(34).string(message.liquidityFee);
    }
    if (message.liquidityFeeInRune !== "") {
      writer.uint32(42).string(message.liquidityFeeInRune);
    }
    if (message.inTx !== undefined) {
      Tx.encode(message.inTx, writer.uint32(50).fork()).ldelim();
    }
    if (message.outTxs !== undefined) {
      Tx.encode(message.outTxs, writer.uint32(58).fork()).ldelim();
    }
    if (message.emitAsset !== undefined) {
      Coin.encode(message.emitAsset, writer.uint32(66).fork()).ldelim();
    }
    if (message.synthUnits !== "") {
      writer.uint32(74).string(message.synthUnits);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSwap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSwap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = Asset.decode(reader, reader.uint32());
          break;
        case 2:
          message.swapTarget = reader.string();
          break;
        case 3:
          message.swapSlip = reader.string();
          break;
        case 4:
          message.liquidityFee = reader.string();
          break;
        case 5:
          message.liquidityFeeInRune = reader.string();
          break;
        case 6:
          message.inTx = Tx.decode(reader, reader.uint32());
          break;
        case 7:
          message.outTxs = Tx.decode(reader, reader.uint32());
          break;
        case 8:
          message.emitAsset = Coin.decode(reader, reader.uint32());
          break;
        case 9:
          message.synthUnits = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventSwap {
    return {
      pool: isSet(object.pool) ? Asset.fromJSON(object.pool) : undefined,
      swapTarget: isSet(object.swapTarget) ? String(object.swapTarget) : "",
      swapSlip: isSet(object.swapSlip) ? String(object.swapSlip) : "",
      liquidityFee: isSet(object.liquidityFee)
        ? String(object.liquidityFee)
        : "",
      liquidityFeeInRune: isSet(object.liquidityFeeInRune)
        ? String(object.liquidityFeeInRune)
        : "",
      inTx: isSet(object.inTx) ? Tx.fromJSON(object.inTx) : undefined,
      outTxs: isSet(object.outTxs) ? Tx.fromJSON(object.outTxs) : undefined,
      emitAsset: isSet(object.emitAsset)
        ? Coin.fromJSON(object.emitAsset)
        : undefined,
      synthUnits: isSet(object.synthUnits) ? String(object.synthUnits) : "",
    };
  },

  toJSON(message: EventSwap): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? Asset.toJSON(message.pool) : undefined);
    message.swapTarget !== undefined && (obj.swapTarget = message.swapTarget);
    message.swapSlip !== undefined && (obj.swapSlip = message.swapSlip);
    message.liquidityFee !== undefined &&
      (obj.liquidityFee = message.liquidityFee);
    message.liquidityFeeInRune !== undefined &&
      (obj.liquidityFeeInRune = message.liquidityFeeInRune);
    message.inTx !== undefined &&
      (obj.inTx = message.inTx ? Tx.toJSON(message.inTx) : undefined);
    message.outTxs !== undefined &&
      (obj.outTxs = message.outTxs ? Tx.toJSON(message.outTxs) : undefined);
    message.emitAsset !== undefined &&
      (obj.emitAsset = message.emitAsset
        ? Coin.toJSON(message.emitAsset)
        : undefined);
    message.synthUnits !== undefined && (obj.synthUnits = message.synthUnits);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventSwap>, I>>(
    object: I
  ): EventSwap {
    const message = createBaseEventSwap();
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Asset.fromPartial(object.pool)
        : undefined;
    message.swapTarget = object.swapTarget ?? "";
    message.swapSlip = object.swapSlip ?? "";
    message.liquidityFee = object.liquidityFee ?? "";
    message.liquidityFeeInRune = object.liquidityFeeInRune ?? "";
    message.inTx =
      object.inTx !== undefined && object.inTx !== null
        ? Tx.fromPartial(object.inTx)
        : undefined;
    message.outTxs =
      object.outTxs !== undefined && object.outTxs !== null
        ? Tx.fromPartial(object.outTxs)
        : undefined;
    message.emitAsset =
      object.emitAsset !== undefined && object.emitAsset !== null
        ? Coin.fromPartial(object.emitAsset)
        : undefined;
    message.synthUnits = object.synthUnits ?? "";
    return message;
  },
};

function createBaseEventAddLiquidity(): EventAddLiquidity {
  return {
    pool: undefined,
    providerUnits: "",
    runeAddress: "",
    runeAmount: "",
    assetAmount: "",
    runeTxId: "",
    assetTxId: "",
    assetAddress: "",
  };
}

export const EventAddLiquidity = {
  encode(
    message: EventAddLiquidity,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool !== undefined) {
      Asset.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    if (message.providerUnits !== "") {
      writer.uint32(18).string(message.providerUnits);
    }
    if (message.runeAddress !== "") {
      writer.uint32(26).string(message.runeAddress);
    }
    if (message.runeAmount !== "") {
      writer.uint32(34).string(message.runeAmount);
    }
    if (message.assetAmount !== "") {
      writer.uint32(42).string(message.assetAmount);
    }
    if (message.runeTxId !== "") {
      writer.uint32(50).string(message.runeTxId);
    }
    if (message.assetTxId !== "") {
      writer.uint32(58).string(message.assetTxId);
    }
    if (message.assetAddress !== "") {
      writer.uint32(66).string(message.assetAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventAddLiquidity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAddLiquidity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = Asset.decode(reader, reader.uint32());
          break;
        case 2:
          message.providerUnits = reader.string();
          break;
        case 3:
          message.runeAddress = reader.string();
          break;
        case 4:
          message.runeAmount = reader.string();
          break;
        case 5:
          message.assetAmount = reader.string();
          break;
        case 6:
          message.runeTxId = reader.string();
          break;
        case 7:
          message.assetTxId = reader.string();
          break;
        case 8:
          message.assetAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventAddLiquidity {
    return {
      pool: isSet(object.pool) ? Asset.fromJSON(object.pool) : undefined,
      providerUnits: isSet(object.providerUnits)
        ? String(object.providerUnits)
        : "",
      runeAddress: isSet(object.runeAddress) ? String(object.runeAddress) : "",
      runeAmount: isSet(object.runeAmount) ? String(object.runeAmount) : "",
      assetAmount: isSet(object.assetAmount) ? String(object.assetAmount) : "",
      runeTxId: isSet(object.runeTxId) ? String(object.runeTxId) : "",
      assetTxId: isSet(object.assetTxId) ? String(object.assetTxId) : "",
      assetAddress: isSet(object.assetAddress)
        ? String(object.assetAddress)
        : "",
    };
  },

  toJSON(message: EventAddLiquidity): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? Asset.toJSON(message.pool) : undefined);
    message.providerUnits !== undefined &&
      (obj.providerUnits = message.providerUnits);
    message.runeAddress !== undefined &&
      (obj.runeAddress = message.runeAddress);
    message.runeAmount !== undefined && (obj.runeAmount = message.runeAmount);
    message.assetAmount !== undefined &&
      (obj.assetAmount = message.assetAmount);
    message.runeTxId !== undefined && (obj.runeTxId = message.runeTxId);
    message.assetTxId !== undefined && (obj.assetTxId = message.assetTxId);
    message.assetAddress !== undefined &&
      (obj.assetAddress = message.assetAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventAddLiquidity>, I>>(
    object: I
  ): EventAddLiquidity {
    const message = createBaseEventAddLiquidity();
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Asset.fromPartial(object.pool)
        : undefined;
    message.providerUnits = object.providerUnits ?? "";
    message.runeAddress = object.runeAddress ?? "";
    message.runeAmount = object.runeAmount ?? "";
    message.assetAmount = object.assetAmount ?? "";
    message.runeTxId = object.runeTxId ?? "";
    message.assetTxId = object.assetTxId ?? "";
    message.assetAddress = object.assetAddress ?? "";
    return message;
  },
};

function createBaseEventWithdraw(): EventWithdraw {
  return {
    pool: undefined,
    providerUnits: "",
    basisPoints: Long.ZERO,
    asymmetry: new Uint8Array(),
    inTx: undefined,
    emitAsset: "",
    emitRune: "",
    impLossProtection: "",
  };
}

export const EventWithdraw = {
  encode(
    message: EventWithdraw,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool !== undefined) {
      Asset.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    if (message.providerUnits !== "") {
      writer.uint32(18).string(message.providerUnits);
    }
    if (!message.basisPoints.isZero()) {
      writer.uint32(24).int64(message.basisPoints);
    }
    if (message.asymmetry.length !== 0) {
      writer.uint32(34).bytes(message.asymmetry);
    }
    if (message.inTx !== undefined) {
      Tx.encode(message.inTx, writer.uint32(42).fork()).ldelim();
    }
    if (message.emitAsset !== "") {
      writer.uint32(50).string(message.emitAsset);
    }
    if (message.emitRune !== "") {
      writer.uint32(58).string(message.emitRune);
    }
    if (message.impLossProtection !== "") {
      writer.uint32(66).string(message.impLossProtection);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventWithdraw {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventWithdraw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = Asset.decode(reader, reader.uint32());
          break;
        case 2:
          message.providerUnits = reader.string();
          break;
        case 3:
          message.basisPoints = reader.int64() as Long;
          break;
        case 4:
          message.asymmetry = reader.bytes();
          break;
        case 5:
          message.inTx = Tx.decode(reader, reader.uint32());
          break;
        case 6:
          message.emitAsset = reader.string();
          break;
        case 7:
          message.emitRune = reader.string();
          break;
        case 8:
          message.impLossProtection = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventWithdraw {
    return {
      pool: isSet(object.pool) ? Asset.fromJSON(object.pool) : undefined,
      providerUnits: isSet(object.providerUnits)
        ? String(object.providerUnits)
        : "",
      basisPoints: isSet(object.basisPoints)
        ? Long.fromString(object.basisPoints)
        : Long.ZERO,
      asymmetry: isSet(object.asymmetry)
        ? bytesFromBase64(object.asymmetry)
        : new Uint8Array(),
      inTx: isSet(object.inTx) ? Tx.fromJSON(object.inTx) : undefined,
      emitAsset: isSet(object.emitAsset) ? String(object.emitAsset) : "",
      emitRune: isSet(object.emitRune) ? String(object.emitRune) : "",
      impLossProtection: isSet(object.impLossProtection)
        ? String(object.impLossProtection)
        : "",
    };
  },

  toJSON(message: EventWithdraw): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? Asset.toJSON(message.pool) : undefined);
    message.providerUnits !== undefined &&
      (obj.providerUnits = message.providerUnits);
    message.basisPoints !== undefined &&
      (obj.basisPoints = (message.basisPoints || Long.ZERO).toString());
    message.asymmetry !== undefined &&
      (obj.asymmetry = base64FromBytes(
        message.asymmetry !== undefined ? message.asymmetry : new Uint8Array()
      ));
    message.inTx !== undefined &&
      (obj.inTx = message.inTx ? Tx.toJSON(message.inTx) : undefined);
    message.emitAsset !== undefined && (obj.emitAsset = message.emitAsset);
    message.emitRune !== undefined && (obj.emitRune = message.emitRune);
    message.impLossProtection !== undefined &&
      (obj.impLossProtection = message.impLossProtection);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventWithdraw>, I>>(
    object: I
  ): EventWithdraw {
    const message = createBaseEventWithdraw();
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Asset.fromPartial(object.pool)
        : undefined;
    message.providerUnits = object.providerUnits ?? "";
    message.basisPoints =
      object.basisPoints !== undefined && object.basisPoints !== null
        ? Long.fromValue(object.basisPoints)
        : Long.ZERO;
    message.asymmetry = object.asymmetry ?? new Uint8Array();
    message.inTx =
      object.inTx !== undefined && object.inTx !== null
        ? Tx.fromPartial(object.inTx)
        : undefined;
    message.emitAsset = object.emitAsset ?? "";
    message.emitRune = object.emitRune ?? "";
    message.impLossProtection = object.impLossProtection ?? "";
    return message;
  },
};

function createBaseEventPendingLiquidity(): EventPendingLiquidity {
  return {
    pool: undefined,
    pendingType: 0,
    runeAddress: "",
    runeAmount: "",
    assetAddress: "",
    assetAmount: "",
    runeTxId: "",
    assetTxId: "",
  };
}

export const EventPendingLiquidity = {
  encode(
    message: EventPendingLiquidity,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool !== undefined) {
      Asset.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    if (message.pendingType !== 0) {
      writer.uint32(16).int32(message.pendingType);
    }
    if (message.runeAddress !== "") {
      writer.uint32(26).string(message.runeAddress);
    }
    if (message.runeAmount !== "") {
      writer.uint32(34).string(message.runeAmount);
    }
    if (message.assetAddress !== "") {
      writer.uint32(42).string(message.assetAddress);
    }
    if (message.assetAmount !== "") {
      writer.uint32(50).string(message.assetAmount);
    }
    if (message.runeTxId !== "") {
      writer.uint32(58).string(message.runeTxId);
    }
    if (message.assetTxId !== "") {
      writer.uint32(66).string(message.assetTxId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EventPendingLiquidity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventPendingLiquidity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = Asset.decode(reader, reader.uint32());
          break;
        case 2:
          message.pendingType = reader.int32() as any;
          break;
        case 3:
          message.runeAddress = reader.string();
          break;
        case 4:
          message.runeAmount = reader.string();
          break;
        case 5:
          message.assetAddress = reader.string();
          break;
        case 6:
          message.assetAmount = reader.string();
          break;
        case 7:
          message.runeTxId = reader.string();
          break;
        case 8:
          message.assetTxId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventPendingLiquidity {
    return {
      pool: isSet(object.pool) ? Asset.fromJSON(object.pool) : undefined,
      pendingType: isSet(object.pendingType)
        ? pendingLiquidityTypeFromJSON(object.pendingType)
        : 0,
      runeAddress: isSet(object.runeAddress) ? String(object.runeAddress) : "",
      runeAmount: isSet(object.runeAmount) ? String(object.runeAmount) : "",
      assetAddress: isSet(object.assetAddress)
        ? String(object.assetAddress)
        : "",
      assetAmount: isSet(object.assetAmount) ? String(object.assetAmount) : "",
      runeTxId: isSet(object.runeTxId) ? String(object.runeTxId) : "",
      assetTxId: isSet(object.assetTxId) ? String(object.assetTxId) : "",
    };
  },

  toJSON(message: EventPendingLiquidity): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? Asset.toJSON(message.pool) : undefined);
    message.pendingType !== undefined &&
      (obj.pendingType = pendingLiquidityTypeToJSON(message.pendingType));
    message.runeAddress !== undefined &&
      (obj.runeAddress = message.runeAddress);
    message.runeAmount !== undefined && (obj.runeAmount = message.runeAmount);
    message.assetAddress !== undefined &&
      (obj.assetAddress = message.assetAddress);
    message.assetAmount !== undefined &&
      (obj.assetAmount = message.assetAmount);
    message.runeTxId !== undefined && (obj.runeTxId = message.runeTxId);
    message.assetTxId !== undefined && (obj.assetTxId = message.assetTxId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventPendingLiquidity>, I>>(
    object: I
  ): EventPendingLiquidity {
    const message = createBaseEventPendingLiquidity();
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Asset.fromPartial(object.pool)
        : undefined;
    message.pendingType = object.pendingType ?? 0;
    message.runeAddress = object.runeAddress ?? "";
    message.runeAmount = object.runeAmount ?? "";
    message.assetAddress = object.assetAddress ?? "";
    message.assetAmount = object.assetAmount ?? "";
    message.runeTxId = object.runeTxId ?? "";
    message.assetTxId = object.assetTxId ?? "";
    return message;
  },
};

function createBaseEventDonate(): EventDonate {
  return { pool: undefined, inTx: undefined };
}

export const EventDonate = {
  encode(
    message: EventDonate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool !== undefined) {
      Asset.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    if (message.inTx !== undefined) {
      Tx.encode(message.inTx, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventDonate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDonate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = Asset.decode(reader, reader.uint32());
          break;
        case 2:
          message.inTx = Tx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventDonate {
    return {
      pool: isSet(object.pool) ? Asset.fromJSON(object.pool) : undefined,
      inTx: isSet(object.inTx) ? Tx.fromJSON(object.inTx) : undefined,
    };
  },

  toJSON(message: EventDonate): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? Asset.toJSON(message.pool) : undefined);
    message.inTx !== undefined &&
      (obj.inTx = message.inTx ? Tx.toJSON(message.inTx) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventDonate>, I>>(
    object: I
  ): EventDonate {
    const message = createBaseEventDonate();
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Asset.fromPartial(object.pool)
        : undefined;
    message.inTx =
      object.inTx !== undefined && object.inTx !== null
        ? Tx.fromPartial(object.inTx)
        : undefined;
    return message;
  },
};

function createBaseEventPool(): EventPool {
  return { pool: undefined, Status: 0 };
}

export const EventPool = {
  encode(
    message: EventPool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool !== undefined) {
      Asset.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    if (message.Status !== 0) {
      writer.uint32(16).int32(message.Status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = Asset.decode(reader, reader.uint32());
          break;
        case 2:
          message.Status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventPool {
    return {
      pool: isSet(object.pool) ? Asset.fromJSON(object.pool) : undefined,
      Status: isSet(object.Status) ? poolStatusFromJSON(object.Status) : 0,
    };
  },

  toJSON(message: EventPool): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? Asset.toJSON(message.pool) : undefined);
    message.Status !== undefined &&
      (obj.Status = poolStatusToJSON(message.Status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventPool>, I>>(
    object: I
  ): EventPool {
    const message = createBaseEventPool();
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Asset.fromPartial(object.pool)
        : undefined;
    message.Status = object.Status ?? 0;
    return message;
  },
};

function createBasePoolAmt(): PoolAmt {
  return { asset: undefined, amount: Long.ZERO };
}

export const PoolAmt = {
  encode(
    message: PoolAmt,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.asset !== undefined) {
      Asset.encode(message.asset, writer.uint32(10).fork()).ldelim();
    }
    if (!message.amount.isZero()) {
      writer.uint32(16).int64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolAmt {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolAmt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.asset = Asset.decode(reader, reader.uint32());
          break;
        case 2:
          message.amount = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoolAmt {
    return {
      asset: isSet(object.asset) ? Asset.fromJSON(object.asset) : undefined,
      amount: isSet(object.amount) ? Long.fromString(object.amount) : Long.ZERO,
    };
  },

  toJSON(message: PoolAmt): unknown {
    const obj: any = {};
    message.asset !== undefined &&
      (obj.asset = message.asset ? Asset.toJSON(message.asset) : undefined);
    message.amount !== undefined &&
      (obj.amount = (message.amount || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PoolAmt>, I>>(object: I): PoolAmt {
    const message = createBasePoolAmt();
    message.asset =
      object.asset !== undefined && object.asset !== null
        ? Asset.fromPartial(object.asset)
        : undefined;
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Long.fromValue(object.amount)
        : Long.ZERO;
    return message;
  },
};

function createBaseEventRewards(): EventRewards {
  return { bondReward: "", poolRewards: [] };
}

export const EventRewards = {
  encode(
    message: EventRewards,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bondReward !== "") {
      writer.uint32(10).string(message.bondReward);
    }
    for (const v of message.poolRewards) {
      PoolAmt.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventRewards {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRewards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bondReward = reader.string();
          break;
        case 2:
          message.poolRewards.push(PoolAmt.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventRewards {
    return {
      bondReward: isSet(object.bondReward) ? String(object.bondReward) : "",
      poolRewards: Array.isArray(object?.poolRewards)
        ? object.poolRewards.map((e: any) => PoolAmt.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EventRewards): unknown {
    const obj: any = {};
    message.bondReward !== undefined && (obj.bondReward = message.bondReward);
    if (message.poolRewards) {
      obj.poolRewards = message.poolRewards.map((e) =>
        e ? PoolAmt.toJSON(e) : undefined
      );
    } else {
      obj.poolRewards = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventRewards>, I>>(
    object: I
  ): EventRewards {
    const message = createBaseEventRewards();
    message.bondReward = object.bondReward ?? "";
    message.poolRewards =
      object.poolRewards?.map((e) => PoolAmt.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEventRefund(): EventRefund {
  return { code: 0, reason: "", inTx: undefined, fee: undefined };
}

export const EventRefund = {
  encode(
    message: EventRefund,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.reason !== "") {
      writer.uint32(18).string(message.reason);
    }
    if (message.inTx !== undefined) {
      Tx.encode(message.inTx, writer.uint32(26).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Fee.encode(message.fee, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventRefund {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRefund();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.uint32();
          break;
        case 2:
          message.reason = reader.string();
          break;
        case 3:
          message.inTx = Tx.decode(reader, reader.uint32());
          break;
        case 4:
          message.fee = Fee.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventRefund {
    return {
      code: isSet(object.code) ? Number(object.code) : 0,
      reason: isSet(object.reason) ? String(object.reason) : "",
      inTx: isSet(object.inTx) ? Tx.fromJSON(object.inTx) : undefined,
      fee: isSet(object.fee) ? Fee.fromJSON(object.fee) : undefined,
    };
  },

  toJSON(message: EventRefund): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.reason !== undefined && (obj.reason = message.reason);
    message.inTx !== undefined &&
      (obj.inTx = message.inTx ? Tx.toJSON(message.inTx) : undefined);
    message.fee !== undefined &&
      (obj.fee = message.fee ? Fee.toJSON(message.fee) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventRefund>, I>>(
    object: I
  ): EventRefund {
    const message = createBaseEventRefund();
    message.code = object.code ?? 0;
    message.reason = object.reason ?? "";
    message.inTx =
      object.inTx !== undefined && object.inTx !== null
        ? Tx.fromPartial(object.inTx)
        : undefined;
    message.fee =
      object.fee !== undefined && object.fee !== null
        ? Fee.fromPartial(object.fee)
        : undefined;
    return message;
  },
};

function createBaseEventBond(): EventBond {
  return { amount: "", bondType: 0, txIn: undefined };
}

export const EventBond = {
  encode(
    message: EventBond,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.amount !== "") {
      writer.uint32(10).string(message.amount);
    }
    if (message.bondType !== 0) {
      writer.uint32(16).int32(message.bondType);
    }
    if (message.txIn !== undefined) {
      Tx.encode(message.txIn, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventBond {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.string();
          break;
        case 2:
          message.bondType = reader.int32() as any;
          break;
        case 3:
          message.txIn = Tx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventBond {
    return {
      amount: isSet(object.amount) ? String(object.amount) : "",
      bondType: isSet(object.bondType) ? bondTypeFromJSON(object.bondType) : 0,
      txIn: isSet(object.txIn) ? Tx.fromJSON(object.txIn) : undefined,
    };
  },

  toJSON(message: EventBond): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = message.amount);
    message.bondType !== undefined &&
      (obj.bondType = bondTypeToJSON(message.bondType));
    message.txIn !== undefined &&
      (obj.txIn = message.txIn ? Tx.toJSON(message.txIn) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventBond>, I>>(
    object: I
  ): EventBond {
    const message = createBaseEventBond();
    message.amount = object.amount ?? "";
    message.bondType = object.bondType ?? 0;
    message.txIn =
      object.txIn !== undefined && object.txIn !== null
        ? Tx.fromPartial(object.txIn)
        : undefined;
    return message;
  },
};

function createBaseGasPool(): GasPool {
  return { asset: undefined, runeAmt: "", assetAmt: "", count: Long.ZERO };
}

export const GasPool = {
  encode(
    message: GasPool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.asset !== undefined) {
      Asset.encode(message.asset, writer.uint32(10).fork()).ldelim();
    }
    if (message.runeAmt !== "") {
      writer.uint32(18).string(message.runeAmt);
    }
    if (message.assetAmt !== "") {
      writer.uint32(26).string(message.assetAmt);
    }
    if (!message.count.isZero()) {
      writer.uint32(32).int64(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GasPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGasPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.asset = Asset.decode(reader, reader.uint32());
          break;
        case 2:
          message.runeAmt = reader.string();
          break;
        case 3:
          message.assetAmt = reader.string();
          break;
        case 4:
          message.count = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GasPool {
    return {
      asset: isSet(object.asset) ? Asset.fromJSON(object.asset) : undefined,
      runeAmt: isSet(object.runeAmt) ? String(object.runeAmt) : "",
      assetAmt: isSet(object.assetAmt) ? String(object.assetAmt) : "",
      count: isSet(object.count) ? Long.fromString(object.count) : Long.ZERO,
    };
  },

  toJSON(message: GasPool): unknown {
    const obj: any = {};
    message.asset !== undefined &&
      (obj.asset = message.asset ? Asset.toJSON(message.asset) : undefined);
    message.runeAmt !== undefined && (obj.runeAmt = message.runeAmt);
    message.assetAmt !== undefined && (obj.assetAmt = message.assetAmt);
    message.count !== undefined &&
      (obj.count = (message.count || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GasPool>, I>>(object: I): GasPool {
    const message = createBaseGasPool();
    message.asset =
      object.asset !== undefined && object.asset !== null
        ? Asset.fromPartial(object.asset)
        : undefined;
    message.runeAmt = object.runeAmt ?? "";
    message.assetAmt = object.assetAmt ?? "";
    message.count =
      object.count !== undefined && object.count !== null
        ? Long.fromValue(object.count)
        : Long.ZERO;
    return message;
  },
};

function createBaseEventGas(): EventGas {
  return { pools: [] };
}

export const EventGas = {
  encode(
    message: EventGas,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.pools) {
      GasPool.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventGas {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventGas();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pools.push(GasPool.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventGas {
    return {
      pools: Array.isArray(object?.pools)
        ? object.pools.map((e: any) => GasPool.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EventGas): unknown {
    const obj: any = {};
    if (message.pools) {
      obj.pools = message.pools.map((e) => (e ? GasPool.toJSON(e) : undefined));
    } else {
      obj.pools = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventGas>, I>>(object: I): EventGas {
    const message = createBaseEventGas();
    message.pools = object.pools?.map((e) => GasPool.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEventReserve(): EventReserve {
  return { reserveContributor: undefined, inTx: undefined };
}

export const EventReserve = {
  encode(
    message: EventReserve,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.reserveContributor !== undefined) {
      ReserveContributor.encode(
        message.reserveContributor,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.inTx !== undefined) {
      Tx.encode(message.inTx, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventReserve {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventReserve();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserveContributor = ReserveContributor.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.inTx = Tx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventReserve {
    return {
      reserveContributor: isSet(object.reserveContributor)
        ? ReserveContributor.fromJSON(object.reserveContributor)
        : undefined,
      inTx: isSet(object.inTx) ? Tx.fromJSON(object.inTx) : undefined,
    };
  },

  toJSON(message: EventReserve): unknown {
    const obj: any = {};
    message.reserveContributor !== undefined &&
      (obj.reserveContributor = message.reserveContributor
        ? ReserveContributor.toJSON(message.reserveContributor)
        : undefined);
    message.inTx !== undefined &&
      (obj.inTx = message.inTx ? Tx.toJSON(message.inTx) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventReserve>, I>>(
    object: I
  ): EventReserve {
    const message = createBaseEventReserve();
    message.reserveContributor =
      object.reserveContributor !== undefined &&
      object.reserveContributor !== null
        ? ReserveContributor.fromPartial(object.reserveContributor)
        : undefined;
    message.inTx =
      object.inTx !== undefined && object.inTx !== null
        ? Tx.fromPartial(object.inTx)
        : undefined;
    return message;
  },
};

function createBaseEventSlash(): EventSlash {
  return { pool: undefined, slashAmount: [] };
}

export const EventSlash = {
  encode(
    message: EventSlash,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool !== undefined) {
      Asset.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.slashAmount) {
      PoolAmt.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSlash {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSlash();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = Asset.decode(reader, reader.uint32());
          break;
        case 2:
          message.slashAmount.push(PoolAmt.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventSlash {
    return {
      pool: isSet(object.pool) ? Asset.fromJSON(object.pool) : undefined,
      slashAmount: Array.isArray(object?.slashAmount)
        ? object.slashAmount.map((e: any) => PoolAmt.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EventSlash): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? Asset.toJSON(message.pool) : undefined);
    if (message.slashAmount) {
      obj.slashAmount = message.slashAmount.map((e) =>
        e ? PoolAmt.toJSON(e) : undefined
      );
    } else {
      obj.slashAmount = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventSlash>, I>>(
    object: I
  ): EventSlash {
    const message = createBaseEventSlash();
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Asset.fromPartial(object.pool)
        : undefined;
    message.slashAmount =
      object.slashAmount?.map((e) => PoolAmt.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEventErrata(): EventErrata {
  return { txId: "", pools: [] };
}

export const EventErrata = {
  encode(
    message: EventErrata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.txId !== "") {
      writer.uint32(10).string(message.txId);
    }
    for (const v of message.pools) {
      PoolMod.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventErrata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventErrata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txId = reader.string();
          break;
        case 2:
          message.pools.push(PoolMod.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventErrata {
    return {
      txId: isSet(object.txId) ? String(object.txId) : "",
      pools: Array.isArray(object?.pools)
        ? object.pools.map((e: any) => PoolMod.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EventErrata): unknown {
    const obj: any = {};
    message.txId !== undefined && (obj.txId = message.txId);
    if (message.pools) {
      obj.pools = message.pools.map((e) => (e ? PoolMod.toJSON(e) : undefined));
    } else {
      obj.pools = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventErrata>, I>>(
    object: I
  ): EventErrata {
    const message = createBaseEventErrata();
    message.txId = object.txId ?? "";
    message.pools = object.pools?.map((e) => PoolMod.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEventFee(): EventFee {
  return { txId: "", fee: undefined, synthUnits: "" };
}

export const EventFee = {
  encode(
    message: EventFee,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.txId !== "") {
      writer.uint32(10).string(message.txId);
    }
    if (message.fee !== undefined) {
      Fee.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    if (message.synthUnits !== "") {
      writer.uint32(26).string(message.synthUnits);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventFee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txId = reader.string();
          break;
        case 2:
          message.fee = Fee.decode(reader, reader.uint32());
          break;
        case 3:
          message.synthUnits = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventFee {
    return {
      txId: isSet(object.txId) ? String(object.txId) : "",
      fee: isSet(object.fee) ? Fee.fromJSON(object.fee) : undefined,
      synthUnits: isSet(object.synthUnits) ? String(object.synthUnits) : "",
    };
  },

  toJSON(message: EventFee): unknown {
    const obj: any = {};
    message.txId !== undefined && (obj.txId = message.txId);
    message.fee !== undefined &&
      (obj.fee = message.fee ? Fee.toJSON(message.fee) : undefined);
    message.synthUnits !== undefined && (obj.synthUnits = message.synthUnits);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventFee>, I>>(object: I): EventFee {
    const message = createBaseEventFee();
    message.txId = object.txId ?? "";
    message.fee =
      object.fee !== undefined && object.fee !== null
        ? Fee.fromPartial(object.fee)
        : undefined;
    message.synthUnits = object.synthUnits ?? "";
    return message;
  },
};

function createBaseEventOutbound(): EventOutbound {
  return { inTxId: "", tx: undefined };
}

export const EventOutbound = {
  encode(
    message: EventOutbound,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.inTxId !== "") {
      writer.uint32(10).string(message.inTxId);
    }
    if (message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventOutbound {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventOutbound();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inTxId = reader.string();
          break;
        case 2:
          message.tx = Tx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventOutbound {
    return {
      inTxId: isSet(object.inTxId) ? String(object.inTxId) : "",
      tx: isSet(object.tx) ? Tx.fromJSON(object.tx) : undefined,
    };
  },

  toJSON(message: EventOutbound): unknown {
    const obj: any = {};
    message.inTxId !== undefined && (obj.inTxId = message.inTxId);
    message.tx !== undefined &&
      (obj.tx = message.tx ? Tx.toJSON(message.tx) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventOutbound>, I>>(
    object: I
  ): EventOutbound {
    const message = createBaseEventOutbound();
    message.inTxId = object.inTxId ?? "";
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? Tx.fromPartial(object.tx)
        : undefined;
    return message;
  },
};

function createBaseEventTssKeygenMetric(): EventTssKeygenMetric {
  return { pubKey: "", medianDurationMs: Long.ZERO };
}

export const EventTssKeygenMetric = {
  encode(
    message: EventTssKeygenMetric,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pubKey !== "") {
      writer.uint32(10).string(message.pubKey);
    }
    if (!message.medianDurationMs.isZero()) {
      writer.uint32(16).int64(message.medianDurationMs);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EventTssKeygenMetric {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventTssKeygenMetric();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pubKey = reader.string();
          break;
        case 2:
          message.medianDurationMs = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventTssKeygenMetric {
    return {
      pubKey: isSet(object.pubKey) ? String(object.pubKey) : "",
      medianDurationMs: isSet(object.medianDurationMs)
        ? Long.fromString(object.medianDurationMs)
        : Long.ZERO,
    };
  },

  toJSON(message: EventTssKeygenMetric): unknown {
    const obj: any = {};
    message.pubKey !== undefined && (obj.pubKey = message.pubKey);
    message.medianDurationMs !== undefined &&
      (obj.medianDurationMs = (
        message.medianDurationMs || Long.ZERO
      ).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventTssKeygenMetric>, I>>(
    object: I
  ): EventTssKeygenMetric {
    const message = createBaseEventTssKeygenMetric();
    message.pubKey = object.pubKey ?? "";
    message.medianDurationMs =
      object.medianDurationMs !== undefined && object.medianDurationMs !== null
        ? Long.fromValue(object.medianDurationMs)
        : Long.ZERO;
    return message;
  },
};

function createBaseEventTssKeysignMetric(): EventTssKeysignMetric {
  return { txId: "", medianDurationMs: Long.ZERO };
}

export const EventTssKeysignMetric = {
  encode(
    message: EventTssKeysignMetric,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.txId !== "") {
      writer.uint32(10).string(message.txId);
    }
    if (!message.medianDurationMs.isZero()) {
      writer.uint32(16).int64(message.medianDurationMs);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EventTssKeysignMetric {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventTssKeysignMetric();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txId = reader.string();
          break;
        case 2:
          message.medianDurationMs = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventTssKeysignMetric {
    return {
      txId: isSet(object.txId) ? String(object.txId) : "",
      medianDurationMs: isSet(object.medianDurationMs)
        ? Long.fromString(object.medianDurationMs)
        : Long.ZERO,
    };
  },

  toJSON(message: EventTssKeysignMetric): unknown {
    const obj: any = {};
    message.txId !== undefined && (obj.txId = message.txId);
    message.medianDurationMs !== undefined &&
      (obj.medianDurationMs = (
        message.medianDurationMs || Long.ZERO
      ).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventTssKeysignMetric>, I>>(
    object: I
  ): EventTssKeysignMetric {
    const message = createBaseEventTssKeysignMetric();
    message.txId = object.txId ?? "";
    message.medianDurationMs =
      object.medianDurationMs !== undefined && object.medianDurationMs !== null
        ? Long.fromValue(object.medianDurationMs)
        : Long.ZERO;
    return message;
  },
};

function createBaseEventSlashPoint(): EventSlashPoint {
  return { nodeAddress: new Uint8Array(), slashPoints: Long.ZERO, reason: "" };
}

export const EventSlashPoint = {
  encode(
    message: EventSlashPoint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nodeAddress.length !== 0) {
      writer.uint32(10).bytes(message.nodeAddress);
    }
    if (!message.slashPoints.isZero()) {
      writer.uint32(16).int64(message.slashPoints);
    }
    if (message.reason !== "") {
      writer.uint32(26).string(message.reason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSlashPoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSlashPoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodeAddress = reader.bytes();
          break;
        case 2:
          message.slashPoints = reader.int64() as Long;
          break;
        case 3:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventSlashPoint {
    return {
      nodeAddress: isSet(object.nodeAddress)
        ? bytesFromBase64(object.nodeAddress)
        : new Uint8Array(),
      slashPoints: isSet(object.slashPoints)
        ? Long.fromString(object.slashPoints)
        : Long.ZERO,
      reason: isSet(object.reason) ? String(object.reason) : "",
    };
  },

  toJSON(message: EventSlashPoint): unknown {
    const obj: any = {};
    message.nodeAddress !== undefined &&
      (obj.nodeAddress = base64FromBytes(
        message.nodeAddress !== undefined
          ? message.nodeAddress
          : new Uint8Array()
      ));
    message.slashPoints !== undefined &&
      (obj.slashPoints = (message.slashPoints || Long.ZERO).toString());
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventSlashPoint>, I>>(
    object: I
  ): EventSlashPoint {
    const message = createBaseEventSlashPoint();
    message.nodeAddress = object.nodeAddress ?? new Uint8Array();
    message.slashPoints =
      object.slashPoints !== undefined && object.slashPoints !== null
        ? Long.fromValue(object.slashPoints)
        : Long.ZERO;
    message.reason = object.reason ?? "";
    return message;
  },
};

function createBaseEventPoolBalanceChanged(): EventPoolBalanceChanged {
  return { poolChange: undefined, reason: "" };
}

export const EventPoolBalanceChanged = {
  encode(
    message: EventPoolBalanceChanged,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.poolChange !== undefined) {
      PoolMod.encode(message.poolChange, writer.uint32(10).fork()).ldelim();
    }
    if (message.reason !== "") {
      writer.uint32(18).string(message.reason);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EventPoolBalanceChanged {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventPoolBalanceChanged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolChange = PoolMod.decode(reader, reader.uint32());
          break;
        case 2:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventPoolBalanceChanged {
    return {
      poolChange: isSet(object.poolChange)
        ? PoolMod.fromJSON(object.poolChange)
        : undefined,
      reason: isSet(object.reason) ? String(object.reason) : "",
    };
  },

  toJSON(message: EventPoolBalanceChanged): unknown {
    const obj: any = {};
    message.poolChange !== undefined &&
      (obj.poolChange = message.poolChange
        ? PoolMod.toJSON(message.poolChange)
        : undefined);
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventPoolBalanceChanged>, I>>(
    object: I
  ): EventPoolBalanceChanged {
    const message = createBaseEventPoolBalanceChanged();
    message.poolChange =
      object.poolChange !== undefined && object.poolChange !== null
        ? PoolMod.fromPartial(object.poolChange)
        : undefined;
    message.reason = object.reason ?? "";
    return message;
  },
};

function createBaseEventSwitch(): EventSwitch {
  return { toAddress: new Uint8Array(), fromAddress: "", burn: undefined };
}

export const EventSwitch = {
  encode(
    message: EventSwitch,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.toAddress.length !== 0) {
      writer.uint32(10).bytes(message.toAddress);
    }
    if (message.fromAddress !== "") {
      writer.uint32(18).string(message.fromAddress);
    }
    if (message.burn !== undefined) {
      Coin.encode(message.burn, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSwitch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSwitch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.toAddress = reader.bytes();
          break;
        case 2:
          message.fromAddress = reader.string();
          break;
        case 3:
          message.burn = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventSwitch {
    return {
      toAddress: isSet(object.toAddress)
        ? bytesFromBase64(object.toAddress)
        : new Uint8Array(),
      fromAddress: isSet(object.fromAddress) ? String(object.fromAddress) : "",
      burn: isSet(object.burn) ? Coin.fromJSON(object.burn) : undefined,
    };
  },

  toJSON(message: EventSwitch): unknown {
    const obj: any = {};
    message.toAddress !== undefined &&
      (obj.toAddress = base64FromBytes(
        message.toAddress !== undefined ? message.toAddress : new Uint8Array()
      ));
    message.fromAddress !== undefined &&
      (obj.fromAddress = message.fromAddress);
    message.burn !== undefined &&
      (obj.burn = message.burn ? Coin.toJSON(message.burn) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventSwitch>, I>>(
    object: I
  ): EventSwitch {
    const message = createBaseEventSwitch();
    message.toAddress = object.toAddress ?? new Uint8Array();
    message.fromAddress = object.fromAddress ?? "";
    message.burn =
      object.burn !== undefined && object.burn !== null
        ? Coin.fromPartial(object.burn)
        : undefined;
    return message;
  },
};

function createBaseEventSwitchV56(): EventSwitchV56 {
  return {
    toAddress: new Uint8Array(),
    fromAddress: "",
    burn: undefined,
    txId: "",
  };
}

export const EventSwitchV56 = {
  encode(
    message: EventSwitchV56,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.toAddress.length !== 0) {
      writer.uint32(10).bytes(message.toAddress);
    }
    if (message.fromAddress !== "") {
      writer.uint32(18).string(message.fromAddress);
    }
    if (message.burn !== undefined) {
      Coin.encode(message.burn, writer.uint32(26).fork()).ldelim();
    }
    if (message.txId !== "") {
      writer.uint32(34).string(message.txId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSwitchV56 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSwitchV56();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.toAddress = reader.bytes();
          break;
        case 2:
          message.fromAddress = reader.string();
          break;
        case 3:
          message.burn = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.txId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventSwitchV56 {
    return {
      toAddress: isSet(object.toAddress)
        ? bytesFromBase64(object.toAddress)
        : new Uint8Array(),
      fromAddress: isSet(object.fromAddress) ? String(object.fromAddress) : "",
      burn: isSet(object.burn) ? Coin.fromJSON(object.burn) : undefined,
      txId: isSet(object.txId) ? String(object.txId) : "",
    };
  },

  toJSON(message: EventSwitchV56): unknown {
    const obj: any = {};
    message.toAddress !== undefined &&
      (obj.toAddress = base64FromBytes(
        message.toAddress !== undefined ? message.toAddress : new Uint8Array()
      ));
    message.fromAddress !== undefined &&
      (obj.fromAddress = message.fromAddress);
    message.burn !== undefined &&
      (obj.burn = message.burn ? Coin.toJSON(message.burn) : undefined);
    message.txId !== undefined && (obj.txId = message.txId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventSwitchV56>, I>>(
    object: I
  ): EventSwitchV56 {
    const message = createBaseEventSwitchV56();
    message.toAddress = object.toAddress ?? new Uint8Array();
    message.fromAddress = object.fromAddress ?? "";
    message.burn =
      object.burn !== undefined && object.burn !== null
        ? Coin.fromPartial(object.burn)
        : undefined;
    message.txId = object.txId ?? "";
    return message;
  },
};

function createBaseEventTHORName(): EventTHORName {
  return {
    name: "",
    chain: "",
    address: "",
    registrationFee: "",
    fundAmt: "",
    expire: Long.ZERO,
    owner: new Uint8Array(),
  };
}

export const EventTHORName = {
  encode(
    message: EventTHORName,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.chain !== "") {
      writer.uint32(18).string(message.chain);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.registrationFee !== "") {
      writer.uint32(34).string(message.registrationFee);
    }
    if (message.fundAmt !== "") {
      writer.uint32(42).string(message.fundAmt);
    }
    if (!message.expire.isZero()) {
      writer.uint32(48).int64(message.expire);
    }
    if (message.owner.length !== 0) {
      writer.uint32(58).bytes(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventTHORName {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventTHORName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.chain = reader.string();
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.registrationFee = reader.string();
          break;
        case 5:
          message.fundAmt = reader.string();
          break;
        case 6:
          message.expire = reader.int64() as Long;
          break;
        case 7:
          message.owner = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventTHORName {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      chain: isSet(object.chain) ? String(object.chain) : "",
      address: isSet(object.address) ? String(object.address) : "",
      registrationFee: isSet(object.registrationFee)
        ? String(object.registrationFee)
        : "",
      fundAmt: isSet(object.fundAmt) ? String(object.fundAmt) : "",
      expire: isSet(object.expire) ? Long.fromString(object.expire) : Long.ZERO,
      owner: isSet(object.owner)
        ? bytesFromBase64(object.owner)
        : new Uint8Array(),
    };
  },

  toJSON(message: EventTHORName): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.chain !== undefined && (obj.chain = message.chain);
    message.address !== undefined && (obj.address = message.address);
    message.registrationFee !== undefined &&
      (obj.registrationFee = message.registrationFee);
    message.fundAmt !== undefined && (obj.fundAmt = message.fundAmt);
    message.expire !== undefined &&
      (obj.expire = (message.expire || Long.ZERO).toString());
    message.owner !== undefined &&
      (obj.owner = base64FromBytes(
        message.owner !== undefined ? message.owner : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventTHORName>, I>>(
    object: I
  ): EventTHORName {
    const message = createBaseEventTHORName();
    message.name = object.name ?? "";
    message.chain = object.chain ?? "";
    message.address = object.address ?? "";
    message.registrationFee = object.registrationFee ?? "";
    message.fundAmt = object.fundAmt ?? "";
    message.expire =
      object.expire !== undefined && object.expire !== null
        ? Long.fromValue(object.expire)
        : Long.ZERO;
    message.owner = object.owner ?? new Uint8Array();
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
