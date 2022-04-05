#!/bin/sh -e

if [ "$1" = "--print-sparse-warning" ]; then
  {
    printf 'Protip: if you see errors like "TS2304: Cannot find name: IomeMessage", where the first letter\n'
    printf '  of the name of "SomeMessage" is being replaced with "I", you probably have not included the\n'
    printf '  .proto file that message comes from in the list of files to compile.\n'
    printf '\n'
    printf '  Turn off "--sparse" in %s to check. If it works, hunt down the appropriate\n' "$(basename "$0")"
    printf '  .proto files, add them to the list, and then TURN IT BACK ON so you don'"'"'t end up shipping\n'
    printf '  every protobuf in the whole Cosmos ecosystem by accident.\n\n'
  } 1>&2
  exit 1
fi

# Remove old codecs
rm -rf ./proto
mkdir -p ./proto

# Generate protobuf codecs
pbjs \
  $(: "Set output format") \
  -t static-module \
  -w commonjs \
  $(: "Don't generate methods we don't need") \
  --no-verify \
  --no-convert \
  --no-delimited \
  --no-service \
  $(: "Only generate codecs for messages directly included in the list of files to compile") \
  --sparse \
  $(: "Output file") \
  -o ./proto/generated.js \
  $(: "Protobuf include directories") \
  -p ./deps/cosmos-sdk/proto \
  -p ./deps/ibc-go/proto \
  -p ./deps/osmosis/proto \
  -p ./deps/protobuf/src \
  -p ./deps/tendermint/proto \
  -p ./deps/thornode/proto \
  $(: "Protobuf files to compile") \
  ./deps/cosmos-sdk/proto/cosmos/tx/v1beta1/tx.proto \
  ./deps/cosmos-sdk/proto/cosmos/tx/signing/v1beta1/signing.proto \
  ./deps/cosmos-sdk/proto/cosmos/bank/v1beta1/tx.proto \
  ./deps/cosmos-sdk/proto/cosmos/bank/v1beta1/bank.proto \
  ./deps/cosmos-sdk/proto/cosmos/distribution/v1beta1/tx.proto \
  ./deps/cosmos-sdk/proto/cosmos/staking/v1beta1/tx.proto \
  ./deps/ibc-go/proto/ibc/applications/transfer/v1/tx.proto \
  ./deps/osmosis/proto/osmosis/gamm/v1beta1/tx.proto \
  ./deps/osmosis/proto/osmosis/gamm/v1beta1/pool.proto \
  ./deps/osmosis/proto/osmosis/lockup/lock.proto \
  ./deps/osmosis/proto/osmosis/lockup/tx.proto \
  ./deps/thornode/proto/thorchain/v1/common/common.proto \
  ./deps/thornode/proto/thorchain/v1/x/thorchain/types/msg_send.proto \
  ./deps/thornode/proto/thorchain/v1/x/thorchain/types/msg_deposit.proto

# Generate codec type definitions
pbts -o ./proto/generated.d.ts ./proto/generated.js

# Minify generated codecs
uglifyjs ./proto/generated.js -c -m -o ./proto/generated.min.js
mv ./proto/generated.min.js ./proto/generated.js

# Generate runtypes
runtyping
prettier -w proto/runtypes.ts
