import React from 'react'
import "./Transaction.css"

export default function Transaction({type, amount, other}) {
    return (
        <div className={`transaction ${type}`}>
            <div className="amount">
                {type == "withdraw" ? "-" : "+"}
                {amount}
                SEV
            </div>
            <div className="other">{type == "withdraw" ? "to" : "from"} {other}</div>
        </div>
    )
}
