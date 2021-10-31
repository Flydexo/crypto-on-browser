import React from 'react'
import State from '../State/State'
import "./Stats.css"

export default function Stats({lastblock, waitingTxns, nodes, transactions, supply, blockTime, state}) {
    return (
        <div className="stats">
            <div className="stats-state"><State type={state} size="big" color="dark"/></div>
            <div className="main">
                <p>last block: {lastblock}</p>
                <p>waiting txns: {waitingTxns}</p>
                <p>nodes: {nodes}</p>
            </div>
            <div className="secondary">
                <p>transactions (24h): {transactions}</p>
                <p>supply: {supply}</p>
                <p>avg block time: {blockTime}</p>
            </div>
        </div>
    )
}
