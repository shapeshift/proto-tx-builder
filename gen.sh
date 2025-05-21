#!/bin/bash

outDir="./src/proto/generated"
protoc \
  --plugin="$(yarn bin protoc-gen-ts_proto)" \
  --ts_proto_out="${outDir}" \
  --proto_path="./proto" \
  --proto_path="./third_party/proto" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=messages,exportCommonSymbols=false" \
  $(find "proto" -name '*.proto')


# Remove unnecessary codec files
rm -rf \
  ${outDir}/amino/ \
  ${outDir}/cosmos_proto/ \
  ${outDir}/gogoproto/ \
  ${outDir}/google/api/ \
  ${outDir}/google/protobuf/descriptor.ts