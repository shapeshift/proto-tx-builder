import { Slip10RawIndex } from "@cosmjs/crypto";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import * as fs from "fs";

import { sign } from ".";

const supported_assets = [
  "cosmos",
  "osmosis",
  // 'thorchain',
  // 'terra',
  // 'kava',
  // 'secret',
] as const;

const prefixes = {
  osmosis: "osmo",
  cosmos: "cosmos",
} as const;

async function makeReferenceSeedSigner(prefix: string) {
  return await DirectSecp256k1HdWallet.fromMnemonic(
    "alcohol woman abuse must during monitor noble actual mixed trade anger aisle",
    {
      hdPaths: [
        [
          Slip10RawIndex.hardened(44),
          Slip10RawIndex.hardened(118),
          Slip10RawIndex.hardened(0),
          Slip10RawIndex.normal(0),
          Slip10RawIndex.normal(0),
        ],
      ],
      prefix,
    }
  );
}

describe("signs Tendermint transactions", async function () {
  const tag = " | sign | ";
  for (const asset of supported_assets) {
    const prefix = prefixes[asset];
    const referenceSigner = await makeReferenceSeedSigner(prefix);
    console.log("ASSET: ", asset);

    //Osmosis only
    if (asset === "osmosis") {
      it(
        "signs a mainnet " + asset + " reference lp unstake transaction",
        async function () {
          //get reference data
          const referenceTx = JSON.parse(
            fs.readFileSync(
              "./src/reference-data/defi/tx01.mainnet." +
                asset +
                ".lp-unstake.json",
              { encoding: "utf8" }
            )
          );
          const referenceTxSigned = JSON.parse(
            fs.readFileSync(
              "./src/reference-data/defi/tx01.mainnet." +
                asset +
                ".lp-unstake.signed.json",
              { encoding: "utf8" }
            )
          );

          // console.info(tag,"referenceTx: ",referenceTx)
          // console.info(tag,"referenceTxSigned: ",referenceTxSigned)
          expect(referenceTx).toBeTruthy();
          expect(referenceTxSigned).toBeTruthy();

          const result = await sign(
            referenceTx,
            referenceSigner,
            referenceTx.sequence,
            referenceTx.account_number,
            referenceTx.chain_id,
          );
          console.info(tag, "result: ", result);

          expect(result.serialized).toBe(referenceTxSigned.serialized);
          expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0]);
        }
      );

      it(
        "signs a mainnet " + asset + " reference lp stake transaction",
        async function () {
          //get reference data
          let referenceTx = fs.readFileSync(
            "./src/reference-data/defi/tx01.mainnet." + asset + ".lp-stake.json"
          );
          referenceTx = JSON.parse(referenceTx.toString());

          let referenceTxSigned = fs.readFileSync(
            "./src/reference-data/defi/tx01.mainnet." +
              asset +
              ".lp-stake.signed.json"
          );
          referenceTxSigned = JSON.parse(referenceTxSigned.toString());

          // console.info(tag,"referenceTx: ",referenceTx)
          // console.info(tag,"referenceTxSigned: ",referenceTxSigned)
          expect(referenceTx).toBeTruthy();
          expect(referenceTxSigned).toBeTruthy();

          const result = await sign(
            referenceTx,
            referenceSigner,
            referenceTx.sequence,
            referenceTx.account_number,
            referenceTx.chain_id,
            prefix
          );
          console.info(tag, "result: ", result);

          expect(result.serialized).toBe(referenceTxSigned.serialized);
          expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0]);
        }
      );

      it(
        "signs a mainnet " + asset + " reference lp remove transaction",
        async function () {
          //get reference data
          let referenceTx = fs.readFileSync(
            "./src/reference-data/defi/tx01.mainnet." +
              asset +
              ".lp-remove.json"
          );
          referenceTx = JSON.parse(referenceTx.toString());

          let referenceTxSigned = fs.readFileSync(
            "./src/reference-data/defi/tx01.mainnet." +
              asset +
              ".lp-remove.signed.json"
          );
          referenceTxSigned = JSON.parse(referenceTxSigned.toString());

          // console.info(tag,"referenceTx: ",referenceTx)
          // console.info(tag,"referenceTxSigned: ",referenceTxSigned)
          expect(referenceTx).toBeTruthy();
          expect(referenceTxSigned).toBeTruthy();

          const result = await sign(
            referenceTx,
            referenceSigner,
            referenceTx.sequence,
            referenceTx.account_number,
            referenceTx.chain_id,
            prefix
          );
          console.info(tag, "result: ", result);

          expect(result.serialized).toBe(referenceTxSigned.serialized);
          expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0]);
        }
      );

      it(
        "signs a mainnet " + asset + " reference lp add transaction",
        async function () {
          //get reference data
          let referenceTx = fs.readFileSync(
            "./src/reference-data/defi/tx01.mainnet." + asset + ".lp-add.json"
          );
          referenceTx = JSON.parse(referenceTx.toString());

          let referenceTxSigned = fs.readFileSync(
            "./src/reference-data/defi/tx01.mainnet." +
              asset +
              ".lp-add.signed.json"
          );
          referenceTxSigned = JSON.parse(referenceTxSigned.toString());

          // console.info(tag,"referenceTx: ",referenceTx)
          // console.info(tag,"referenceTxSigned: ",referenceTxSigned)
          expect(referenceTx).toBeTruthy();
          expect(referenceTxSigned).toBeTruthy();

          const result = await sign(
            referenceTx,
            referenceSigner,
            referenceTx.sequence,
            referenceTx.account_number,
            referenceTx.chain_id,
            prefix
          );
          console.info(tag, "result: ", result);

          expect(result.serialized).toBe(referenceTxSigned.serialized);
          expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0]);
        }
      );

      it(
        "signs a mainnet " + asset + " reference swap transaction",
        async function () {
          //get reference data
          let referenceTx = fs.readFileSync(
            "./src/reference-data/defi/tx01.mainnet." + asset + ".swap.json"
          );
          referenceTx = JSON.parse(referenceTx.toString());

          let referenceTxSigned = fs.readFileSync(
            "./src/reference-data/defi/tx01.mainnet." +
              asset +
              ".swap.signed.json"
          );
          referenceTxSigned = JSON.parse(referenceTxSigned.toString());

          // console.info(tag,"referenceTx: ",referenceTx)
          // console.info(tag,"referenceTxSigned: ",referenceTxSigned)
          expect(referenceTx).toBeTruthy();
          expect(referenceTxSigned).toBeTruthy();

          const result = await sign(
            referenceTx,
            referenceSigner,
            referenceTx.sequence,
            referenceTx.account_number,
            referenceTx.chain_id,
            prefix
          );
          console.info(tag, "result: ", result);

          expect(result.serialized).toBe(referenceTxSigned.serialized);
          expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0]);
        }
      );
    }

    //IBC
    if (asset != "osmosis") {
      it(
        "signs a mainnet " + asset + " reference IBC transfer transaction",
        async function () {
          //get reference data
          let referenceTx = fs.readFileSync(
            "./src/reference-data/ibc/tx01.mainnet." +
              asset +
              ".ibc.transfer.json"
          );
          referenceTx = JSON.parse(referenceTx.toString());

          let referenceTxSigned = fs.readFileSync(
            "./src/reference-data/ibc/tx01.mainnet." +
              asset +
              ".ibc.transfer.signed.json"
          );
          referenceTxSigned = JSON.parse(referenceTxSigned.toString());

          // console.info(tag,"referenceTx: ",referenceTx)
          // console.info(tag,"referenceTxSigned: ",referenceTxSigned)
          expect(referenceTx).toBeTruthy();
          expect(referenceTxSigned).toBeTruthy();

          const result = await sign(
            referenceTx,
            referenceSigner,
            referenceTx.sequence,
            referenceTx.account_number,
            referenceTx.chain_id,
            prefix
          );
          console.info(tag, "result: ", result);

          expect(result.serialized).toBe(referenceTxSigned.serialized);
          expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0]);
        }
      );
    }
    it(
      "signs a mainnet " + asset + " reference undelegate transaction",
      async function () {
        //get reference data
        let referenceTx = fs.readFileSync(
          "./src/reference-data/staking/tx01.mainnet." +
            asset +
            ".undelegate.json"
        );
        referenceTx = JSON.parse(referenceTx.toString());

        let referenceTxSigned = fs.readFileSync(
          "./src/reference-data/staking/tx01.mainnet." +
            asset +
            ".undelegate.signed.json"
        );
        referenceTxSigned = JSON.parse(referenceTxSigned.toString());

        // console.info(tag,"referenceTx: ",referenceTx)
        // console.info(tag,"referenceTxSigned: ",referenceTxSigned)
        expect(referenceTx).toBeTruthy();
        expect(referenceTxSigned).toBeTruthy();

        const result = await sign(
          referenceTx,
          referenceSigner,
          referenceTx.sequence,
          referenceTx.account_number,
          referenceTx.chain_id,
          prefix
        );
        console.info(tag, "result: ", result);

        expect(result.serialized).toBe(referenceTxSigned.serialized);
        expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0]);
      }
    );

    it(
      "signs a mainnet " + asset + " reference claim rewards transaction",
      async function () {
        //get reference data
        let referenceTx = fs.readFileSync(
          "./src/reference-data/staking/tx01.mainnet." + asset + ".rewards.json"
        );
        referenceTx = JSON.parse(referenceTx.toString());

        let referenceTxSigned = fs.readFileSync(
          "./src/reference-data/staking/tx01.mainnet." +
            asset +
            ".rewards.signed.json"
        );
        referenceTxSigned = JSON.parse(referenceTxSigned.toString());

        // console.info(tag,"referenceTx: ",referenceTx)
        // console.info(tag,"referenceTxSigned: ",referenceTxSigned)
        expect(referenceTx).toBeTruthy();
        expect(referenceTxSigned).toBeTruthy();

        const result = await sign(
          referenceTx,
          referenceSigner,
          referenceTx.sequence,
          referenceTx.account_number,
          referenceTx.chain_id,
          prefix
        );
        console.info(tag, "result: ", result);

        expect(result.serialized).toBe(referenceTxSigned.serialized);
        expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0]);
      }
    );

    it(
      "signs a mainnet " + asset + " reference redelegate transaction",
      async function () {
        //get reference data
        let referenceTx = fs.readFileSync(
          "./src/reference-data/staking/tx01.mainnet." +
            asset +
            ".redelegate.json"
        );
        referenceTx = JSON.parse(referenceTx.toString());

        let referenceTxSigned = fs.readFileSync(
          "./src/reference-data/staking/tx01.mainnet." +
            asset +
            ".redelegate.signed.json"
        );
        referenceTxSigned = JSON.parse(referenceTxSigned.toString());

        // console.info(tag,"referenceTx: ",referenceTx)
        // console.info(tag,"referenceTxSigned: ",referenceTxSigned)
        expect(referenceTx).toBeTruthy();
        expect(referenceTxSigned).toBeTruthy();

        const result = await sign(
          referenceTx,
          referenceSigner,
          referenceTx.sequence,
          referenceTx.account_number,
          referenceTx.chain_id,
          prefix
        );
        console.info(tag, "result: ", result);

        expect(result.serialized).toBe(referenceTxSigned.serialized);
        expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0]);
      }
    );

    it(
      "signs a mainnet " + asset + " reference delegate transaction",
      async function () {
        //get reference data
        let referenceTx = fs.readFileSync(
          "./src/reference-data/staking/tx01.mainnet." +
            asset +
            ".delegate.json"
        );
        referenceTx = JSON.parse(referenceTx.toString());

        let referenceTxSigned = fs.readFileSync(
          "./src/reference-data/staking/tx01.mainnet." +
            asset +
            ".delegate.signed.json"
        );
        referenceTxSigned = JSON.parse(referenceTxSigned.toString());

        // console.info(tag,"referenceTx: ",referenceTx)
        // console.info(tag,"referenceTxSigned: ",referenceTxSigned)
        expect(referenceTx).toBeTruthy();
        expect(referenceTxSigned).toBeTruthy();

        const result = await sign(
          referenceTx,
          referenceSigner,
          referenceTx.sequence,
          referenceTx.account_number,
          referenceTx.chain_id,
          prefix
        );
        console.info(tag, "result: ", result);

        expect(result.serialized).toBe(referenceTxSigned.serialized);
        expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0]);
      }
    );

    it(
      "signs a mainnet " + asset + " reference transfer transaction",
      async function () {
        //get reference data
        let referenceTx = fs.readFileSync(
          "./src/reference-data/transfers/tx01.mainnet." + asset + ".json"
        );
        referenceTx = JSON.parse(referenceTx.toString());

        let referenceTxSigned = fs.readFileSync(
          "./src/reference-data/transfers/tx01.mainnet." +
            asset +
            ".signed.json"
        );
        referenceTxSigned = JSON.parse(referenceTxSigned.toString());

        console.info(tag, "referenceTx: ", referenceTx);
        console.info(tag, "referenceTxSigned: ", referenceTxSigned);
        expect(referenceTx).toBeTruthy();
        expect(referenceTxSigned).toBeTruthy();

        const result = await sign(
          referenceTx,
          referenceSigner,
          referenceTx.sequence,
          referenceTx.account_number,
          referenceTx.chain_id,
          prefix
        );
        console.info(tag, "result: ", result);

        expect(result.serialized).toBe(referenceTxSigned.serialized);
        expect(result.signatures[0]).toBe(referenceTxSigned.signatures[0]);
      }
    );
  }
});
