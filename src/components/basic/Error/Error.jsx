import React from 'react'
import "./Error.css"

export default function Error({color = "red", message}) {
    return (
        <div className={`error ${color}`}>
            {message}
        </div>
    )
}
