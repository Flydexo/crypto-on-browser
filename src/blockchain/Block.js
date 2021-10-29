const crypto = require("crypto-js");
const Transaction = require("./Transaction");
import {worker} from "../../blockchain"

export default class Block{
    constructor(id, prevHash = "", transactions){
        this.id = id;
        this.prevHash = prevHash;
        this.transactions = transactions;
        this.timestamp = Date.now();
        this.nonce = 0;
        this.hash = this.createHash()
        this.miner = "";
    }

    createHash(){
        const hash = crypto.SHA256(JSON.stringify(this)).toString();
        return hash
    }

    // mine(nonce, miner, blockchain){
    //     this.miner = miner;
    //     console.log("Starting to mine ⛏")
    //     let success = false;
    //     let solution = 0;
    //     while(!success){
    //         this.nonce = nonce+solution;
    //         this.timestamp = Date.now();
    //         const attemp = crypto.SHA256(JSON.stringify(this)).toString();
    //         solution += 1;
    //         if(attemp.substr(0, 4) === "0000"){
    //             console.log("Mining successful ⛏", attemp, Date.now(), this.createHash())
    //             this.nonce = nonce+solution;
    //             this.hash = attemp;
    //             blockchain.pendingTransactions = []
    //             return this.hash;
    //         }
    //     }
    //     console.log("Mining stopped 🛑")
    //     return true
    // }

    mine(nonce, miner, blockchain){
        console.log("worker start")
        worker.postMessage({type: "mine", data: {nonce, miner, blockchain: JSON.parse(JSON.stringify(blockchain)), block: JSON.parse(JSON.stringify(this))}})
    }

    hasValidTransactions(blockchain){
        this.transactions.forEach(tx => {
            if(!tx.verify(blockchain)){
                return false
            }
        });
    }
}