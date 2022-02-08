import { Slip10RawIndex } from '@cosmjs/crypto'
import { DirectSecp256k1HdWallet, OfflineDirectSigner } from '@cosmjs/proto-signing'
import * as fs from 'fs'
import glob from 'glob'
import * as path from 'path'

import { sign } from '.'

const supported_assets = [
  'cosmos',
  'osmosis'
  // 'thorchain',
  // 'terra',
  // 'kava',
  // 'secret',
] as const

const prefixes = {
  osmosis: 'osmo',
  cosmos: 'cosmos'
} as const

async function makeReferenceSeedSigner(prefix: string) {
  return await DirectSecp256k1HdWallet.fromMnemonic(
    'alcohol woman abuse must during monitor noble actual mixed trade anger aisle',
    {
      hdPaths: [
        [
          Slip10RawIndex.hardened(44),
          Slip10RawIndex.hardened(118),
          Slip10RawIndex.hardened(0),
          Slip10RawIndex.normal(0),
          Slip10RawIndex.normal(0)
        ]
      ],
      prefix
    }
  )
}

const signers = Object.entries(prefixes)
  .map(([k, v]) => [k, makeReferenceSeedSigner(v)] as const)
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
      if (!(txAsset in prefixes)) throw new Error(`unrecognized asset type '${txAsset}'`)
      const prefix = prefixes[txAsset as keyof typeof prefixes]
      const signer = await signers[txAsset as keyof typeof prefixes]

      // get reference data
      const referenceTx = JSON.parse(
        fs.readFileSync(unsignedJsonPath, {
          encoding: 'utf8'
        })
      )
      const referenceTxSigned = JSON.parse(fs.readFileSync(signedJsonPath, { encoding: 'utf8' }))

      // console.info(tag,"referenceTx: ",referenceTx)
      // console.info(tag,"referenceTxSigned: ",referenceTxSigned)
      expect(referenceTx).toBeTruthy()
      expect(referenceTxSigned).toBeTruthy()

      const result = await sign(
        referenceTx,
        signer,
        referenceTx.sequence,
        referenceTx.account_number,
        referenceTx.chain_id
      )
      console.info('result: ', result)

      expect(result.serialized).toBe(referenceTxSigned.serialized)
      expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0])
    })
  }
})
