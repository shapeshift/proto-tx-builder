/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Chain, chainFromJSON, chainToJSON } from "./claim_record";

export interface MsgClaimEth {
  creator: Uint8Array;
  /** the adress the claim is for */
  ethAddress: string;
  /** EIP712 signature that has to be signed by ethAddress */
  signature: string;
}

export interface MsgClaimEthResponse {
}

export interface MsgClaimArkeo {
  creator: Uint8Array;
}

export interface MsgClaimArkeoResponse {
}

export interface MsgTransferClaim {
  creator: Uint8Array;
  toAddress: Uint8Array;
}

export interface MsgTransferClaimResponse {
}

export interface MsgAddClaim {
  creator: Uint8Array;
  chain: Chain;
  address: string;
  amount: Long;
}

export interface MsgAddClaimResponse {
}

function createBaseMsgClaimEth(): MsgClaimEth {
  return { creator: new Uint8Array(), ethAddress: "", signature: "" };
}

export const MsgClaimEth = {
  encode(message: MsgClaimEth, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.ethAddress !== "") {
      writer.uint32(18).string(message.ethAddress);
    }
    if (message.signature !== "") {
      writer.uint32(26).string(message.signature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimEth {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimEth();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.ethAddress = reader.string();
          break;
        case 3:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimEth {
    return {
      creator: isSet(object.creator) ? bytesFromBase64(object.creator) : new Uint8Array(),
      ethAddress: isSet(object.ethAddress) ? String(object.ethAddress) : "",
      signature: isSet(object.signature) ? String(object.signature) : "",
    };
  },

  toJSON(message: MsgClaimEth): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
    message.ethAddress !== undefined && (obj.ethAddress = message.ethAddress);
    message.signature !== undefined && (obj.signature = message.signature);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgClaimEth>, I>>(base?: I): MsgClaimEth {
    return MsgClaimEth.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimEth>, I>>(object: I): MsgClaimEth {
    const message = createBaseMsgClaimEth();
    message.creator = object.creator ?? new Uint8Array();
    message.ethAddress = object.ethAddress ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
};

function createBaseMsgClaimEthResponse(): MsgClaimEthResponse {
  return {};
}

export const MsgClaimEthResponse = {
  encode(_: MsgClaimEthResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimEthResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimEthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgClaimEthResponse {
    return {};
  },

  toJSON(_: MsgClaimEthResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgClaimEthResponse>, I>>(base?: I): MsgClaimEthResponse {
    return MsgClaimEthResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimEthResponse>, I>>(_: I): MsgClaimEthResponse {
    const message = createBaseMsgClaimEthResponse();
    return message;
  },
};

function createBaseMsgClaimArkeo(): MsgClaimArkeo {
  return { creator: new Uint8Array() };
}

export const MsgClaimArkeo = {
  encode(message: MsgClaimArkeo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimArkeo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimArkeo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimArkeo {
    return { creator: isSet(object.creator) ? bytesFromBase64(object.creator) : new Uint8Array() };
  },

  toJSON(message: MsgClaimArkeo): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgClaimArkeo>, I>>(base?: I): MsgClaimArkeo {
    return MsgClaimArkeo.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimArkeo>, I>>(object: I): MsgClaimArkeo {
    const message = createBaseMsgClaimArkeo();
    message.creator = object.creator ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgClaimArkeoResponse(): MsgClaimArkeoResponse {
  return {};
}

export const MsgClaimArkeoResponse = {
  encode(_: MsgClaimArkeoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimArkeoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimArkeoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgClaimArkeoResponse {
    return {};
  },

  toJSON(_: MsgClaimArkeoResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgClaimArkeoResponse>, I>>(base?: I): MsgClaimArkeoResponse {
    return MsgClaimArkeoResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimArkeoResponse>, I>>(_: I): MsgClaimArkeoResponse {
    const message = createBaseMsgClaimArkeoResponse();
    return message;
  },
};

function createBaseMsgTransferClaim(): MsgTransferClaim {
  return { creator: new Uint8Array(), toAddress: new Uint8Array() };
}

export const MsgTransferClaim = {
  encode(message: MsgTransferClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.toAddress.length !== 0) {
      writer.uint32(18).bytes(message.toAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.toAddress = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTransferClaim {
    return {
      creator: isSet(object.creator) ? bytesFromBase64(object.creator) : new Uint8Array(),
      toAddress: isSet(object.toAddress) ? bytesFromBase64(object.toAddress) : new Uint8Array(),
    };
  },

  toJSON(message: MsgTransferClaim): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
    message.toAddress !== undefined &&
      (obj.toAddress = base64FromBytes(message.toAddress !== undefined ? message.toAddress : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTransferClaim>, I>>(base?: I): MsgTransferClaim {
    return MsgTransferClaim.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferClaim>, I>>(object: I): MsgTransferClaim {
    const message = createBaseMsgTransferClaim();
    message.creator = object.creator ?? new Uint8Array();
    message.toAddress = object.toAddress ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgTransferClaimResponse(): MsgTransferClaimResponse {
  return {};
}

export const MsgTransferClaimResponse = {
  encode(_: MsgTransferClaimResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferClaimResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferClaimResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgTransferClaimResponse {
    return {};
  },

  toJSON(_: MsgTransferClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTransferClaimResponse>, I>>(base?: I): MsgTransferClaimResponse {
    return MsgTransferClaimResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferClaimResponse>, I>>(_: I): MsgTransferClaimResponse {
    const message = createBaseMsgTransferClaimResponse();
    return message;
  },
};

function createBaseMsgAddClaim(): MsgAddClaim {
  return { creator: new Uint8Array(), chain: 0, address: "", amount: Long.ZERO };
}

export const MsgAddClaim = {
  encode(message: MsgAddClaim, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.chain !== 0) {
      writer.uint32(16).int32(message.chain);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (!message.amount.isZero()) {
      writer.uint32(32).int64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddClaim {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.chain = reader.int32() as any;
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.amount = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddClaim {
    return {
      creator: isSet(object.creator) ? bytesFromBase64(object.creator) : new Uint8Array(),
      chain: isSet(object.chain) ? chainFromJSON(object.chain) : 0,
      address: isSet(object.address) ? String(object.address) : "",
      amount: isSet(object.amount) ? Long.fromValue(object.amount) : Long.ZERO,
    };
  },

  toJSON(message: MsgAddClaim): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(message.creator !== undefined ? message.creator : new Uint8Array()));
    message.chain !== undefined && (obj.chain = chainToJSON(message.chain));
    message.address !== undefined && (obj.address = message.address);
    message.amount !== undefined && (obj.amount = (message.amount || Long.ZERO).toString());
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddClaim>, I>>(base?: I): MsgAddClaim {
    return MsgAddClaim.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddClaim>, I>>(object: I): MsgAddClaim {
    const message = createBaseMsgAddClaim();
    message.creator = object.creator ?? new Uint8Array();
    message.chain = object.chain ?? 0;
    message.address = object.address ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Long.fromValue(object.amount)
      : Long.ZERO;
    return message;
  },
};

function createBaseMsgAddClaimResponse(): MsgAddClaimResponse {
  return {};
}

export const MsgAddClaimResponse = {
  encode(_: MsgAddClaimResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddClaimResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddClaimResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgAddClaimResponse {
    return {};
  },

  toJSON(_: MsgAddClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddClaimResponse>, I>>(base?: I): MsgAddClaimResponse {
    return MsgAddClaimResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddClaimResponse>, I>>(_: I): MsgAddClaimResponse {
    const message = createBaseMsgAddClaimResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  ClaimEth(request: MsgClaimEth): Promise<MsgClaimEthResponse>;
  ClaimArkeo(request: MsgClaimArkeo): Promise<MsgClaimArkeoResponse>;
  TransferClaim(request: MsgTransferClaim): Promise<MsgTransferClaimResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  AddClaim(request: MsgAddClaim): Promise<MsgAddClaimResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "arkeo.claim.Msg";
    this.rpc = rpc;
    this.ClaimEth = this.ClaimEth.bind(this);
    this.ClaimArkeo = this.ClaimArkeo.bind(this);
    this.TransferClaim = this.TransferClaim.bind(this);
    this.AddClaim = this.AddClaim.bind(this);
  }
  ClaimEth(request: MsgClaimEth): Promise<MsgClaimEthResponse> {
    const data = MsgClaimEth.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClaimEth", data);
    return promise.then((data) => MsgClaimEthResponse.decode(new _m0.Reader(data)));
  }

  ClaimArkeo(request: MsgClaimArkeo): Promise<MsgClaimArkeoResponse> {
    const data = MsgClaimArkeo.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClaimArkeo", data);
    return promise.then((data) => MsgClaimArkeoResponse.decode(new _m0.Reader(data)));
  }

  TransferClaim(request: MsgTransferClaim): Promise<MsgTransferClaimResponse> {
    const data = MsgTransferClaim.encode(request).finish();
    const promise = this.rpc.request(this.service, "TransferClaim", data);
    return promise.then((data) => MsgTransferClaimResponse.decode(new _m0.Reader(data)));
  }

  AddClaim(request: MsgAddClaim): Promise<MsgAddClaimResponse> {
    const data = MsgAddClaim.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddClaim", data);
    return promise.then((data) => MsgAddClaimResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

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
