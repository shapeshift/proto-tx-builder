/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface Node {
  pubkey: string;
  blameData: Uint8Array;
  blameSignature: Uint8Array;
}

export interface Blame {
  failReason: string;
  isUnicast: boolean;
  blameNodes: Node[];
}

function createBaseNode(): Node {
  return {
    pubkey: "",
    blameData: new Uint8Array(),
    blameSignature: new Uint8Array(),
  };
}

export const Node = {
  encode(message: Node, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pubkey !== "") {
      writer.uint32(10).string(message.pubkey);
    }
    if (message.blameData.length !== 0) {
      writer.uint32(18).bytes(message.blameData);
    }
    if (message.blameSignature.length !== 0) {
      writer.uint32(26).bytes(message.blameSignature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Node {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pubkey = reader.string();
          break;
        case 2:
          message.blameData = reader.bytes();
          break;
        case 3:
          message.blameSignature = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Node {
    return {
      pubkey: isSet(object.pubkey) ? String(object.pubkey) : "",
      blameData: isSet(object.blameData)
        ? bytesFromBase64(object.blameData)
        : new Uint8Array(),
      blameSignature: isSet(object.blameSignature)
        ? bytesFromBase64(object.blameSignature)
        : new Uint8Array(),
    };
  },

  toJSON(message: Node): unknown {
    const obj: any = {};
    message.pubkey !== undefined && (obj.pubkey = message.pubkey);
    message.blameData !== undefined &&
      (obj.blameData = base64FromBytes(
        message.blameData !== undefined ? message.blameData : new Uint8Array()
      ));
    message.blameSignature !== undefined &&
      (obj.blameSignature = base64FromBytes(
        message.blameSignature !== undefined
          ? message.blameSignature
          : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Node>, I>>(object: I): Node {
    const message = createBaseNode();
    message.pubkey = object.pubkey ?? "";
    message.blameData = object.blameData ?? new Uint8Array();
    message.blameSignature = object.blameSignature ?? new Uint8Array();
    return message;
  },
};

function createBaseBlame(): Blame {
  return { failReason: "", isUnicast: false, blameNodes: [] };
}

export const Blame = {
  encode(message: Blame, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.failReason !== "") {
      writer.uint32(10).string(message.failReason);
    }
    if (message.isUnicast === true) {
      writer.uint32(16).bool(message.isUnicast);
    }
    for (const v of message.blameNodes) {
      Node.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Blame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.failReason = reader.string();
          break;
        case 2:
          message.isUnicast = reader.bool();
          break;
        case 3:
          message.blameNodes.push(Node.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Blame {
    return {
      failReason: isSet(object.failReason) ? String(object.failReason) : "",
      isUnicast: isSet(object.isUnicast) ? Boolean(object.isUnicast) : false,
      blameNodes: Array.isArray(object?.blameNodes)
        ? object.blameNodes.map((e: any) => Node.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Blame): unknown {
    const obj: any = {};
    message.failReason !== undefined && (obj.failReason = message.failReason);
    message.isUnicast !== undefined && (obj.isUnicast = message.isUnicast);
    if (message.blameNodes) {
      obj.blameNodes = message.blameNodes.map((e) =>
        e ? Node.toJSON(e) : undefined
      );
    } else {
      obj.blameNodes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Blame>, I>>(object: I): Blame {
    const message = createBaseBlame();
    message.failReason = object.failReason ?? "";
    message.isUnicast = object.isUnicast ?? false;
    message.blameNodes =
      object.blameNodes?.map((e) => Node.fromPartial(e)) || [];
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
