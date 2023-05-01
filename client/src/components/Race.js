import React from "react";
import { useNavigate } from "react-router-dom";

function Race({name, index, url, setReferenceUrl}){
    const navigate = useNavigate()

    function handleClick(){
        setReferenceUrl(`https://www.dnd5eapi.co${url}`)
        navigate(`/races/${index}`)
    }

    return(
        <div onClick={handleClick}>
            <div>{name}</div>
        </div>
    )
}

export default Race