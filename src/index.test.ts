import { Slip10RawIndex } from '@cosmjs/crypto'
import { DirectSecp256k1HdWallet, OfflineDirectSigner } from '@cosmjs/proto-signing'
import * as fs from 'fs'
import glob from 'glob'
import * as path from 'path'

import { sign } from '.'

const prefixes = {
  osmosis: 'osmo',
  cosmos: 'cosmos',
  thorchain: 'thor',
  // terra: 'terra',
  // kava: 'kava',
  // secret: 'secret'
} as const

// TODO - combine this with prefixes as a chain config object
const coinTypes: Record<string, number> = {cosmos: 118,osmosis: 118, thorchain: 931}
const defaultCoinType = coinTypes.cosmos

// TODO - options argument with acceess to full path, or change prefixes to a general config obj per chain
async function makeReferenceSeedSigner(prefix: string, coinType?: number) {
  coinType = coinType || defaultCoinType
  const w = await DirectSecp256k1HdWallet.fromMnemonic(
    'alcohol woman abuse must during monitor noble actual mixed trade anger aisle',
    {
      hdPaths: [
        [
          Slip10RawIndex.hardened(44),
          Slip10RawIndex.hardened(coinType),
          Slip10RawIndex.hardened(0),
          Slip10RawIndex.normal(0),
          Slip10RawIndex.normal(0)
        ]
      ],
      prefix
    }
  )
  const accts = await w.getAccounts()
  // console.log(`got ${accts.length} accounts`)

  console.log(`address: ${accts[0].address}`)
  return w
}

const signers = Object.entries(prefixes)
  .map(([k, v]) => [k, makeReferenceSeedSigner(v, coinTypes[k])] as const)
  .reduce<Record<string, Promise<OfflineDirectSigner>>>((acc, [k, v]) => ((acc[k] = v), acc), {})

describe('signs Tendermint transactions', () => {
  for (const signedJsonPath of glob.sync('src/reference-data/**/*.signed.json')) {
    const unsignedJsonPath = signedJsonPath.replace(/\.signed\.json$/, '.json')
    const signedJsonBasename = path.basename(signedJsonPath)
    const signedJsonPathSegments = /^([^.]+)\.([^.]+)\.([^.]+)\.(.+)\.signed\.json$/.exec(
      signedJsonBasename
    )
    if (!signedJsonPathSegments)
      throw new Error(`test name doesn't match pattern: ${signedJsonBasename}`)

    const [, txNum, txNet, txAsset, txType] = signedJsonPathSegments
    it(`signs a ${txNet} ${txAsset} reference ${txType.replace(
      /[.-]/,
      ' '
    )} transaction (${txNum})`, async () => {
      if (!(txAsset in signers)) throw new Error(`unrecognized asset type '${txAsset}'`)
      const signer = await signers[txAsset as keyof typeof signers]

      // get reference data
      const referenceTx = JSON.parse(
        fs.readFileSync(unsignedJsonPath, {
          encoding: 'utf8'
        })
      )
      const referenceTxSigned = JSON.parse(fs.readFileSync(signedJsonPath, { encoding: 'utf8' }))

      expect(referenceTx).toBeTruthy()
      expect(referenceTxSigned).toBeTruthy()

      const result = await sign(
        referenceTx,
        signer,
        referenceTx.sequence,
        referenceTx.account_number,
        referenceTx.chain_id
      )
      console.info('result: ', JSON.stringify(result))

      expect(result.serialized).toBe(referenceTxSigned.serialized)
      if (txAsset === "thorchain") {
        expect(result.hex).toBe(referenceTxSigned.hex)
      }
      expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0])
    })
  }
})
