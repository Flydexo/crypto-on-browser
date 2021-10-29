import React from 'react'
import "./Address.css"
import copy from "../../../assets/copy.png"

export default function Address({children}) {
    return <p onClick={() => navigator.clipboard.writeText(children)}>{children.replace(/\-+[\w| ]+\-+/, "").substring(0, 20)}... <img src={copy} width="15px" /></p>
}
