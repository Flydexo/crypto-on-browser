import React, { useEffect, useState } from 'react'
import "./WaitingAnimation.css"

export default function WaitingAnimation({size}) {

    const [dots, setDots] = useState([1])

    useEffect(() => {
        let dotCount = 0;
        let interval = setInterval(() => {
            if(dotCount > 2){
                dotCount = 0;
                setDots([])
            }else{
                dotCount++;
                let arr = [];
                for(let i = 0; i<dotCount;i++){
                    arr.push(i)
                }
                setDots(arr)
            }
        }, 500)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className={`animation ${size}`}>
            {
                dots.map((d, i) => {
                    return <div className="circle" key={i}></div>
                })
            }
        </div>
    )
}
