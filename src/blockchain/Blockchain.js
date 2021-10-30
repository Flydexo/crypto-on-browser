import blockchain, { sendToPeers, wallet } from "../../blockchain";
import Transaction from "./Transaction";
import Block from "./Block"
import {socket} from "../../blockchain";
const events = require("events")

export default class Blockchain{
    constructor(chain = [], pendingTransactions = []){
        this.chain = chain;
        this.pendingTransactions = pendingTransactions;
        this.events = new events.EventEmitter();
        this.lastTransactionId = this.chain.length >= 1 ? this.chain[this.chain.length - 1].transactions[this.chain[this.chain.length - 1].transactions.length - 1].id : 0;
    }

    getNewTransactionId(){
        return this.lastTransactionId+this.pendingTransactions.length+1;
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
                this.addBlock(this.pendingTransactions, miner);
            }
        }
    }

    addBlock(pendingTransactions, miner){
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
                this.pendingTransactions = [];
                this.chain.push(block);
                this.events.emit("block", block);
                sendToPeers("block", block)
                this.addTransaction(new Transaction("system", wallet.publicKey, 10, this.getNewTransactionId()), wallet.publicKey)
            }else{
                const block = new Block(this.chain.length, this.chain[this.chain.length - 1].hash, pendingTransactions);
                block.mine(Math.round(Math.random()*9999999), miner, this);
                this.lastTransactionId = pendingTransactions[pendingTransactions.length - 1].id;
                this.pendingTransactions = [];
                this.chain.push(block);
                this.events.emit("block", block);
                sendToPeers("block", block)
                // socket.emit("block", blockchain.chain);
                this.addTransaction(new Transaction("system", wallet.publicKey, 10, this.getNewTransactionId()), wallet.publicKey)
            }
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