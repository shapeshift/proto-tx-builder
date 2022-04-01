import { Coin, coin } from '@cosmjs/proto-signing'

export function scrubCoin(x: Coin) {
  if (!x.amount) throw new Error('missing coin amount')
  if (!x.denom) throw new Error('missing coin denom')

  return coin(x.amount, x.denom)
}
export function scrubCoins(x: Coin[]) {
  return x.filter(c => c.amount).map(scrubCoin)
}

export type Route = { poolId: unknown; tokenOutDenom: unknown }
export function scrubRoute(x: Route) {
  if (!x.poolId) throw new Error('missing route poolId')
  if (!x.tokenOutDenom) throw new Error('missing route tokenOutDenom')

  return {
    poolId: x.poolId,
    tokenOutDenom: x.tokenOutDenom
  }
}
export function scrubRoutes(x: Route[]) {
  return x.map(scrubRoute)
}

/**
 * Parses THORChain asset notation.
 * Ref: https://gitlab.com/thorchain/thornode/-/blob/fdbbb25ecb8245bb76a4d5b976e31c0f3e1dd1e0/common/asset.go#L40-75
 * Ref: https://regexr.com/6il5h
 */
export function parseThorchainAsset(x: string) {
  const groups = /^(?:(?<chain>[A-Z]{3,10})(?<synthIfSlash>[/.]))?(?<symbol>(?<ticker>[A-Z0-9._]{1,13})(?:-(?<id>[A-Z0-9-._]*))?)$/.exec(x.toUpperCase())?.groups
  if (!groups) throw new Error(`Invalid THORChain asset: ${x}`)
  return {
    chain: groups.chain ?? 'THOR',
    symbol: groups.symbol,
    ticker: groups.ticker,
    // This must return undefined rather than false to ensure the field is omitted from the Asset's protobuf encoding.
    synth: groups.synthIfSlash === '/' ? true as const : undefined,
  }
}

