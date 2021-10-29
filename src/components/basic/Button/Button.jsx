import React from 'react'
import "./Button.css"

export default function Button({title, onClick}) {
    return (
        <div className="button" onClick={onClick}>
            {title}
        </div>
    )
}
