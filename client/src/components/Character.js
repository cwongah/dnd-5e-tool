import React from "react";
import { useNavigate } from "react-router-dom";

function Character({name, level, url, id, setCharacterId}){

    const navigate = useNavigate()
    
    function handleCharacterClick(){
        console.log(url)
        setCharacterId(id)
        navigate(`/characters/${id}`)
    }

    return(
        <div onClick={handleCharacterClick}>
            <div>{name}</div><div>{level}</div>
        </div>
    )
}

export default Character