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
            <div className="amount-container">
                <input type="number" name="amount" id="amount" value={amount} onChange={e => {
                    if(e.target.value.startsWith("0") && e.target.value.length > 1){
                        let numbers = e.target.value.split("");
                        let i = 0;
                        for(i; i<numbers.length; i++){
                            if(numbers[i] != 0){
                                break;
                            }
                        }
                        setAmount(e.target.value.substring(i))
                    }else if(e.target.value == ""){
                        setAmount(0)
                    }else if(e.target.value >= 0){
                        setAmount(e.target.value)
                    }else{
                        setAmount(0)
                    }
                    
                }} style={{width: `${amount.length}ch`}}/>
                <span className="currency">SVC</span>
            </div>
            <div className="to">
                <span>to</span>
                <select name="users" id="users" onChange={e => handleChange(e)}>
                    {
                        stateAddresses.map(addr => {
                            return <option key={addr.key} value={addr.key}>{addr.name}</option>
                        })
                    }
                </select>
            </div>
            <Button title="PAY" onClick={handleSend}/>
        </div>
    )
}
