import type { OfflineDirectSigner } from '@cosmjs/proto-signing'
import {
  SigningStargateClient,
} from '@cosmjs/stargate'
import { Array, Record, Static, String, Unknown } from 'runtypes'

import { getCodecs, getRegistry } from './codecs'
import { TxBase, parseTx } from './parse'
import { assert } from './parse/utils'

export async function sign(
  jsonTx: TxBase,
  signer: OfflineDirectSigner,
  sequence: string,
  accountNumber: string,
  chainId: string
): Promise<{
  serialized: string
  body: string
  authInfoBytes: string
  signatures: string[]
}> {
  const { from, msgs, fee, memo } = parseTx(jsonTx)

  const clientOffline = await SigningStargateClient.offline(signer, { registry: getRegistry() })
  const txRaw = await clientOffline.sign(from, msgs, fee, memo || '', {
    accountNumber: Number(accountNumber),
    sequence: Number(sequence),
    chainId
  })

  const TxRaw = getCodecs().get('/cosmos.tx.v1beta1.TxRaw')
  if (!TxRaw) throw new TypeError('TxRaw codec missing')
  return {
    serialized: Buffer.from(TxRaw.encode(txRaw).finish()).toString('base64'),
    body: Buffer.from(txRaw.bodyBytes).toString('base64'),
    authInfoBytes: Buffer.from(txRaw.authInfoBytes).toString('base64'),
    signatures: txRaw.signatures.map((x) => Buffer.from(x).toString('base64'))
  }
}
