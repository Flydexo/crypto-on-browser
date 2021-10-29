import React, { useEffect, useState } from 'react'
import Transaction from './Transaction/Transaction'
import { blockchain, wallet, socket } from '../../../../blockchain'
import "./Transactions.css"

export default function Transactions({transactions}) {

    const [stateAddresses, setStateAddresses] = useState([]);

    socket.on("address", (addresses) => {
        setStateAddresses(addresses)
    })

    return (
        <div className="transactions">
            {
                transactions.reverse().map((tx, i) => {
                    let name = "unknown";
                    if(tx.from === wallet.publicKey){
                        stateAddresses.forEach(addr => {
                            if(addr.key == tx.to){
                                name = addr.name;
                            }
                        })
                        return <Transaction type="withdraw" amount={tx.amount} other={name} key={i}/>
                    }else if(tx.to === wallet.publicKey){
                        if(tx.from != "system"){
                            stateAddresses.forEach(addr => {
                                if(addr.key == tx.from){
                                    name = addr.name;
                                }
                            })
                        }else{
                            name = "system"
                        }
                        return <Transaction type="deposit" amount={tx.amount} other={name} key={i}/>
                    }
                })
            }
        </div>
    )
}
