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
                            <Stats lastblock="bx5" waitingTxns={10} nodes={84} transactions={842} supply={100000000} blockTime="0.25s"/>
                            <Blocks blocks={[{state: "MINING", id: "bx1", miner: "lol", transactions: Array(5), timestamp: 1633365700000}, {state: "CHAINED", id: "bx1", miner: "lol", transactions: Array(5), timestamp: 1633365700000}, {state: "CHAINED", id: "bx1", miner: "lol", transactions: Array(5), timestamp: 1633365700000}, {state: "CHAINED", id: "bx1", miner: "lol", transactions: Array(5), timestamp: 1633365700000}]}/>
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
