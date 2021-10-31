import React, { useEffect, useState } from 'react'
import State from "../../State/State"
import timeImg from "../../../../assets/time.png"
import WaitingAnimation from '../../../basic/WaitingAnimation/WaitingAnimation';
import "./Block.css"
import Address from '../../../basic/Address/Address';
import { getUsername } from '../../../../../blockchain';

export default function Block({state, id, miner, transactionNumber, timestamp}) {

    const [formattedTime, setFormattedTime] = useState("<1s");
    let interval;

    const setTime = () => {
        let time = Date.now() - timestamp;
        if(time < 1000){
            setFormattedTime("<1s");
        }else if(time < 60000){
            setFormattedTime(`${Math.round(time/1000)}s`);
        }else if(time < 3600000){
            setFormattedTime(`${Math.round(time/1000/60)}min`);
        }else if(time < 86400000){
            setFormattedTime(`${Math.round(time/1000/3600)}h`);
        }else if(time < 2592000000){
            setFormattedTime(`${Math.round(time/1000/3600/24)}d`);
        }else if(time < 31557600000){
            setFormattedTime(`${Math.round(time/1000/3600/24/30)}m`);
        }else{
            setFormattedTime(`${Math.round(time/1000/3600/24/30/365)}d`);
        }
    }
    
    useEffect(() => {
        console.log("miner", miner)
        if(state == "CHAINED"){
            interval = setInterval(() => {
                setTime();
            }, 10000)
        }
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <div className={`block ${state}`}>
            <State type={state} size="big"/>
            <div className="infos">
                <p>bx{id}</p>
                {state == "CHAINED" ? <p>miner: {getUsername(miner)}</p> : null}
                <p>{transactionNumber} transactions</p>
                {state == "CHAINED" ?
                    <div className="time">
                        <img src={timeImg} width={27} />
                        <p>{formattedTime}</p>
                    </div>
                : 
                    <WaitingAnimation size="big"/>
                }
            </div>
        </div>
    )
}
