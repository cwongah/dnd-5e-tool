import React, { useEffect, useState } from "react";

function SkillView({skillUrl}){
    const [skill, setSkill] = useState({})

    useEffect(()=>{
        fetch(skillUrl)
            .then(r => r.json())
            .then(data => setSkill(data))
    }, [])

    // console.log(skill.ability_score.index)

    return(
        <div>
            <div>Skill Page</div>
            <div>{skill.name}</div>
            <div>{skill.desc}</div>
            {skill.ability_score ? (<div>Ability Score: {skill.ability_score.name}</div>) : (<div>Loading...</div>)}
        </div>
    )
}

export default SkillView