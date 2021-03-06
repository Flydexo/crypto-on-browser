const NodeRSA = require("node-rsa");

module.exports = class Transaction{
    constructor(from, to, amount, id){
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.signature;
        this.id = id;
    }

    verify(blockchain){
        if(this.amount <= 0){
            console.log("error: amount cannot be zero");
            return false;
        }
        if(this.from === this.to){
            console.log("error: same sender and reciever")
            return false;
        }
        if(this.from === "system"){
            return true;
        }else{
            if(!this.to || !this.from){
                console.log("missing from or too address")
                return false;
            }
            const key = new NodeRSA();
            key.importKey(this.from, "pkcs8-public-pem");
            let isValid = key.verify(this.toString(), this.signature);
            if(!isValid){
                console.log("signature invalid")
                return false;
            }
            let balance = 0;
            blockchain.chain.forEach(block => {
                block.transactions.filter(tx => tx.from.trim() == this.from || tx.to.trim() == this.from).forEach(tx => {
                    if(tx.from.trim() == this.from){
                        balance -= tx.amount;
                    }else if(tx.to.trim() == this.from){
                        balance += tx.amount;
                    }
                })
            })
            blockchain.pendingTransactions.filter(tx => tx.from.trim() == this.from || tx.to.trim() == this.from).forEach(tx => {
                if(tx.from.trim() == this.from){
                    balance -= tx.amount;
                }else if(tx.to.trim() == this.from){
                    balance += tx.amount;
                }
            })
            if(balance < this.amount){
                console.log("transaction failed: not enough money, actual balance:", balance, "amount required:", this.amount)
                return false;
            }
            return isValid;
        }
    }

    sign(signature){
        this.signature = signature;
    }

    toString(){
        return JSON.stringify({from: this.from, to: this.to, amount: this.amount})
    }

    isInBlock(blockchain){
        if(blockchain.lastTransactionId >= this.id) return true
        return false
    }
}