import React from 'react'
import { Link } from 'react-router-dom'
import "./Nav.css"

export default function Nav() {
    return (
        <div className="nav">
            <Link to="/explorer">explorer</Link>
            <Link to="/mining">mining</Link>
            <Link to="/admin">admin</Link>
        </div>
    )
}
