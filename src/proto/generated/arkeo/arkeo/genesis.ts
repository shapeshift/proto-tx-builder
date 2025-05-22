/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Contract, ContractExpirationSet, Provider, UserContractSet } from "./keeper";
import { Params } from "./params";

/** GenesisState defines the arkeo module's genesis state. */
export interface GenesisState {
  params?: Params;
  providers: Provider[];
  contracts: Contract[];
  nextContractId: Long;
  contractExpirationSets: ContractExpirationSet[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  userContractSets: UserContractSet[];
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    providers: [],
    contracts: [],
    nextContractId: Long.UZERO,
    contractExpirationSets: [],
    userContractSets: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.providers) {
      Provider.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.contracts) {
      Contract.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (!message.nextContractId.isZero()) {
      writer.uint32(32).uint64(message.nextContractId);
    }
    for (const v of message.contractExpirationSets) {
      ContractExpirationSet.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.userContractSets) {
      UserContractSet.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.providers.push(Provider.decode(reader, reader.uint32()));
          break;
        case 3:
          message.contracts.push(Contract.decode(reader, reader.uint32()));
          break;
        case 4:
          message.nextContractId = reader.uint64() as Long;
          break;
        case 5:
          message.contractExpirationSets.push(ContractExpirationSet.decode(reader, reader.uint32()));
          break;
        case 6:
          message.userContractSets.push(UserContractSet.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      providers: Array.isArray(object?.providers) ? object.providers.map((e: any) => Provider.fromJSON(e)) : [],
      contracts: Array.isArray(object?.contracts) ? object.contracts.map((e: any) => Contract.fromJSON(e)) : [],
      nextContractId: isSet(object.nextContractId) ? Long.fromValue(object.nextContractId) : Long.UZERO,
      contractExpirationSets: Array.isArray(object?.contractExpirationSets)
        ? object.contractExpirationSets.map((e: any) => ContractExpirationSet.fromJSON(e))
        : [],
      userContractSets: Array.isArray(object?.userContractSets)
        ? object.userContractSets.map((e: any) => UserContractSet.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.providers) {
      obj.providers = message.providers.map((e) => e ? Provider.toJSON(e) : undefined);
    } else {
      obj.providers = [];
    }
    if (message.contracts) {
      obj.contracts = message.contracts.map((e) => e ? Contract.toJSON(e) : undefined);
    } else {
      obj.contracts = [];
    }
    message.nextContractId !== undefined && (obj.nextContractId = (message.nextContractId || Long.UZERO).toString());
    if (message.contractExpirationSets) {
      obj.contractExpirationSets = message.contractExpirationSets.map((e) =>
        e ? ContractExpirationSet.toJSON(e) : undefined
      );
    } else {
      obj.contractExpirationSets = [];
    }
    if (message.userContractSets) {
      obj.userContractSets = message.userContractSets.map((e) => e ? UserContractSet.toJSON(e) : undefined);
    } else {
      obj.userContractSets = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.providers = object.providers?.map((e) => Provider.fromPartial(e)) || [];
    message.contracts = object.contracts?.map((e) => Contract.fromPartial(e)) || [];
    message.nextContractId = (object.nextContractId !== undefined && object.nextContractId !== null)
      ? Long.fromValue(object.nextContractId)
      : Long.UZERO;
    message.contractExpirationSets = object.contractExpirationSets?.map((e) => ContractExpirationSet.fromPartial(e)) ||
      [];
    message.userContractSets = object.userContractSets?.map((e) => UserContractSet.fromPartial(e)) || [];
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
