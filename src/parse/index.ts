import { convertLegacyMsg } from './legacy'
import { scrubCoins } from './utils'

export function parseLegacyTxFormat(jsonTx: any) {
  if (jsonTx.msg.length !== 1) throw new Error('multiple msgs not supported!')

  return {
    ...convertLegacyMsg(jsonTx.msg[0]),
    fee: {
      amount: scrubCoins(jsonTx.fee.amount),
      gas: jsonTx.fee.gas
    },
    memo: jsonTx.memo
  }
}
