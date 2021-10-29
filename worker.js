const crypto = require("crypto-js");

onmessage = (e) => {
    const {type, data} = e.data;
    if(type === "mine"){
        const {nonce, miner, blockchain, block} = data;
        block.miner = miner;
        console.log("Starting to mine ⛏")
        let success = false;
        let solution = 0;
        while(!success){
            block.nonce = nonce+solution;
            block.timestamp = Date.now();
            const attemp = crypto.SHA256(JSON.stringify(block)).toString();
            solution += 1;
            if(attemp.substr(0, 4) === "0000"){
                console.log("Mining successful ⛏", attemp, Date.now())
                block.nonce = nonce+solution;
                block.hash = attemp;
                postMessage({type: "block:mined", data: JSON.parse(JSON.stringify(block))})
                break;
            }
        }
    }
}