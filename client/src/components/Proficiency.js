import React from "react";
import { useNavigate } from "react-router-dom";

function Proficiency({name, index, url, setProficiencyUrl}){
    const navigate = useNavigate()

    function handleClick(){
        setProficiencyUrl(`https://www.dnd5eapi.co${url}`)
        navigate(`/proficiencies/${name}`)
    }

    return(
        <div onClick={handleClick}>
            <div>{name}</div>
        </div>
    )
}

export default Proficiency