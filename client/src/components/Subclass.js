import React from "react";
import { useNavigate } from "react-router-dom";

function Subclass({name, index, url, setSubclassUrl}){
    const navigate = useNavigate()

    function handleClick(){
        setSubclassUrl(`https://www.dnd5eapi.co${url}`)
        navigate(`/subclasses/${name}`)
    }

    return(
        <div onClick={handleClick}>
            <div>{name}</div>
        </div>
    )
}

export default Subclass