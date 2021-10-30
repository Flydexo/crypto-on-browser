import React from 'react'
import waiting from "../../../assets/waiting.png"
import mining from "../../../assets/mining.png"
import chained from "../../../assets/chained.png"
import deposit from "../../../assets/deposit.png"
import withdraw from "../../../assets/withdraw.png"
import dwaiting from "../../../assets/dwaiting.png"
import dmining from "../../../assets/dmining.png"
import "./State.css"

export default function State({type, size, color="white", text=true}) {
    return (
        <div className={"state "+size+" "+color+" "+type}>
            <img src={type == "MINING" && color != "white" ? dmining : type == "MINING" ? mining : type === "CHAINED" ? chained : type === "WITHDRAW" ? withdraw : type === "DEPOSIT" ? deposit: color != "white" ? dwaiting : waiting} width={36} />
            {text ? <p>{type}</p> : false}
        </div>
    )
}
