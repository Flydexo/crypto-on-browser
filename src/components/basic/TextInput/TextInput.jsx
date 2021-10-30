import React from 'react'
import "./TextInput.css"

export default function TextInput({value, setValue, placeholder}) {
    return <input className="textInput" type="text" name="input" id="input" value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder}/>
}
