import React from 'react'
import Address from '../../basic/Address/Address'
import "./Profile.css"

export default function Profile({username, balance, address}) {
    return (
        <div className="profile">
            <div className="picture">
                {username.substring(0, 1).toUpperCase()}
            </div>
            <div className="username">
                {username}
            </div>
            <div className="balance">
                {balance} SEV
            </div>
            <div className="address">
                <Address>{address}</Address>
            </div>
        </div>
    )
}
