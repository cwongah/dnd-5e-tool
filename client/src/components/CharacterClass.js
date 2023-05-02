import React from "react";
import { useNavigate } from "react-router-dom";

function CharacterClass({name, index, url, setClassUrl}){
    const navigate = useNavigate()

    function handleClick(){
        setClassUrl(`https://www.dnd5eapi.co${url}`)
        navigate(`/classes/${name}`)
    }

    return(
        <div onClick={handleClick}>
            <div>{name}</div>
        </div>
    )
}

export default CharacterClass