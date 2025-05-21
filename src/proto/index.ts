import Long from 'long'
import protobuf from 'protobufjs/minimal'

protobuf.util.Long = Long
protobuf.configure()

export * from '../../osmosis-frontend/src/proto/generated/codecimpl'
export * as thorchain from './generated/thorchain/v1/types'
export * as arkeo from './generated/arkeo'