import React, { useEffect, useState } from 'react'
import init, {wallet} from '../../../blockchain';
import Modal from '../../components/basic/Modal/Modal';
import Profile from '../../components/specific/Profile/Profile';
import Transactions from '../../components/specific/Transactions/Transactions';
import Send from '../../components/specific/Send/Send';
import Nav from "../../components/specific/Nav/Nav"
import Stats from "../../components/specific/Stats/Stats"
import Blocks from "../../components/specific/Blocks/Blocks"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css"

export default function App() {

    const [userName, setUserName] = useState("");
    const [modalOpened, setModalOpened] = useState(true);
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState({
        blockTime: "0s",
        lastBlockId: 0,
        transactions: 0,
        supply: 0,
        waitingTxns: 0,
        nodes: 0,
        state: "WAITING"
    });
    
    useEffect(() => {
        if(modalOpened === false){
            init(userName).then((blockchain) => {
                let pendingTransactions = [];
                setBalance(wallet.getBalance(blockchain))

                blockchain.events.on("block", block => {
                    block.transactions.forEach(tx => {
                        pendingTransactions.forEach((otx, i) => {
                            if(otx.id === tx.id){
                                pendingTransactions[i].state = "VALIDATED";
                                setTransactions(pendingTransactions)
                            }
                        })
                    })
                    setBalance(wallet.getBalance(blockchain))
                })
                blockchain.events.on("tx", (tx) => {
                    tx = {...tx, state: "PENDING"}
                    pendingTransactions = [...pendingTransactions, tx];
                    pendingTransactions = pendingTransactions.sort((a,b) => {
                        if(a.id > b.id){
                            return 1
                        }else{
                            return -1
                        }
                    })
                    setTransactions(pendingTransactions);
                    setBalance(wallet.getBalance(blockchain))
                    console.log(pendingTransactions.map(tx => tx.id))
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
        <Router>
            <Switch>
                <Route path="/" exact>
                    <div className="app">
                        {modalOpened ? <Modal title="SIGN IN" description="Enter a username" value={userName} button="LOGIN" placeholder="Your username" setValue={setUserName} onClick={() => setModalOpened(false)}/> : null}
                        <div className="left">
                            <Transactions transactions={transactions}/>
                        </div>
                        <div className="mid">
                            <Nav/>
                            <Send/>
                            <Stats state={stats.state} lastblock={`bx${stats.lastBlockId}`} waitingTxns={stats.waitingTxns} nodes={stats.nodes} transactions={stats.transactions} supply={stats.supply} blockTime={stats.blockTime}/>
                            <Blocks/>
                        </div>
                        <div className="right">
                            <Profile username={userName} address={wallet.publicKey} balance={balance}/>
                        </div>
                    </div>
                </Route>
                <Route exact path="/explorer">
                    <p>explorer</p>
                </Route>
                <Route exact path="/mining">
                    <p>mining</p>
                </Route>
                <Route exact path="/admin">
                    <p>admin</p>
                </Route>
                <Route>
                    <p>404</p>
                </Route>
            </Switch>
        </Router>
    )
}
