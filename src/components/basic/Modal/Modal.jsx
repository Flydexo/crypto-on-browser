import React, {useState} from 'react'
import Button from '../Button/Button';
import Error from '../Error/Error';
import TextInput from '../TextInput/TextInput';
import "./Modal.css"

export default function Modal({title, description, value, setValue, button, onClick}) {

    const [error, setError] = useState(false);

    return (
        <>
            <div className="modal">
                {error ? <Error message="Cannot set empty username"/> : null}
                <h1>{title}</h1>
                <p>{description}</p>
                <TextInput placeholder={title} value={value} setValue={setValue}/>
                <Button onClick={() => value != "" ? onClick() : setError(true)} title={button}/>
            </div>
            <div className="background"></div>
        </>
    )
}
