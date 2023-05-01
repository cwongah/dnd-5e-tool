import React from "react";
import { useNavigate } from "react-router-dom";

function Skill({name, index, url, setReferenceUrl}){
    const navigate = useNavigate()

    function handleSkillClick(){
        setReferenceUrl(`https://www.dnd5eapi.co${url}`)
        navigate(`/skills/${index}`)
    }

    return(
        <div onClick={handleSkillClick}>
            <div>{name}</div>
        </div>
    )
}

export default Skill