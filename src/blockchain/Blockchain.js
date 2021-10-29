import blockchain, { sendToPeers, wallet } from "../../blockchain";
import Transaction from "./Transaction";
import Block from "./Block"
import { worker, socket } from "../../blockchain";
const events = require("events")

export default class Blockchain{
    constructor(chain = [], pendingTransactions = []){
        this.chain = chain;
        this.pendingTransactions = pendingTransactions;
        this.events = new events.EventEmitter();
    }

    getLastBlock(){
        return this.chain[this.chain.length -1]
    }

    addTransaction(transaction, miner){
        if(transaction.verify(this)){
            this.pendingTransactions.push(transaction);
            this.events.emit("tx", transaction);
            if(transaction.from == "system" && transaction.to == miner){
                if(this.getLastBlock().miner == miner){
                    sendToPeers("transaction", transaction)
                }
            }else{
                sendToPeers("transaction", transaction)
            }
            if(this.pendingTransactions.length >= 3){
                console.log("length > 3")
                this.addBlock(this.pendingTransactions, miner);
            }
        }
    }

    addBlock(pendingTransactions, miner){
        console.log("add Block")
        let isValid = true;
        pendingTransactions.forEach(tx => {
            if(!tx.verify(this)){
                return false
            }
        });
        if(isValid){
            if(this.chain.length < 1){
                const block = new Block(this.chain.length, "", pendingTransactions);
                block.mine(Math.round(Math.random()*9999999), miner, this);
                worker.onmessage = (e) => {
                    if(e.data.type == "block:mined"){
                        block.timestamp = e.data.data.timestamp;
                        block.nonce = e.data.data.nonce;
                        block.hash = e.data.data.hash;
                        block.miner = e.data.data.miner;
                        this.pendingTransactions = [];
                        this.chain.push(block);
                        this.events.emit("block", block);
                        sendToPeers("block", block)
                        this.addTransaction(new Transaction("system", wallet.publicKey, 10), wallet.publicKey)
                    }
                }
            }else{
                const block = new Block(this.chain.length, this.chain[this.chain.length - 1].hash, pendingTransactions);
                block.mine(Math.round(Math.random()*9999999), miner, this)
                worker.onmessage = (e) => {
                    if(e.data.type == "block:mined"){
                        console.log("block mined")
                        block.timestamp = e.data.data.timestamp;
                        block.nonce = e.data.data.nonce;
                        block.hash = e.data.data.hash;
                        block.miner = e.data.data.miner;
                        console.log(this.chain.map(c => [c.transactions.map(tx => {
                            return {type: tx.from == wallet.publicKey ? "withdraw" : "deposit", amount: tx.amount, other: tx.from == wallet.publicKey ? tx.to === "system" ? "system" : "unknown" : tx.from === "system" ? "system" : "unknown"}
                        })]))
                        this.pendingTransactions = [];
                        this.chain.push(block);
                        this.events.emit("block", block);
                        sendToPeers("block", block)
                        socket.emit("block", blockchain.chain);
                        this.addTransaction(new Transaction("system", wallet.publicKey, 10), wallet.publicKey)
                    }
                }
            }
        }else{
            console.log("not valid")
        }
        return 
    }

    getAllCoins(){
        let coins = 0;
        this.chain.forEach(b => {
            b.transactions.forEach(tx => {
                if(tx.from === "system"){
                    coins += tx.amount;
                }
            })
        })
        return coins;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const block = this.chain[i];
            const lastBlock = this.chain[i-1];
            if(block.prevHash != lastBlock.hash){
                return false;
            }
            if(block.hash != block.createHash()){
                return false;
            }
            block.transactions.forEach(tx => {
                if(!tx.verify()) return false;
            })
            return true
        }
    }
}