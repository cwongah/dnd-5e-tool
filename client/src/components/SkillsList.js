import React, { useEffect, useState } from "react";
import Skill from "./Skill";

function SkillsList({setSkillUrl}){
    const [skillsList, setSkillsList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/skills')
        .then(r => r.json())
        .then (data => setSkillsList(data.results))
    }, [])

    console.log(skillsList)

    const skillsToDisplay = skillsList.map((skill) => {
        return(
            <div>
                <Skill key={skill.index} name={skill.name} index={skill.index} url={skill.url} setSkillUrl={setSkillUrl} />
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