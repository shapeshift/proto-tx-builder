
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningStargateClient, defaultRegistryTypes as defaultStargateTypes } from "@cosmjs/stargate";
import { coins, Registry } from "@cosmjs/proto-signing";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { HdPath, Slip10RawIndex } from "@cosmjs/crypto";
// import {osmosis} from "@pioneer-platform/osmosis-tx-codecs"
// import * as Gamm from "./x/gamm";
import * as codecs from "./generated";

export async function sign(jsonTx:any, seed:string, sequence:string, account_number:string, chain_id:string, prefix:string) {
    let tag = " | sign | ";
    try {
        //TODO dont assume mnemonic
        let path = makeCosmoshubPath(0)
        const myRegistry = new Registry(defaultStargateTypes);
        //custom osmosis modules
        myRegistry.register("/osmosis.gamm.v1beta1.MsgSwapExactAmountIn", codecs.osmosis.gamm.v1beta1.MsgSwapExactAmountIn);
        myRegistry.register("/osmosis.gamm.v1beta1.MsgSwapExactAmountOut", codecs.osmosis.gamm.v1beta1.MsgSwapExactAmountOut);
        myRegistry.register("/osmosis.gamm.v1beta1.MsgJoinPool", codecs.osmosis.gamm.v1beta1.MsgJoinPool);
        myRegistry.register("/osmosis.gamm.v1beta1.MsgExitPool", codecs.osmosis.gamm.v1beta1.MsgExitPool);
        myRegistry.register("/osmosis.gamm.v1beta1.MsgCreatePool", codecs.osmosis.gamm.v1beta1.MsgCreatePool);
        myRegistry.register("/osmosis.gamm.v1beta1.PoolParams", codecs.osmosis.gamm.v1beta1.PoolParams);
        myRegistry.register("/osmosis.gamm.v1beta1.PoolAsset", codecs.osmosis.gamm.v1beta1.PoolAsset);
        myRegistry.register("/osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn", codecs.osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn);
        myRegistry.register("/osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut", codecs.osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut);
        myRegistry.register("/osmosis.gamm.v1beta1.SwapAmountInRoute", codecs.osmosis.gamm.v1beta1.SwapAmountInRoute);
        myRegistry.register("/osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn", codecs.osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn);

        //staking
        myRegistry.register("/osmosis.lockup.MsgLockTokens", codecs.osmosis.lockup.MsgLockTokens);
        myRegistry.register("/osmosis.lockup.MsgBeginUnlocking", codecs.osmosis.lockup.MsgBeginUnlocking);
        myRegistry.register("/osmosis.lockup.MsgBeginUnlockingAll", codecs.osmosis.lockup.MsgBeginUnlockingAll);

        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(seed,{hdPaths: [path],prefix});
        const clientOffline = await SigningStargateClient.offline(wallet,{ registry: myRegistry });
        const [account] = await wallet.getAccounts();



        let {msg,from,fee,memo} = parse_legacy_tx_format(jsonTx)
        if(from !== account.address){
            console.log("from:",from)
            console.log("account: ",account.address)
            console.error("invalid from address!")
        }

        let txData:any = {
            accountNumber: account_number,
            sequence: sequence,
            chainId: chain_id,
            msgs: [msg],
            fee,
            memo,
        }
        const signerData: any = {
            accountNumber: txData.accountNumber,
            sequence: txData.sequence,
            chainId: txData.chainId,
        };

        console.log("{msg,from,fee}: ",{msg,from,fee})
        console.log("MSG: ",JSON.stringify(msg))
        const txRaw = await clientOffline.sign(
            from,
            txData.msgs,
            txData.fee,
            txData.memo,
            signerData,
        );

        console.log("txRaw: ",txRaw)
        // @ts-ignore
        let body = txRaw.bodyBytes.toString("base64")
        // @ts-ignore
        let authInfoBytes = txRaw.authInfoBytes.toString("base64")
        // @ts-ignore
        let signatures = [new Buffer(txRaw.signatures[0]).toString("base64")]

        let output = {
            // @ts-ignore
            serialized:TxRaw.encode(txRaw).finish().toString("base64"),
            body,
            authInfoBytes,
            signatures
        }
        console.log("output: ",output)
        // @ts-ignore
        return output
    } catch (e) {
        console.error(tag, "e: ", e);
        // @ts-ignore
        throw Error(e)
    }
}

function makeCosmoshubPath(a: number): HdPath {
    return [
        Slip10RawIndex.hardened(44),
        Slip10RawIndex.hardened(118),
        Slip10RawIndex.hardened(0),
        Slip10RawIndex.normal(0),
        Slip10RawIndex.normal(a),
    ];
}

const parse_legacy_tx_format = function(jsonTx:any){
    try{
        let txType = jsonTx.msg[0].type
        if(!txType) throw Error("Invalid jsonTx input")
        if(jsonTx.msg[1]) throw Error("multiple msgs not supported!")

        let msg
        let from
        let fee
        let memo
        //switch for each tx type supported
        switch (txType) {
            case 'cosmos-sdk/MsgSend':
                if(!jsonTx.msg[0].value.from_address) throw Error("Missing from_address in msg[0]")
                if(!jsonTx.msg[0].value.to_address) throw Error("Missing to_address in msg[0]")
                if(!jsonTx.msg[0].value.amount[0].amount) throw Error("Missing amount in msg[0] value.amount[0]")
                from = jsonTx.msg[0].value.from_address
                memo = jsonTx.memo
                const msgSend: any = {
                    fromAddress: jsonTx.msg[0].value.from_address,
                    toAddress: jsonTx.msg[0].value.to_address,
                    amount: coins(parseInt(jsonTx.msg[0].value.amount[0].amount), jsonTx.msg[0].value.amount[0].denom),
                };
                msg = {
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: msgSend,
                };
                fee = {
                    amount: coins(parseInt(jsonTx.fee.amount[0].amount), jsonTx.fee.amount[0].denom),
                    gas: jsonTx.fee.gas,
                };
                break;
            case 'cosmos-sdk/MsgDelegate':
                if(!jsonTx.msg[0].value.delegator_address) throw Error("Missing delegator_address in msg[0]")
                if(!jsonTx.msg[0].value.validator_address) throw Error("Missing validator_address in msg[0]")
                if(!jsonTx.msg[0].value.amount.amount) throw Error("Missing amount in msg[0] value.amount[0]")
                from = jsonTx.msg[0].value.delegator_address
                memo = jsonTx.memo
                const msgDelegate: any = {
                    delegatorAddress: jsonTx.msg[0].value.delegator_address,
                    validatorAddress: jsonTx.msg[0].value.validator_address,
                    amount: coins(parseInt(jsonTx.msg[0].value.amount.amount), jsonTx.msg[0].value.amount.denom)[0],
                };
                msg = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msgDelegate,
                };
                fee = {
                    amount: coins(parseInt(jsonTx.fee.amount[0].amount), jsonTx.fee.amount[0].denom),
                    gas: jsonTx.fee.gas,
                };
                break;
            case 'cosmos-sdk/MsgUndelegate':
                if(!jsonTx.msg[0].value.delegator_address) throw Error("Missing delegator_address in msg[0]")
                if(!jsonTx.msg[0].value.validator_address) throw Error("Missing validator_address in msg[0]")
                if(!jsonTx.msg[0].value.amount.amount) throw Error("Missing amount in msg[0] value.amount[0]")
                from = jsonTx.msg[0].value.delegator_address
                memo = jsonTx.memo
                const msgUnDelegate: any = {
                    delegatorAddress: jsonTx.msg[0].value.delegator_address,
                    validatorAddress: jsonTx.msg[0].value.validator_address,
                    amount: coins(parseInt(jsonTx.msg[0].value.amount.amount), jsonTx.msg[0].value.amount.denom)[0],
                };
                msg = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
                    value: msgUnDelegate,
                };
                fee = {
                    amount: coins(parseInt(jsonTx.fee.amount[0].amount), jsonTx.fee.amount[0].denom),
                    gas: jsonTx.fee.gas,
                };
                break;
            case 'cosmos-sdk/MsgBeginRedelegate':
                if(!jsonTx.msg[0].value.delegator_address) throw Error("Missing delegator_address in msg[0]")
                if(!jsonTx.msg[0].value.validator_src_address) throw Error("Missing validator_src_address in msg[0]")
                if(!jsonTx.msg[0].value.validator_dst_address) throw Error("Missing validator_dst_address in msg[0]")
                if(!jsonTx.msg[0].value.amount.amount) throw Error("Missing amount in msg[0] value.amount[0]")
                from = jsonTx.msg[0].value.delegator_address
                memo = jsonTx.memo
                const msgReDelegate: any = {
                    delegatorAddress: jsonTx.msg[0].value.delegator_address,
                    validatorSrcAddress: jsonTx.msg[0].value.validator_src_address,
                    validatorDstAddress: jsonTx.msg[0].value.validator_dst_address,
                    amount: coins(parseInt(jsonTx.msg[0].value.amount.amount), jsonTx.msg[0].value.amount.denom)[0],
                };
                msg = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
                    value: msgReDelegate,
                };
                fee = {
                    amount: coins(parseInt(jsonTx.fee.amount[0].amount), jsonTx.fee.amount[0].denom),
                    gas: jsonTx.fee.gas,
                };
                break;
            case 'cosmos-sdk/MsgWithdrawDelegatorReward':
                if(!jsonTx.msg[0].value.delegator_address) throw Error("Missing delegator_address in msg[0]")
                if(!jsonTx.msg[0].value.validator_address) throw Error("Missing validator_address in msg[0]")
                if(!jsonTx.msg[0].value.amount.amount) throw Error("Missing amount in msg[0] value.amount[0]")
                from = jsonTx.msg[0].value.delegator_address
                memo = jsonTx.memo
                const msgRewards: any = {
                    delegatorAddress: jsonTx.msg[0].value.delegator_address,
                    validatorAddress: jsonTx.msg[0].value.validator_address,
                    amount: coins(parseInt(jsonTx.msg[0].value.amount.amount), jsonTx.msg[0].value.amount.denom)[0],
                };
                msg = {
                    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
                    value: msgRewards,
                };
                fee = {
                    amount: coins(parseInt(jsonTx.fee.amount[0].amount), jsonTx.fee.amount[0].denom),
                    gas: jsonTx.fee.gas,
                };
                break;
            case 'cosmos-sdk/MsgTransfer':
                if(!jsonTx.msg[0].value.receiver) throw Error("Missing receiver in msg[0]")
                if(!jsonTx.msg[0].value.sender) throw Error("Missing sender in msg[0]")
                if(!jsonTx.msg[0].value.source_channel) throw Error("Missing source_channel in msg[0]")
                if(!jsonTx.msg[0].value.source_port) throw Error("Missing source_port in msg[0]")
                if(!jsonTx.msg[0].value.timeout_height.revision_height) throw Error("Missing revision_height in msg[0] value.timeout_height")
                if(!jsonTx.msg[0].value.token.amount) throw Error("Missing amount in msg[0] value.token[0]")
                const msgTransfer: any = {
                    receiver:jsonTx.msg[0].value.receiver,
                    sender:jsonTx.msg[0].value.sender,
                    sourceChannel:jsonTx.msg[0].value.source_channel,
                    sourcePort:jsonTx.msg[0].value.source_port,
                    token:coins(parseInt(jsonTx.msg[0].value.token.amount), jsonTx.msg[0].value.token.denom)[0],
                    timeoutHeight:{
                        revisionHeight: jsonTx.msg[0].value.timeout_height.revision_height,
                        revisionNumber: jsonTx.msg[0].value.timeout_height.revision_number,
                    }
                };
                from = jsonTx.msg[0].value.sender
                msg = {
                    typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                    value: msgTransfer,
                };
                fee = {
                    amount: coins(parseInt(jsonTx.fee.amount[0].amount), jsonTx.fee.amount[0].denom),
                    gas: jsonTx.fee.gas,
                };
                break;
            case 'osmosis/gamm/swap-exact-amount-in':
                if(!jsonTx.msg[0].value.sender) throw Error("Missing sender in msg[0]")
                if(!jsonTx.msg[0].value.tokenIn) throw Error("Missing tokenIn in msg[0]")
                if(!jsonTx.msg[0].value.tokenOutMinAmount) throw Error("Missing tokenOutMinAmount in msg[0]")
                if(!jsonTx.msg[0].value.routes[0].poolId) throw Error("Missing poolId in msg[0] routes[0]")
                if(!jsonTx.msg[0].value.routes[0].tokenOutDenom) throw Error("Missing tokenOutDenom in msg[0] routes[0]")
                const msgSwap: any = {
                    sender:jsonTx.msg[0].value.sender,
                    tokenIn:coins(parseInt(jsonTx.msg[0].value.tokenIn.amount), jsonTx.msg[0].value.tokenIn.denom)[0],
                    tokenOutMinAmount:jsonTx.msg[0].value.tokenOutMinAmount,
                    routes:[{
                        poolId:jsonTx.msg[0].value.routes[0].poolId,
                        tokenOutDenom:jsonTx.msg[0].value.routes[0].tokenOutDenom
                    }]
                };
                from = jsonTx.msg[0].value.sender
                msg = {
                    typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
                    value: msgSwap,
                };
                fee = {
                    amount: coins(parseInt(jsonTx.fee.amount[0].amount), jsonTx.fee.amount[0].denom),
                    gas: jsonTx.fee.gas,
                };
                break;
            case 'osmosis/gamm/join-pool':
                if(!jsonTx.msg[0].value.sender) throw Error("Missing sender in msg[0]")
                if(!jsonTx.msg[0].value.poolId) throw Error("Missing poolId in msg[0]")
                if(!jsonTx.msg[0].value.shareOutAmount) throw Error("Missing poolId in msg[0]")
                if(!jsonTx.msg[0].value.tokenInMaxs[0].denom) throw Error("Missing tokenOutMinAmount in msg[0] .denom")
                if(!jsonTx.msg[0].value.tokenInMaxs[0].amount) throw Error("Missing tokenOutMinAmount in msg[0] .amount")
                if(!jsonTx.msg[0].value.tokenInMaxs[1].denom) throw Error("Missing tokenOutMinAmount in msg[1] .denom")
                if(!jsonTx.msg[0].value.tokenInMaxs[1].amount) throw Error("Missing tokenOutMinAmount in msg[1] .amount")

                const msgLpAdd: any = {
                    sender:jsonTx.msg[0].value.sender,
                    poolId:jsonTx.msg[0].value.poolId,
                    shareOutAmount:jsonTx.msg[0].value.shareOutAmount,
                    tokenInMaxs:[
                        coins(parseInt(jsonTx.msg[0].value.tokenInMaxs[0].amount), jsonTx.msg[0].value.tokenInMaxs[0].denom)[0],
                        coins(parseInt(jsonTx.msg[0].value.tokenInMaxs[1].amount), jsonTx.msg[0].value.tokenInMaxs[1].denom)[0],
                    ]
                };
                from = jsonTx.msg[0].value.sender
                msg = {
                    typeUrl: "/osmosis.gamm.v1beta1.MsgJoinPool",
                    value: msgLpAdd,
                };
                fee = {
                    amount: coins(parseInt(jsonTx.fee.amount[0].amount), jsonTx.fee.amount[0].denom),
                    gas: jsonTx.fee.gas,
                };
                break;
            case 'osmosis/gamm/exit-pool':
                if(!jsonTx.msg[0].value.sender) throw Error("Missing sender in msg[0]")
                if(!jsonTx.msg[0].value.poolId) throw Error("Missing poolId in msg[0]")
                if(!jsonTx.msg[0].value.shareOutAmount) throw Error("Missing poolId in msg[0]")
                if(!jsonTx.msg[0].value.tokenInMaxs[0].denom) throw Error("Missing tokenOutMinAmount in msg[0] .denom")
                if(!jsonTx.msg[0].value.tokenInMaxs[0].amount) throw Error("Missing tokenOutMinAmount in msg[0] .amount")
                if(!jsonTx.msg[0].value.tokenInMaxs[1].denom) throw Error("Missing tokenOutMinAmount in msg[1] .denom")
                if(!jsonTx.msg[0].value.tokenInMaxs[1].amount) throw Error("Missing tokenOutMinAmount in msg[1] .amount")

                const msgLpRemove: any = {
                    sender:jsonTx.msg[0].value.sender,
                    poolId:jsonTx.msg[0].value.poolId,
                    shareInAmount:jsonTx.msg[0].value.shareOutAmount,
                    tokenOutMins:[
                        coins(parseInt(jsonTx.msg[0].value.tokenInMaxs[0].amount), jsonTx.msg[0].value.tokenInMaxs[0].denom)[0],
                        coins(parseInt(jsonTx.msg[0].value.tokenInMaxs[1].amount), jsonTx.msg[0].value.tokenInMaxs[1].denom)[0],
                    ]
                };
                from = jsonTx.msg[0].value.sender
                msg = {
                    typeUrl: "/osmosis.gamm.v1beta1.MsgExitPool",
                    value: msgLpRemove,
                };
                fee = {
                    amount: coins(parseInt(jsonTx.fee.amount[0].amount), jsonTx.fee.amount[0].denom),
                    gas: jsonTx.fee.gas,
                };
                break;
            case 'osmosis/lockup/lock-tokens':
                if(!jsonTx.msg[0].value.owner) throw Error("Missing owner in msg[0]")
                if(!jsonTx.msg[0].value.duration) throw Error("Missing duration in msg[0]")
                if(!jsonTx.msg[0].value.coins[0].denom) throw Error("Missing coins in msg[0] .denom")
                if(!jsonTx.msg[0].value.coins[0].amount) throw Error("Missing coins in msg[0] .amount")

                const msgLpStake: any = {
                    owner:jsonTx.msg[0].value.owner,
                    duration:jsonTx.msg[0].value.poolId,
                    coins:[
                        coins(jsonTx.msg[0].value.coins[0].amount, jsonTx.msg[0].value.coins[0].denom)[0],
                    ]
                };
                from = jsonTx.msg[0].value.owner
                msg = {
                    typeUrl: "/osmosis.lockup.MsgLockTokens",
                    value: msgLpStake,
                };
                fee = {
                    amount: coins(parseInt(jsonTx.fee.amount[0].amount), jsonTx.fee.amount[0].denom),
                    gas: jsonTx.fee.gas,
                };
                break;
            case 'osmosis/lockup/begin-unlock-period-lock':
                if(!jsonTx.msg[0].value.owner) throw Error("Missing owner in msg[0]")

                const msgLpStakeRemove: any = {
                    owner:jsonTx.msg[0].value.owner
                };
                from = jsonTx.msg[0].value.owner
                msg = {
                    typeUrl: "/osmosis.lockup.MsgBeginUnlockingAll",
                    value: msgLpStakeRemove,
                };
                fee = {
                    amount: coins(parseInt(jsonTx.fee.amount[0].amount), jsonTx.fee.amount[0].denom),
                    gas: jsonTx.fee.gas,
                };
                break;
            default:
                throw Error("Unhandled tx type! type: "+txType)
        }
        if(!from) throw Error("Failed to parse from address!")
        if(!msg) throw Error("Failed to parse msg!")
        if(!fee) throw Error("Failed to parse fee!")
        return {msg,from,fee,memo}
    }catch(e){
        // @ts-ignore
        throw Error(e)
    }
}