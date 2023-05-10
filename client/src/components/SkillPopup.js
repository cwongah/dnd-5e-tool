import React, { useEffect, useState } from "react";

function SkillPopup({skillUrl, setSkillPop, skillPop}){
    const [skill, setSkill] = useState({})

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co${skillUrl}`)
            .then(r => r.json())
            .then(data => setSkill(data))
    }, [])

    // console.log(skill.ability_score.index)

    return(
        <div>
            <div className="text-lg font-bold mb-4 border-b border-gray-300">{skill.name}</div>
            <div className="px-3 pb-3">{skill.desc}</div>
            {skill.ability_score ? (<div className="px-3">Ability Score: {skill.ability_score.name}</div>) : (<div>Loading...</div>)}
            <div className="flex justify-center">
                <button onClick={()=> setSkillPop(!skillPop)} className='w-1/4 h-1/4 py-2 ml-10  mt-3 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default SkillPopup