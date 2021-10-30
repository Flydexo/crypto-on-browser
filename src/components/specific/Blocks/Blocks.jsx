import React from 'react'
import Block from './Block/Block'
/**
 * limited to 6 blocks
 */
export default function Blocks({blocks}) {
    return (
        <div className="blocks">
            {
                blocks ? blocks.map(b => {
                    return <Block key={b.id} state={b.state} id={b.id} miner={b.miner} transactionNumber={b.transactions.length} timestamp={b.timestamp}/>
                }) : null
            }
        </div>
    )
}
