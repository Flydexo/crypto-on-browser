import React from 'react'
import "./Address.css"

export default function Address({children}) {
    return <p className="address" onClick={() => navigator.clipboard.writeText(children)}>{children.replace(/\-+[\w| ]+\-+/, "").substring(0, 20)}...</p>
}
