import Wallet from "./src/blockchain/Wallet";
import Blockchain from "./src/blockchain/Blockchain"
import events from "events"
import Transaction from "./src/blockchain/Transaction";
import Block from "./src/blockchain/Block";
import { SHA256 } from "crypto-js";
const io = require("socket.io-client");
export let addresses = [];
export let socket = io.io("http://localhost:3000");
export const addressesEvent = new events.EventEmitter();
export let blockchain = new Blockchain();
let connections = new Map();
let sockets = [];

export const sendMoney = (toPublicKey, amount) => {
    const transaction = new Transaction(wallet.publicKey, toPublicKey, amount);
    wallet.signTransaction(transaction);
    blockchain.addTransaction(transaction, wallet.publicKey);
}

export const sendToPeers = (type, data) => {
    console.log("send to peers")
    const str = JSON.stringify({type: type, data: data});
    connections.forEach(c => {
        c.channel.send(str)
    })
}

export default (username) => {
    return new Promise((resolve, reject) => {
        socket.emit("login")
        socket.on("setup", async (config, allblockchain, localAddresses) => {
            blockchain = new Blockchain(allblockchain);
            blockchain.events.emit("initWallet", wallet.getBalance(blockchain))
            addresses = localAddresses ? localAddresses : [];
            socket.emit("address", wallet.publicKey, username)
            if(config.sockets){
            sockets = config.sockets.filter(s => s!=socket.id);
            sockets.forEach(s => {
                connections.set(s, new RTCPeerConnection())
                const connection = connections.get(s);
                let channel = connection.createDataChannel("sendChannel");
                channel.onmessage =e =>  {
                    const message = JSON.parse(e.data);
                    if(message.type === "transaction"){
                        handleTransaction(message)
                    }else if(message.type == "block"){
                        handleBlock(message)
                    }
                }
                // channel.onopen = e => console.log("open!!!!");
                // channel.onclose = e => console.log("closed!!!!!!");
                connection.channel = channel
                connection.createOffer().then(o => {
                        connection.setLocalDescription(o)
                        socket.emit("offer", o, s)
                })
            })
            }
            resolve(blockchain);
        });
        socket.on("offer", async (offer, socketID) => {
            sockets.push(socketID);
            connections.set(socketID, new RTCPeerConnection())
            const connection = connections.get(socketID);
            connection.ondatachannel= e => {

                let channel = e.channel;
                channel.onmessage =e =>  {
                    const message = JSON.parse(e.data);
                    if(message.type === "transaction"){
                        handleTransaction(message)
                    }else if(message.type == "block"){
                        handleBlock(message)
                    }

                }
                // channel.onopen = e => console.log("open!!!!");
                // channel.onclose = e => console.log("closed!!!!!!");
                connection.channel = channel;

            }
            connection.setRemoteDescription(offer)
            let alreadyAnswered = false;
            connection.onicecandidate = e =>  {
                if(alreadyAnswered) return;
                alreadyAnswered = true;
                socket.emit("answer", connection.localDescription, socketID)
            }
            await connection.createAnswer().then(a => {
                connection.setLocalDescription(a)
                // socket.emit("answer", a, socketID)
            })
        })
        socket.on("answer", (answer, socketID) => {

            connections.get(socketID).setRemoteDescription(answer)
        })
    })
}

export const wallet = new Wallet(atob(location.hash.split("#")[1]));
// const transaction = new Transaction("system", wallet.publicKey, 100);
// wallet.signTransaction(transaction)
// blockchain.addTransaction(transaction)

function handleTransaction(message){
    const tx = new Transaction(message.data.from, message.data.to, message.data.amount);
    if(tx.from !== "system"){
        tx.sign(message.data.signature.data)
    }
    blockchain.pendingTransactions.push(tx)
    if(blockchain.pendingTransactions.length >= 3){
        blockchain.addBlock(blockchain.pendingTransactions, wallet.publicKey)
    }
    blockchain.events.emit("tx", tx)
}

function handleBlock(message){
    console.log("handleBlock")
    if(message.data.hash.substr(0, 4) === "0000"){
        if(message.data.id == blockchain.getLastBlock().id){
            if(message.data.timestamp > blockchain.getLastBlock().timestamp){
                // socket.emit("block", blockchain.chain);
                // blockchain.addTransaction(new Transaction("system", wallet.publicKey, 10), wallet.publicKey)
            }else{
                blockchain.chain.pop()
                for(let i = 0; i<blockchain.pendingTransactions.length; i++){
                    let p = blockchain.pendingTransactions[i];
                    if(p.from === "system" && p.to === wallet.publicKey){
                        blockchain.pendingTransactions.splice(i, 1)
                        i = i--;
                    }
                }
                createBlock(message)
            }
        }else{
            createBlock(message)
        } 
    }else{
        alert("Mining not completed")
    }
}

function createBlock(message){
    const block = new Block(message.data.id, message.data.prevHash, message.data.transactions);
    block.hash = message.data.hash;
    block.nonce = message.data.nonce;
    block.timestamp = message.data.timestamp;
    message.data.transactions.forEach((tx, i) => {
        block.transactions[i].signature = tx.signature
    })
    block.createHash();
    if(block.hash == message.data.hash){
            // if(block.hasValidTransactions(blockchain)){
        blockchain.chain.push(block);
            // }else{
            //     alert("invalid transactions")
            // }
        blockchain.events.emit("block", block)
    }else{
        alert("Hash not correct")
    }
}