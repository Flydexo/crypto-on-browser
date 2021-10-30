import React, { useEffect, useState } from 'react'
import Modal from '../../components/basic/Modal/Modal';
import Profile from '../../components/specific/Profile/Profile';
import "./App.css"

import init, { wallet, blockchain } from '../../../blockchain';
import Transactions from '../../components/specific/Transactions/Transactions';
import Send from '../../components/specific/Send/Send';

export default function App() {

    const [userName, setUserName] = useState("");
    const [modalOpened, setModalOpened] = useState(true);
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        if(modalOpened === false){
            init(userName).then((blockchain) => {
                setBalance(wallet.getBalance(blockchain))

                blockchain.events.on("block", () => {
                    setBalance(wallet.getBalance(blockchain))
                })
                let pendingTransactions = [];
                blockchain.events.on("tx", (tx) => {
                    pendingTransactions = [...pendingTransactions, tx];
                    setTransactions(pendingTransactions);
                    setBalance(wallet.getBalance(blockchain))
                })
                blockchain.events.on("initWallet", (localBalance) => {
                    setBalance(localBalance)
                })
            })
        }
    }, [modalOpened])

    // setTimeout(() => {
    //     console.log("balance", wallet.getBalance(blockchain))
    //     setBalance(wallet.getBalance(blockchain))
    // }, 10000)

    return (
        <div className="app">
            {modalOpened ? <Modal title="Your username" description="Enter a username" value={userName} button="Submit" setValue={setUserName} onClick={() => setModalOpened(false)}/> : null}
            <Profile username={userName} address={wallet.publicKey} balance={balance}/>
            <Transactions transactions={transactions}/>
            <Send/>
        </div>
    )
}
