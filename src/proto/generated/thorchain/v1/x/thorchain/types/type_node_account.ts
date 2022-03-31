/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PubKeySet } from "../../../../../thorchain/v1/common/common";

export enum NodeStatus {
  Unknown = 0,
  Whitelisted = 1,
  Standby = 2,
  Ready = 3,
  Active = 4,
  Disabled = 5,
  UNRECOGNIZED = -1,
}

export function nodeStatusFromJSON(object: any): NodeStatus {
  switch (object) {
    case 0:
    case "Unknown":
      return NodeStatus.Unknown;
    case 1:
    case "Whitelisted":
      return NodeStatus.Whitelisted;
    case 2:
    case "Standby":
      return NodeStatus.Standby;
    case 3:
    case "Ready":
      return NodeStatus.Ready;
    case 4:
    case "Active":
      return NodeStatus.Active;
    case 5:
    case "Disabled":
      return NodeStatus.Disabled;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NodeStatus.UNRECOGNIZED;
  }
}

export function nodeStatusToJSON(object: NodeStatus): string {
  switch (object) {
    case NodeStatus.Unknown:
      return "Unknown";
    case NodeStatus.Whitelisted:
      return "Whitelisted";
    case NodeStatus.Standby:
      return "Standby";
    case NodeStatus.Ready:
      return "Ready";
    case NodeStatus.Active:
      return "Active";
    case NodeStatus.Disabled:
      return "Disabled";
    default:
      return "UNKNOWN";
  }
}

export enum NodeType {
  TypeValidator = 0,
  TypeVault = 1,
  TypeUnknown = 2,
  UNRECOGNIZED = -1,
}

export function nodeTypeFromJSON(object: any): NodeType {
  switch (object) {
    case 0:
    case "TypeValidator":
      return NodeType.TypeValidator;
    case 1:
    case "TypeVault":
      return NodeType.TypeVault;
    case 2:
    case "TypeUnknown":
      return NodeType.TypeUnknown;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NodeType.UNRECOGNIZED;
  }
}

export function nodeTypeToJSON(object: NodeType): string {
  switch (object) {
    case NodeType.TypeValidator:
      return "TypeValidator";
    case NodeType.TypeVault:
      return "TypeVault";
    case NodeType.TypeUnknown:
      return "TypeUnknown";
    default:
      return "UNKNOWN";
  }
}

export interface NodeAccount {
  nodeAddress: Uint8Array;
  status: NodeStatus;
  pubKeySet?: PubKeySet;
  validatorConsPubKey: string;
  bond: string;
  activeBlockHeight: Long;
  bondAddress: string;
  statusSince: Long;
  signerMembership: string[];
  requestedToLeave: boolean;
  forcedToLeave: boolean;
  leaveScore: Long;
  ipAddress: string;
  version: string;
  type: NodeType;
}

export interface BondProvider {
  bondAddress: Uint8Array;
  bond: string;
}

export interface BondProviders {
  nodeAddress: Uint8Array;
  nodeOperatorFee: string;
  providers: BondProvider[];
}

function createBaseNodeAccount(): NodeAccount {
  return {
    nodeAddress: new Uint8Array(),
    status: 0,
    pubKeySet: undefined,
    validatorConsPubKey: "",
    bond: "",
    activeBlockHeight: Long.ZERO,
    bondAddress: "",
    statusSince: Long.ZERO,
    signerMembership: [],
    requestedToLeave: false,
    forcedToLeave: false,
    leaveScore: Long.UZERO,
    ipAddress: "",
    version: "",
    type: 0,
  };
}

export const NodeAccount = {
  encode(
    message: NodeAccount,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nodeAddress.length !== 0) {
      writer.uint32(10).bytes(message.nodeAddress);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.pubKeySet !== undefined) {
      PubKeySet.encode(message.pubKeySet, writer.uint32(26).fork()).ldelim();
    }
    if (message.validatorConsPubKey !== "") {
      writer.uint32(34).string(message.validatorConsPubKey);
    }
    if (message.bond !== "") {
      writer.uint32(42).string(message.bond);
    }
    if (!message.activeBlockHeight.isZero()) {
      writer.uint32(48).int64(message.activeBlockHeight);
    }
    if (message.bondAddress !== "") {
      writer.uint32(58).string(message.bondAddress);
    }
    if (!message.statusSince.isZero()) {
      writer.uint32(64).int64(message.statusSince);
    }
    for (const v of message.signerMembership) {
      writer.uint32(74).string(v!);
    }
    if (message.requestedToLeave === true) {
      writer.uint32(80).bool(message.requestedToLeave);
    }
    if (message.forcedToLeave === true) {
      writer.uint32(88).bool(message.forcedToLeave);
    }
    if (!message.leaveScore.isZero()) {
      writer.uint32(96).uint64(message.leaveScore);
    }
    if (message.ipAddress !== "") {
      writer.uint32(106).string(message.ipAddress);
    }
    if (message.version !== "") {
      writer.uint32(114).string(message.version);
    }
    if (message.type !== 0) {
      writer.uint32(120).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodeAddress = reader.bytes();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.pubKeySet = PubKeySet.decode(reader, reader.uint32());
          break;
        case 4:
          message.validatorConsPubKey = reader.string();
          break;
        case 5:
          message.bond = reader.string();
          break;
        case 6:
          message.activeBlockHeight = reader.int64() as Long;
          break;
        case 7:
          message.bondAddress = reader.string();
          break;
        case 8:
          message.statusSince = reader.int64() as Long;
          break;
        case 9:
          message.signerMembership.push(reader.string());
          break;
        case 10:
          message.requestedToLeave = reader.bool();
          break;
        case 11:
          message.forcedToLeave = reader.bool();
          break;
        case 12:
          message.leaveScore = reader.uint64() as Long;
          break;
        case 13:
          message.ipAddress = reader.string();
          break;
        case 14:
          message.version = reader.string();
          break;
        case 15:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NodeAccount {
    return {
      nodeAddress: isSet(object.nodeAddress)
        ? bytesFromBase64(object.nodeAddress)
        : new Uint8Array(),
      status: isSet(object.status) ? nodeStatusFromJSON(object.status) : 0,
      pubKeySet: isSet(object.pubKeySet)
        ? PubKeySet.fromJSON(object.pubKeySet)
        : undefined,
      validatorConsPubKey: isSet(object.validatorConsPubKey)
        ? String(object.validatorConsPubKey)
        : "",
      bond: isSet(object.bond) ? String(object.bond) : "",
      activeBlockHeight: isSet(object.activeBlockHeight)
        ? Long.fromString(object.activeBlockHeight)
        : Long.ZERO,
      bondAddress: isSet(object.bondAddress) ? String(object.bondAddress) : "",
      statusSince: isSet(object.statusSince)
        ? Long.fromString(object.statusSince)
        : Long.ZERO,
      signerMembership: Array.isArray(object?.signerMembership)
        ? object.signerMembership.map((e: any) => String(e))
        : [],
      requestedToLeave: isSet(object.requestedToLeave)
        ? Boolean(object.requestedToLeave)
        : false,
      forcedToLeave: isSet(object.forcedToLeave)
        ? Boolean(object.forcedToLeave)
        : false,
      leaveScore: isSet(object.leaveScore)
        ? Long.fromString(object.leaveScore)
        : Long.UZERO,
      ipAddress: isSet(object.ipAddress) ? String(object.ipAddress) : "",
      version: isSet(object.version) ? String(object.version) : "",
      type: isSet(object.type) ? nodeTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: NodeAccount): unknown {
    const obj: any = {};
    message.nodeAddress !== undefined &&
      (obj.nodeAddress = base64FromBytes(
        message.nodeAddress !== undefined
          ? message.nodeAddress
          : new Uint8Array()
      ));
    message.status !== undefined &&
      (obj.status = nodeStatusToJSON(message.status));
    message.pubKeySet !== undefined &&
      (obj.pubKeySet = message.pubKeySet
        ? PubKeySet.toJSON(message.pubKeySet)
        : undefined);
    message.validatorConsPubKey !== undefined &&
      (obj.validatorConsPubKey = message.validatorConsPubKey);
    message.bond !== undefined && (obj.bond = message.bond);
    message.activeBlockHeight !== undefined &&
      (obj.activeBlockHeight = (
        message.activeBlockHeight || Long.ZERO
      ).toString());
    message.bondAddress !== undefined &&
      (obj.bondAddress = message.bondAddress);
    message.statusSince !== undefined &&
      (obj.statusSince = (message.statusSince || Long.ZERO).toString());
    if (message.signerMembership) {
      obj.signerMembership = message.signerMembership.map((e) => e);
    } else {
      obj.signerMembership = [];
    }
    message.requestedToLeave !== undefined &&
      (obj.requestedToLeave = message.requestedToLeave);
    message.forcedToLeave !== undefined &&
      (obj.forcedToLeave = message.forcedToLeave);
    message.leaveScore !== undefined &&
      (obj.leaveScore = (message.leaveScore || Long.UZERO).toString());
    message.ipAddress !== undefined && (obj.ipAddress = message.ipAddress);
    message.version !== undefined && (obj.version = message.version);
    message.type !== undefined && (obj.type = nodeTypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NodeAccount>, I>>(
    object: I
  ): NodeAccount {
    const message = createBaseNodeAccount();
    message.nodeAddress = object.nodeAddress ?? new Uint8Array();
    message.status = object.status ?? 0;
    message.pubKeySet =
      object.pubKeySet !== undefined && object.pubKeySet !== null
        ? PubKeySet.fromPartial(object.pubKeySet)
        : undefined;
    message.validatorConsPubKey = object.validatorConsPubKey ?? "";
    message.bond = object.bond ?? "";
    message.activeBlockHeight =
      object.activeBlockHeight !== undefined &&
      object.activeBlockHeight !== null
        ? Long.fromValue(object.activeBlockHeight)
        : Long.ZERO;
    message.bondAddress = object.bondAddress ?? "";
    message.statusSince =
      object.statusSince !== undefined && object.statusSince !== null
        ? Long.fromValue(object.statusSince)
        : Long.ZERO;
    message.signerMembership = object.signerMembership?.map((e) => e) || [];
    message.requestedToLeave = object.requestedToLeave ?? false;
    message.forcedToLeave = object.forcedToLeave ?? false;
    message.leaveScore =
      object.leaveScore !== undefined && object.leaveScore !== null
        ? Long.fromValue(object.leaveScore)
        : Long.UZERO;
    message.ipAddress = object.ipAddress ?? "";
    message.version = object.version ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseBondProvider(): BondProvider {
  return { bondAddress: new Uint8Array(), bond: "" };
}

export const BondProvider = {
  encode(
    message: BondProvider,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bondAddress.length !== 0) {
      writer.uint32(10).bytes(message.bondAddress);
    }
    if (message.bond !== "") {
      writer.uint32(18).string(message.bond);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BondProvider {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBondProvider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bondAddress = reader.bytes();
          break;
        case 2:
          message.bond = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BondProvider {
    return {
      bondAddress: isSet(object.bondAddress)
        ? bytesFromBase64(object.bondAddress)
        : new Uint8Array(),
      bond: isSet(object.bond) ? String(object.bond) : "",
    };
  },

  toJSON(message: BondProvider): unknown {
    const obj: any = {};
    message.bondAddress !== undefined &&
      (obj.bondAddress = base64FromBytes(
        message.bondAddress !== undefined
          ? message.bondAddress
          : new Uint8Array()
      ));
    message.bond !== undefined && (obj.bond = message.bond);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BondProvider>, I>>(
    object: I
  ): BondProvider {
    const message = createBaseBondProvider();
    message.bondAddress = object.bondAddress ?? new Uint8Array();
    message.bond = object.bond ?? "";
    return message;
  },
};

function createBaseBondProviders(): BondProviders {
  return { nodeAddress: new Uint8Array(), nodeOperatorFee: "", providers: [] };
}

export const BondProviders = {
  encode(
    message: BondProviders,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.nodeAddress.length !== 0) {
      writer.uint32(10).bytes(message.nodeAddress);
    }
    if (message.nodeOperatorFee !== "") {
      writer.uint32(18).string(message.nodeOperatorFee);
    }
    for (const v of message.providers) {
      BondProvider.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BondProviders {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBondProviders();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodeAddress = reader.bytes();
          break;
        case 2:
          message.nodeOperatorFee = reader.string();
          break;
        case 3:
          message.providers.push(BondProvider.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BondProviders {
    return {
      nodeAddress: isSet(object.nodeAddress)
        ? bytesFromBase64(object.nodeAddress)
        : new Uint8Array(),
      nodeOperatorFee: isSet(object.nodeOperatorFee)
        ? String(object.nodeOperatorFee)
        : "",
      providers: Array.isArray(object?.providers)
        ? object.providers.map((e: any) => BondProvider.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BondProviders): unknown {
    const obj: any = {};
    message.nodeAddress !== undefined &&
      (obj.nodeAddress = base64FromBytes(
        message.nodeAddress !== undefined
          ? message.nodeAddress
          : new Uint8Array()
      ));
    message.nodeOperatorFee !== undefined &&
      (obj.nodeOperatorFee = message.nodeOperatorFee);
    if (message.providers) {
      obj.providers = message.providers.map((e) =>
        e ? BondProvider.toJSON(e) : undefined
      );
    } else {
      obj.providers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BondProviders>, I>>(
    object: I
  ): BondProviders {
    const message = createBaseBondProviders();
    message.nodeAddress = object.nodeAddress ?? new Uint8Array();
    message.nodeOperatorFee = object.nodeOperatorFee ?? "";
    message.providers =
      object.providers?.map((e) => BondProvider.fromPartial(e)) || [];
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
