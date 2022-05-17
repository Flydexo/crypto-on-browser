import Wallet from "./src/blockchain/Wallet";
import Blockchain from "./src/blockchain/Blockchain"
import events from "events"
import Transaction from "./src/blockchain/Transaction";
import Block from "./src/blockchain/Block";
import { SHA256 } from "crypto-js";
const io = require("socket.io-client");
export let addresses = [];
export let socket;
if(document.location.hash.includes("LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2Z0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktnd2dnU2tBZ0VBQW9JQkFRREVuR0E5V0oxMUFtTWcKbEJRQ0IwZFRrK2JtNWd2a2k0WTFHU3pBQzFMNWI4NEtLVzRPckVFcFhSSVQ0bUFOUmt1aml3ZHRlVVZGY1BQTQp4UnpUMUFkaTduVmtidTUzMzBMUi9Na3htUUhyQy9sMDFFeHUzU2I5Y1pkeW0yck9vdldtTXFndUNVR0lxRGQ5Ck1SWlNNNlEzSnJ1RWs5Qjl0MGlyZjROMFk0U2tZSWxZMGFUYk9CemlYM045NlA5UnFCQWs1eUJQK2s2bXJJMGQKV1Y5bEF3SDl4VmhtWVFHMGp6ZGZ2QmJrc3RNTDArOW92bWM0M203c1dUQy9Va1h1cC9IMysrNHFHRFJqTHd5YgpPSEpRenE5VlF4MFRCQlE3QUhzVGdtMXdkSHV1d21hMndNSTkwS0ZGOEQzeDZBL2UrZzFwc2hFQk5XNHVOUEI0Clloa2FEenFmQWdNQkFBRUNnZ0VBUzQrWndSbmtjY3E0RkJZMDFrNjd6OWdndm82YzlYblYyMlJRZVlJZ29uS2cKcWZFZ05nMW5nYUVlU0h3UTFDazIrcVI4OTByTEg1UDRick0ya0FhRnpEUys4eGxiRnNDOEtuM1BTUHQzN0VDTwozNktUdVd2UEIwcDNuUGswQkRSRzJsZlBvTm0zMFBCdFd2VFprai84bGFHU0liSzVSd2VBcTBCM1lleTVWbjZCCjE2ZnhhU2JyU2VMcVljc0xwMEFKR2NiVFBhK2FTTHJoc1d1a0FHREJTUGU5bitCZ1hPSXJyRFNxK285NTEyVjcKeE9qbGEzQ1pLb2hZVmJIemhEUEpIdHljMndtbGhkUmwwVFVjRS9CdjhpTk1KbzFtNXNhZkdMMDJGcmF2Vm90TApWVVNzaGhDM0tya2ljQkhieE12Y1h0R1pkbklPM1Z2REF4OEJrYUYrUVFLQmdRRDdpTE9TbEU5cE1tUGhKVkM0Ci85eG1xbEYwWWdrNXhKYmlHOUIyRnVTdlh5OC95UGFwbVc1VjA0NldwdGJFYzljWHBhazM3Y0ROcUpRRmx3S3cKbUdtbUJvYjNIWHNyQ0FxYkphdm9GazBsMTJXRDdRTS9XSEtrcU1XQkVsNW8rQnFVb2ZKWlVWYXlHdFI2eU5pbApZZzJsV05RUkgvZVpTdGI0ZzBaODJqN1ZvUUtCZ1FESUdnZzFRQkMyaG5EQ2NlaXdBR0tpVmVJZjlNaWVmV055CjFqa0VxcGUrdDFYWCtkWWUyWU82N2ttQU5YV2tCcGEycWdXVVpyWHpoVHNzZFVKb243OENpdVViWmpHT2x6anYKOXNqZTBxS1hhNjRISlAzTVVKL2ozRGN5bWZHMHRGOVZHVzVLa1F5RzRhNUxjbkRyclBPMmRDWXcvZURaTVlXTApGNko2c1Flb1B3S0JnUUNoMzVldy9VRWRzaEFWRks2ZVlBcTNCMlRrUVRNdXVoVmY3Z1o1K01HekdzNk5mZ2MvCm5qNGpmY0tGc1ZrRmxJY1g4TVMxK1l2YXptSjBObnJFcTFGU1IyRVVKeVRjekpBR3lIZVpKTUVCV1YwN1NZeU4KZDU1UDJVMUJnMUMrdk94ZU90cDhJSnhxZ2xtN3F3WEJhUmpmRUF0cCtlaWQva3ZhSXFGNk4vbTRBUUtCZ1FDeQpHWkZ5cStuME8yYkRlcFZMaVp4QXRzWkVBU0JMQ0hscWJjZGtJdDViRGx6bWxXVUNJa0hBTUhUVkd6L3cxVGh4CnJwUzJ5RkJzUmdvc0FOWXh2dlZJc3cxR1BNZ2hEUEhOaTA2d0hMUkFwOFBHY2lNL0pnZVp6SmlJZmtLR3Z3QVgKQTBLS05kMzdjNFVwZTl1THVHMVcyTHhoWUtZdlNvZDlESFUrVkxEbkN3S0JnRHZ4ck8vK2JyOERPc0lTNzRsVQpCWU5XcDdiby9vWTZST2drY2wxMVZ5SFgxdTNWSWxJUnMvT3Y3aUZUOTh6aU5jeUxhbG9oUTRrZ0dwVnphWDF6ClpXaEUrV0gwQ3loamtxaUdodWdCbk9SZGEwYlUvemh3eXE5am16cjYyT1lGWXF1aXloa2E2TEIzZFRkaGxvUVAKNGVMY0VpMG5rSUZQZXE0S2NKNTJCc3dhCi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0=")){
    socket = io.io("http://localhost:3000");
    main();
}else{
    socket = io.io("http://192.168.1.44:3000");
    main();
}
export const addressesEvent = new events.EventEmitter();
export let blockchain = new Blockchain();
export let worker = new Worker(
    new URL('./worker.js', import.meta.url),
    {type: 'module'}
);
export let users = [];

export const getUsername = (publicKey) => {
    console.log(publicKey)
    let username = "unknown";
    users.forEach(addr => {
        console.log(addr.name, addr.key == publicKey)
        if(addr.key === publicKey){
            username = addr.name;
        }
    })
    return username;
}

function handleTransaction(message){
    const tx = new Transaction(message.data.from, message.data.to, message.data.amount, blockchain.getNewTransactionId());
    if(tx.from !== "system"){
        tx.sign(message.data.signature.data)
    }
    if(tx.from == "system" && tx.to != wallet.publicKey && blockchain.getLastBlock().miner != tx.to){
        return
    }else{
        blockchain.pendingTransactions.push(tx)
        if(blockchain.pendingTransactions.length >= 3){
            blockchain.addBlock(blockchain.pendingTransactions, wallet.publicKey)
        }
        blockchain.events.emit("tx", tx)
    }
}

function handleBlock(message){
    if(message.data.hash.substr(0, 4) === "0000"){
        if(message.data.id == blockchain.getLastBlock().id + 1){
            worker.terminate()
            worker = new Worker(
                new URL('./worker.js', import.meta.url),
                {type: 'module'}
            )
            createBlock(message)
        }
        // if(message.data.id == blockchain.getLastBlock().id){
        //     if(message.data.timestamp > blockchain.getLastBlock().timestamp){
        //         // socket.emit("block", blockchain.chain);
        //         // blockchain.addTransaction(new Transaction("system", wallet.publicKey, 10), wallet.publicKey)
        //     }else{
        //         blockchain.chain.pop()
        //         for(let i = 0; i<blockchain.pendingTransactions.length; i++){
        //             let p = blockchain.pendingTransactions[i];
        //             if(p.from === "system" && p.to === wallet.publicKey){
        //                 blockchain.pendingTransactions.splice(i, 1)
        //                 i = i--;
        //             }
        //         }
        //         createBlock(message)
        //     }
        // }else{
        //     createBlock(message)
        // } 
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
    block.miner = message.data.miner;
    if(block.hash == message.data.hash){
            // if(block.hasValidTransactions(blockchain)){
        blockchain.chain.push(block);
        blockchain.setLastTransactionId();
            // }else{
            //     alert("invalid transactions")
            // }
        blockchain.events.emit("block", block)
    }else{
        alert("Hash not correct")
    }
}

export const sendMoney = (toPublicKey, amount) => {
    const transaction = new Transaction(wallet.publicKey, toPublicKey, amount, blockchain.getNewTransactionId());
    wallet.signTransaction(transaction);
    blockchain.addTransaction(transaction, wallet.publicKey);
}

export const sendToPeers = (type, data) => {
    const str = JSON.stringify({type: type, data: data});
    connections.forEach(c => {
        c.channel.send(str)
    })
}

export default (username) => {
    return new Promise((resolve, reject) => {
        socket.emit("login")
        socket.on("setup", async (config, allblockchain, localAddresses) => {
            console.log("setup", config, allblockchain, localAddresses)
            blockchain = new Blockchain(allblockchain);
            blockchain.events.emit("initWallet", wallet.getBalance(blockchain))
            addresses = localAddresses ? localAddresses : [];
            socket.emit("address", wallet.publicKey, username)
            if(config.sockets){
            sockets = config.sockets.filter(s => s!=socket.id);
            sockets.forEach(s => {
                connections.set(s, new RTCPeerConnection({
                    iceServers: [
                    {
                        username: "test",
                        credential: "test123",
                        urls: ['stun:stun.l.google.com:19302'],
                        iceTransportPolicy:"all",
                    },
                    ],
                }))
                const connection = connections.get(s);
                connection.onicecandidateerror = (e) => {
                    console.log("error", e)
                }
                let channel = connection.createDataChannel("sendChannel");
                channel.onmessage =e =>  {
                    const message = JSON.parse(e.data);
                    if(message.type === "transaction"){
                        handleTransaction(message)
                    }else if(message.type == "block"){
                        handleBlock(message)
                    }
                }
                channel.onopen = e => console.log("open!!!!");
                channel.onclose = e => console.log("closed!!!!!!");
                channel.onerror = e => console.log("error", e);
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
            console.log("offer", offer, socketID)
            sockets.push(socketID);
            connections.set(socketID, new RTCPeerConnection({
                iceServers: [
                {
                    username: "test",
                    credential: "test123",
                    urls: ['stun:stun.l.google.com:19302', 'turn:163.172.183.78:3478'],
                    iceTransportPolicy:"all",
                },
                ],
            }))
            const connection = connections.get(socketID);
            connection.ondatachannel= e => {

                let channel = e.channel;
                console.log("channel", channel)
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
            console.log("answer", answer, socketID)
            connections.get(socketID).setRemoteDescription(answer)
        })
    })
}

export const wallet = new Wallet(atob(location.hash.split("#")[1]));

export const isConcernedByTransaction = (publicKey, transaction) => {
    if(transaction.from === publicKey || transaction.to === publicKey) return true
    return false
}

let connections = new Map();
let sockets = [];

function main(){

    socket.on("address", addresses => {
        users = addresses;
    })
}