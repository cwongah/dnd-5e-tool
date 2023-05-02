import React from "react";
import { useNavigate } from "react-router-dom";

function Feature({name, index, url, setFeatureUrl}){
    const navigate = useNavigate()

    function handleClick(){
        setFeatureUrl(`https://www.dnd5eapi.co${url}`)
        navigate(`/features/${name}`)
    }

    return(
        <div onClick={handleClick}>
            <div>{name}</div>
        </div>
    )
}

export default Feature