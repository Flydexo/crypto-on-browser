import React from 'react'
import WaitingAnimation from '../../../basic/WaitingAnimation/WaitingAnimation'
import waitingImg from "../../../../assets/waiting.png"
import "./Transaction.css"

export default function Transaction({type, amount, other, state, id}) {
    return (
        <div className={`transaction ${type} ${state}`}>
            <h2 className="state">
                {state === "PENDING" ? <img src={waitingImg} width={24} style={{marginRight: 10}} className="waiting"/> : null} {state}
            </h2>
            <div className="infos">
                <p className="id">tx{id}</p>
                <p className="user">{other}</p>
                <p className="amount">
                    {type == "withdraw" ? "-" : "+"}
                    {amount}
                    SVC
                </p>
            </div>
        </div>
    )
}
