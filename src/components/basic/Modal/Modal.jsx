import React, {useState} from 'react'
import Button from '../Button/Button';
import Error from '../Error/Error';
import TextInput from '../TextInput/TextInput';
import "./Modal.css"

export default function Modal({title, description, value, setValue, button, onClick, placeholder}) {

    const [error, setError] = useState(false);

    return (
        <>
            <div className="modal">
                <h1>{title}</h1>
                {error ? <Error message="Cannot set empty username"/> : null}
                <p>{description}</p>
                <TextInput placeholder={placeholder} value={value} setValue={setValue}/>
                <Button onClick={() => value != "" ? onClick() : setError(true)} title={button}/>
            </div>
            <div className="background"></div>
        </>
    )
}
