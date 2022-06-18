import { GeneratedType, Registry } from '@cosmjs/proto-signing'
import Long from 'long'
import protobuf from 'protobufjs/minimal'

protobuf.util.Long = Long
protobuf.configure()

import generated from '../proto/generated'

function registerCodecs(
  typeBase: unknown,
  registerCodec: (typeUrl: string, type: GeneratedType) => void,
  typeUrlBase = ""
) {
  if (typeof typeBase !== "object" || !typeBase) return;
  for (const [k, v] of Object.entries(typeBase)) {
    const typeUrl = `${typeUrlBase}${typeUrlBase === "" ? "/" : "."}${k}`
    if (typeof v === "function" && v.prototype) {
      registerCodec(typeUrl, v as GeneratedType)
    } else {
      registerCodecs(v, registerCodec, typeUrl)
    }
  }
}

let cache: {
  registry: Registry
  codecs: Map<string, GeneratedType>
} | undefined = undefined

function populateCache() {
  cache ??= (() => {
    const out = {
      registry: new Registry(),
      codecs: new Map<string, GeneratedType>()
    }
    registerCodecs(generated, (typeUrl, type) => {
      out.codecs.set(typeUrl, type)
      out.registry.register(typeUrl, type)
    })
    return out
  })()
  return cache
}

export function getRegistry() {
  return populateCache().registry
}

export function getCodecs() {
  return populateCache().codecs
}
