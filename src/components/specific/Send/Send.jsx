import React, { useState } from 'react'
import "./Send.css"
import {socket, sendMoney} from '../../../../blockchain';
import Button from "../../basic/Button/Button"

export default function Send() {

    const [stateAddresses, setStateAddresses] = useState([]);
    const [amount, setAmount] = useState(0);
    const [to, setTo] = useState("")

    socket.on("address", (addresses) => {
        setStateAddresses(addresses)
    })

    const handleSend = () => {
        sendMoney(to, Number(amount));
        // if(Number(amount) && amount > 0 && typeof to == 'string' && to.length >= 10){
        //     sendMoney(to, Number(amount));
        // }
    }

    const handleChange = (e) => {
        setTo(e.target.value)
    }

    return (
        <div className="send">
            <div>
                Send 
                <input type="number" min="0" value={amount} onChange={e => setAmount(e.target.value)}/>
                SEV
            </div>
            <div>
                to
                <select onChange={e => handleChange(e)} defaultValue={to}>
                    {stateAddresses ? stateAddresses.map((a) => {
                        if(a.key){
                            return <option value={a.key} key={a.key}>{a.name}</option>;
                        }
                    }) : null}
                </select>
            </div>
            <Button title="send" onClick={() => handleSend()}/>
        </div>
    )
}
