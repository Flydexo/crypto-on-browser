import NodeRSA from "node-rsa";
export default class Wallet{
    constructor(privateKey = null){
        if(privateKey != null){
            const key = new NodeRSA(privateKey);
            this.publicKey = key.exportKey("pkcs8-public-pem");
            this.privateKey = privateKey;
        }
    }

    signTransaction(transaction){
        const key = new NodeRSA(this.privateKey);
        const signature = key.sign(transaction.toString());
        transaction.sign(signature)
    }
    
    getBalance(blockchain){
        let balance = 0;
        blockchain.chain.forEach(block => {
            block.transactions.filter(tx => tx.from == this.publicKey || tx.to == this.publicKey).forEach(tx => {
                if(tx.from == this.publicKey){
                    balance -= tx.amount;
                }else if(tx.to == this.publicKey){
                    balance += tx.amount;
                }
            })
        })
        blockchain.pendingTransactions.filter(tx => tx.from == this.publicKey || tx.to == this.publicKey).forEach(tx => {
            if(tx.from == this.publicKey){
                balance -= tx.amount;
            }else if(tx.to == this.publicKey){
                balance += tx.amount;
            }
        })
        return balance
    }
}