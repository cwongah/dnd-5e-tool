import React, { useEffect, useState } from "react";
import Skill from "./Skill";

function SkillsList({setSkillUrl}){
    const [skillsList, setSkillsList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/skills')
        .then(r => r.json())
        .then (data => setSkillsList(data.results))
    }, [])

    const skillsToDisplay = skillsList.map((skill, index) => {
        return(
            <div>
                <Skill key={index} name={skill.name} index={skill.index} url={skill.url} setSkillUrl={setSkillUrl} />
            </div>
        )
    })

    return(
        <div>
            <div>Skills</div>
            {skillsToDisplay}
        </div>
    )
}

export default SkillsList