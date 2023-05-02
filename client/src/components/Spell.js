import React from "react";
import { useNavigate } from "react-router-dom";

function Spell({name, index, url, setSpellUrl}){
    const navigate = useNavigate()

    function handleClick(){
        setSpellUrl(`https://www.dnd5eapi.co${url}`)
        navigate(`/spells/${name}`)
    }

    return(
        <div onClick={handleClick}>
            <div>{name}</div>
        </div>
    )
}

export default Spell