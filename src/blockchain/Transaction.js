const NodeRSA = require("node-rsa");

module.exports = class Transaction{
    constructor(from, to, amount){
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.signature;
    }

    verify(blockchain){
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
                block.transactions.filter(tx => tx.from == this.from || tx.to == this.from).forEach(tx => {
                    if(tx.from == this.from){
                        balance -= tx.amount;
                    }else if(tx.to == this.from){
                        balance += tx.amount;
                    }
                })
            })
            blockchain.pendingTransactions.filter(tx => tx.from == this.from || tx.to == this.from).forEach(tx => {
                if(tx.from == this.from){
                    balance -= tx.amount;
                }else if(tx.to == this.from){
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
}