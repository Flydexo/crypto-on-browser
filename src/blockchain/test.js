// const Block = require("./Block");
// const Transaction = require("./Transaction")
// const Blockchain = require("./Blockchain");
// const Wallet = require("./Wallet");

// const wallet = new Wallet();
// const wallet2 = new Wallet();
// const blockchain = new Blockchain();
// blockchain.addTransaction(new Transaction("system", wallet.publicKey, 100000), wallet.publicKey)
// const transaction = new Transaction(wallet.publicKey, wallet2.publicKey, 100)
// wallet.signTransaction(transaction)
// const transaction2 = new Transaction(wallet2.publicKey, wallet.publicKey, 2)
// wallet2.signTransaction(transaction2)
const NodeRSA = require("node-rsa");

// blockchain.addTransaction(transaction, wallet.publicKey)
// blockchain.addTransaction(transaction2, wallet.publicKey)
// console.log("Wallet 1", wallet.getBalance(blockchain));
// console.log("Wallet 2", wallet2.getBalance(blockchain));

const keypair = new NodeRSA().generateKeyPair()
      
const privateKey = keypair.exportKey("private")
// //         const publicKey = keypair.exportKey("public");

// // console.log(publicKey)
console.log(`http://localhost:1234/#${btoa(privateKey)}`)


// const key = new NodeRSA(`-----BEGIN RSA PRIVATE KEY-----
// MIIEpQIBAAKCAQEAj8SMYHS5vZcKeu5lmApncQWpTB8bCMMIK2Sh0i5EIlA9OOC4
// FBB0UR13hk6vsIBQGQdtpXQzLKoh/s6Kb2jFLcFX+bxg97XXdjpeKevwhz4MlGV6
// 8GggQHwCstL2FCnfKAOY/OWySRE4GOeSvhRF4JnHwLNs+kxdHAN23KSdldyiBumG
// ZW5uG4OeIdhaAHHl5nAs2J2mNXVzY/fUDN/vJ+BskOKorpdzPMs2pxwSW2GlbNWm
// H1Ij8m21NNZtkfcrY4+4dWqHPgYZS574nc1pyDpXwdRTRy6+4Hx9HezAI2p5JfrH
// ykmEYVr34CQLAh6MeONnTXxWAiZN/eOfoQ8pPwIDAQABAoIBAQCB+L6vtNb2f0YK
// PNu7yCwcEXIsTzKxiSApmqBw00LlgoTWltHT0cxWSL11vk0208mV1xFZMuPQzT5O
// jYq5jY40/0X5kERZrRtM1xep7pNUsNPOlK/AB2Kg6XvHDtFJCVGlaxs0BrRXOins
// 2e3fyZQiqOPdYlhzL/Y9DSS39FpC0AkC6iYQHOfYWAwQdv5DMcEwOHmMgROjbQdc
// QSZsKB+ngfh171PFO3wuzDl6/jQOgt/KPqnDaynmibTbw33AsUF0NYQranvO/X5h
// ZE84z+Fp94hucQdViQPVlSKf6db5oZRzaV3pDzm0axpalPEbVq5Rxicef/noy4oi
// +8DB/dSBAoGBAMJqbEplt8WElVH6pF+/PleGbo1f3A4LRVndRJwNOw7HRenLLSGl
// kj07JVDKp7Iku9D6vYNkwReuOFzh1lItXzSVQ8A+kCukTzoLJlcBdNexMRYnrR5e
// ziR0kGT2gQ6ggPK3MiJnDhvvN6zrtss5M+9tJRHFmVO8gjsJaDGEccztAoGBAL1O
// +jAzsFVC7z8M2aBEuiOxrhFhsGEvO1Jh9B+JgHYfDu5g4RvKQCzn0zalh5lU5exy
// hAkAk8F1ADOXRJOqoTf5i0Jj3Uygcv6koi16wEuZzCHYH+w4bpjEuDWDhXNGzG2p
// WVYDJj3GY/AFKPbZIQxzs02y214uY32z9Jq2X3VbAoGBAKX6k69EfgtcMNsHX/P6
// Yu/4bkO2VjmLN88Lz/pmdUgdqrt54XL7Vwl9iFMcYOT+5XX5y3f0ucFM1QO/LumD
// oOdUk735673GjnkgccAQFz/aH+0pPGxURivrdCcuKGpjbxNIgb3LO8lvhpnTt4By
// ursq9F3i1A8gPhLG6jR0PW/VAoGASGBJhuQ8JlzQ22ouSff8smjcBAk1RfKo23ZX
// vzbyxjZZnwmrBtTsdD6todbnYNf0j9G4aTivROdWjGLo9QvnV18wvtEvanxteq22
// 02x62GyUftwCWG262u1bABqoisomnkaAwUGy/Ss8Sieu4bFh0UDq7GnVNMzHfOew
// PPY8yMECgYEAuXJ1vOfrpEE9bVZ+hiNhUhACOqEaPD2EmBWrLOI6BjyzNSv2Df3w
// zKzhFEZDNmI+wupK3wixpp1jxFUyNPchwC+Hj9xpPtovTL6ociSHtDIYCZ8QfkEf
// I5xyQEuR5caED4aCWL8ztoOCbWrRR+2M7JM7P5VuPRcRyI6r4NYodPc=
// -----END RSA PRIVATE KEY-----`);
// const signature = key.sign(`{"from":"-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuXaRYQjGwt/9wrc9sqd1\nHSe3yIWsma/dnpRYclbtSrjc6tLQBTPG3Ji3wwYPgTKZyyI2FyOHQRlHgf4WOLVL\nk3SSP9yAgJJasBZGneaZ2uX1zlaWFqfzZAaTg3MkUeBsVjG8bxZImVkLGwXmsC/V\nuE3XCRcTjsx6Qrr1RkDY0O2l7Hmwk5HXCvz3cO4p7a5l+9OUBw6v0zGfvyuzK4R7\nZUlt4LUtDKUM7uv/n58WVBrw+L1gbWtoqyc57YqpghYuUl88l8cRCMGRyTO7z9ES\nz5wda7tTRrkfObSvKrxHLT5TlmEzsE+eqhfmCXVqzytynjo3yyevzdhuHopsfdD+\nmQIDAQAB\n-----END PUBLIC KEY-----","to":"lol","amount":10}`);
// // const public = key.exportKey("pkcs8-public-pem");
// // console.log(public)

// const key2 = new NodeRSA()
// const keyData = `-----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoaRhlx49ifSPI8LhQU1Q
// zEhmxOArxu3gpDppC+4ciPRZUv1nej2PAkAu+tOtY1KG9pIwVFiguTFdQ95g4w/l
// I/EAbEtFnWFhlFt5KLcd1b5ERVCmtUvjOehOz+a64dvyg+V/8Y0L8p52IPDuFds8
// ZC90kr7oOcODKRjwFWxpDuJBFZssKpic3Hf1O8knFLa+GNs7jwkyN7UPGg9afH7T
// XGI/spIWVl4jQsO1GV3FvS0Xtf69q3obsiFO5bFkIYtFzLb1IAuQT2pCN6gPn45g
// iZkYQTVqnouJNSh/yQnFmtAYMlLf3e50ICuJ5qvJ2cmfMdAA6btCWTJwxrV0KGzP
// 1wIDAQAB
// -----END PUBLIC KEY-----`;
// key2.importKey(keyData, "pkcs8-public-pem");
// console.log(key2.verify(`{"from":"-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuXaRYQjGwt/9wrc9sqd1\nHSe3yIWsma/dnpRYclbtSrjc6tLQBTPG3Ji3wwYPgTKZyyI2FyOHQRlHgf4WOLVL\nk3SSP9yAgJJasBZGneaZ2uX1zlaWFqfzZAaTg3MkUeBsVjG8bxZImVkLGwXmsC/V\nuE3XCRcTjsx6Qrr1RkDY0O2l7Hmwk5HXCvz3cO4p7a5l+9OUBw6v0zGfvyuzK4R7\nZUlt4LUtDKUM7uv/n58WVBrw+L1gbWtoqyc57YqpghYuUl88l8cRCMGRyTO7z9ES\nz5wda7tTRrkfObSvKrxHLT5TlmEzsE+eqhfmCXVqzytynjo3yyevzdhuHopsfdD+\nmQIDAQAB\n-----END PUBLIC KEY-----","to":"lol","amount":10}`, signature));

// const wallet2 = new Wallet();
// const sendSev = document.querySelector('#transaction');

// module.exports = (chain = [], connections) => {
//     blockchain = new Blockchain(chain);
//     blockchain.addTransaction(new Transaction("system", wallet.publicKey, 100000), wallet.publicKey)
//     const transaction = new Transaction(wallet.publicKey, wallet2.publicKey, 100);
//     wallet.signTransaction(transaction);
//     blockchain.addTransaction(transaction, wallet);
//     sendSev.addEventListener('click', () => {
//         const newTransaction = new Transaction(wallet.publicKey, wallet2.publicKey, 100);
//         wallet.signTransaction(newTransaction);
//         blockchain.addTransaction(newTransaction, wallet);
//     })
//     blockchain.events.on("block", (block) => {
//         console.log("New block", block)
//     })
//     blockchain.events.on("transaction", (transaction) => {
//         console.log("New transaction", transaction)
//     })
// }
