import React from "react";
import { useNavigate } from "react-router-dom";

function Skill({name, index, url, setSkillUrl}){
    const navigate = useNavigate()

    function handleSkillClick(){
        setSkillUrl(`https://www.dnd5eapi.co${url}`)
        navigate(`/skills/${name}`)
    }

    return(
        <div onClick={handleSkillClick}>
            <div>{name}</div>
        </div>
    )
}

export default Skill