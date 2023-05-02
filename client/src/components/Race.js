import React from "react";
import { useNavigate } from "react-router-dom";

function Race({name, index, url, setRaceUrl}){
    const navigate = useNavigate()

    function handleClick(){
        setRaceUrl(`https://www.dnd5eapi.co${url}`)
        navigate(`/races/${name}`)
    }

    return(
        <div onClick={handleClick}>
            <div>{name}</div>
        </div>
    )
}

export default Race