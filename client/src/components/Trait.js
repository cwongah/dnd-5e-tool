import React from "react";
import { useNavigate } from "react-router-dom";

function Trait({name, index, url, setReferenceUrl}){
    const navigate = useNavigate()

    function handleClick(){
        setReferenceUrl(`https://www.dnd5eapi.co${url}`)
        navigate(`/traits/${index}`)
    }

    return(
        <div onClick={handleClick}>
            <div>{name}</div>
        </div>
    )
}

export default Trait