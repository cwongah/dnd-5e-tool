import React, { useEffect, useState } from "react";
import Skill from "./Skill";
import SkillPopup from "./SkillPopup";

function SkillsList({setSkillUrl}){
    const [skillsList, setSkillsList] = useState([])
    const [skillPop, setSkillPop] = useState(false)
    const [url, setUrl] = useState()
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/skills')
        .then(r => r.json())
        .then (data => setSkillsList(data.results))
    }, [])

    const skillsToDisplay = skillsList.map((skill, index) => {
        return(
            // <div>
            //     <Skill key={index} name={skill.name} index={skill.index} url={skill.url} setSkillUrl={setSkillUrl} />
            // </div>
            <div key={index} className="bg-white rounded-md shadow-md p-4 cursor-pointer">
                <div onClick={()=> {
                    setSkillPop(!skillPop)
                    setUrl(skill.url)
                    }}
                    className="text-lg font-bold"    
                >
                    {skill.name}
                </div>
            </div>
        )
    })

    return(
        // <div>
        //     <div>Skills</div>
        //     {skillsToDisplay}
        // </div>
        <div className="bg-white bg-opacity-50  px-4 py-8 mx-20 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold border-b border-gray-300 mb-4 pb-5 text-white">Skills</h2>
            <div className="grid grid-cols-3 gap-10 px-3">
                {skillsToDisplay}
            </div>
            {skillPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full lg:w-3/4 overflow-y-scroll">
                    <SkillPopup skillPop={skillPop} setSkillPop={setSkillPop} skillUrl={url}  />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default SkillsList