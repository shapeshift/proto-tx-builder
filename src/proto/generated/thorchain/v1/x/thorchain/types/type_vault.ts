/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../../thorchain/v1/common/common";
import { ChainContract } from "../../../../../thorchain/v1/x/thorchain/types/type_chain_contract";

export enum VaultType {
  UnknownVault = 0,
  AsgardVault = 1,
  YggdrasilVault = 2,
  UNRECOGNIZED = -1,
}

export function vaultTypeFromJSON(object: any): VaultType {
  switch (object) {
    case 0:
    case "UnknownVault":
      return VaultType.UnknownVault;
    case 1:
    case "AsgardVault":
      return VaultType.AsgardVault;
    case 2:
    case "YggdrasilVault":
      return VaultType.YggdrasilVault;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VaultType.UNRECOGNIZED;
  }
}

export function vaultTypeToJSON(object: VaultType): string {
  switch (object) {
    case VaultType.UnknownVault:
      return "UnknownVault";
    case VaultType.AsgardVault:
      return "AsgardVault";
    case VaultType.YggdrasilVault:
      return "YggdrasilVault";
    default:
      return "UNKNOWN";
  }
}

export enum VaultStatus {
  InactiveVault = 0,
  ActiveVault = 1,
  RetiringVault = 2,
  InitVault = 3,
  UNRECOGNIZED = -1,
}

export function vaultStatusFromJSON(object: any): VaultStatus {
  switch (object) {
    case 0:
    case "InactiveVault":
      return VaultStatus.InactiveVault;
    case 1:
    case "ActiveVault":
      return VaultStatus.ActiveVault;
    case 2:
    case "RetiringVault":
      return VaultStatus.RetiringVault;
    case 3:
    case "InitVault":
      return VaultStatus.InitVault;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VaultStatus.UNRECOGNIZED;
  }
}

export function vaultStatusToJSON(object: VaultStatus): string {
  switch (object) {
    case VaultStatus.InactiveVault:
      return "InactiveVault";
    case VaultStatus.ActiveVault:
      return "ActiveVault";
    case VaultStatus.RetiringVault:
      return "RetiringVault";
    case VaultStatus.InitVault:
      return "InitVault";
    default:
      return "UNKNOWN";
  }
}

export interface Vault {
  blockHeight: Long;
  pubKey: string;
  coins: Coin[];
  type: VaultType;
  status: VaultStatus;
  statusSince: Long;
  membership: string[];
  chains: string[];
  inboundTxCount: Long;
  outboundTxCount: Long;
  pendingTxBlockHeights: Long[];
  routers: ChainContract[];
}

function createBaseVault(): Vault {
  return {
    blockHeight: Long.ZERO,
    pubKey: "",
    coins: [],
    type: 0,
    status: 0,
    statusSince: Long.ZERO,
    membership: [],
    chains: [],
    inboundTxCount: Long.ZERO,
    outboundTxCount: Long.ZERO,
    pendingTxBlockHeights: [],
    routers: [],
  };
}

export const Vault = {
  encode(message: Vault, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.blockHeight.isZero()) {
      writer.uint32(8).int64(message.blockHeight);
    }
    if (message.pubKey !== "") {
      writer.uint32(18).string(message.pubKey);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    if (!message.statusSince.isZero()) {
      writer.uint32(48).int64(message.statusSince);
    }
    for (const v of message.membership) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.chains) {
      writer.uint32(66).string(v!);
    }
    if (!message.inboundTxCount.isZero()) {
      writer.uint32(72).int64(message.inboundTxCount);
    }
    if (!message.outboundTxCount.isZero()) {
      writer.uint32(80).int64(message.outboundTxCount);
    }
    writer.uint32(90).fork();
    for (const v of message.pendingTxBlockHeights) {
      writer.int64(v);
    }
    writer.ldelim();
    for (const v of message.routers) {
      ChainContract.encode(v!, writer.uint32(178).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vault {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVault();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeight = reader.int64() as Long;
          break;
        case 2:
          message.pubKey = reader.string();
          break;
        case 3:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        case 4:
          message.type = reader.int32() as any;
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        case 6:
          message.statusSince = reader.int64() as Long;
          break;
        case 7:
          message.membership.push(reader.string());
          break;
        case 8:
          message.chains.push(reader.string());
          break;
        case 9:
          message.inboundTxCount = reader.int64() as Long;
          break;
        case 10:
          message.outboundTxCount = reader.int64() as Long;
          break;
        case 11:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.pendingTxBlockHeights.push(reader.int64() as Long);
            }
          } else {
            message.pendingTxBlockHeights.push(reader.int64() as Long);
          }
          break;
        case 22:
          message.routers.push(ChainContract.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vault {
    return {
      blockHeight: isSet(object.blockHeight)
        ? Long.fromString(object.blockHeight)
        : Long.ZERO,
      pubKey: isSet(object.pubKey) ? String(object.pubKey) : "",
      coins: Array.isArray(object?.coins)
        ? object.coins.map((e: any) => Coin.fromJSON(e))
        : [],
      type: isSet(object.type) ? vaultTypeFromJSON(object.type) : 0,
      status: isSet(object.status) ? vaultStatusFromJSON(object.status) : 0,
      statusSince: isSet(object.statusSince)
        ? Long.fromString(object.statusSince)
        : Long.ZERO,
      membership: Array.isArray(object?.membership)
        ? object.membership.map((e: any) => String(e))
        : [],
      chains: Array.isArray(object?.chains)
        ? object.chains.map((e: any) => String(e))
        : [],
      inboundTxCount: isSet(object.inboundTxCount)
        ? Long.fromString(object.inboundTxCount)
        : Long.ZERO,
      outboundTxCount: isSet(object.outboundTxCount)
        ? Long.fromString(object.outboundTxCount)
        : Long.ZERO,
      pendingTxBlockHeights: Array.isArray(object?.pendingTxBlockHeights)
        ? object.pendingTxBlockHeights.map((e: any) => Long.fromString(e))
        : [],
      routers: Array.isArray(object?.routers)
        ? object.routers.map((e: any) => ChainContract.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Vault): unknown {
    const obj: any = {};
    message.blockHeight !== undefined &&
      (obj.blockHeight = (message.blockHeight || Long.ZERO).toString());
    message.pubKey !== undefined && (obj.pubKey = message.pubKey);
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.coins = [];
    }
    message.type !== undefined && (obj.type = vaultTypeToJSON(message.type));
    message.status !== undefined &&
      (obj.status = vaultStatusToJSON(message.status));
    message.statusSince !== undefined &&
      (obj.statusSince = (message.statusSince || Long.ZERO).toString());
    if (message.membership) {
      obj.membership = message.membership.map((e) => e);
    } else {
      obj.membership = [];
    }
    if (message.chains) {
      obj.chains = message.chains.map((e) => e);
    } else {
      obj.chains = [];
    }
    message.inboundTxCount !== undefined &&
      (obj.inboundTxCount = (message.inboundTxCount || Long.ZERO).toString());
    message.outboundTxCount !== undefined &&
      (obj.outboundTxCount = (message.outboundTxCount || Long.ZERO).toString());
    if (message.pendingTxBlockHeights) {
      obj.pendingTxBlockHeights = message.pendingTxBlockHeights.map((e) =>
        (e || Long.ZERO).toString()
      );
    } else {
      obj.pendingTxBlockHeights = [];
    }
    if (message.routers) {
      obj.routers = message.routers.map((e) =>
        e ? ChainContract.toJSON(e) : undefined
      );
    } else {
      obj.routers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Vault>, I>>(object: I): Vault {
    const message = createBaseVault();
    message.blockHeight =
      object.blockHeight !== undefined && object.blockHeight !== null
        ? Long.fromValue(object.blockHeight)
        : Long.ZERO;
    message.pubKey = object.pubKey ?? "";
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.type = object.type ?? 0;
    message.status = object.status ?? 0;
    message.statusSince =
      object.statusSince !== undefined && object.statusSince !== null
        ? Long.fromValue(object.statusSince)
        : Long.ZERO;
    message.membership = object.membership?.map((e) => e) || [];
    message.chains = object.chains?.map((e) => e) || [];
    message.inboundTxCount =
      object.inboundTxCount !== undefined && object.inboundTxCount !== null
        ? Long.fromValue(object.inboundTxCount)
        : Long.ZERO;
    message.outboundTxCount =
      object.outboundTxCount !== undefined && object.outboundTxCount !== null
        ? Long.fromValue(object.outboundTxCount)
        : Long.ZERO;
    message.pendingTxBlockHeights =
      object.pendingTxBlockHeights?.map((e) => Long.fromValue(e)) || [];
    message.routers =
      object.routers?.map((e) => ChainContract.fromPartial(e)) || [];
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
