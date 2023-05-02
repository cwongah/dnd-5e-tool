import React from "react";
import { useNavigate } from "react-router-dom";

function Character({name, level, url, id, setCharacterId}){

    const navigate = useNavigate()
    
    function handleCharacterClick(){
        setCharacterId(id)
        navigate(`/characters/${name}`)
    }

    return(
        <div onClick={handleCharacterClick}>
            <div>{name}</div><div>{level}</div>
        </div>
    )
}

export default Character