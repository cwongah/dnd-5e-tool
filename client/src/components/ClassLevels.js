import React, { useEffect, useState } from "react";
import Feature from "./Feature";

function ClassLevels({classLevelUrl, currentClass, setFeatureUrl, classLevelPop, setClassLevelPop}){
    const [classLevels, setClassLevels] = useState([])

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co${classLevelUrl}`)
            .then(r => r.json())
            .then(data => setClassLevels(data))
    }, [])

    console.log(classLevels)

    return(
        <div>
            {classLevels ? (
                <div>
                    {classLevels.map((item, index)=>
                    <div key={index}>
                        <div className="text-lg font-bold mb-4 py-2 border-b border-gray-300">Level: {item.level}</div>
                        <div className="font-bold py-2">Score Bonuses</div>
                        <div className="px-3">Ability Score Bonuses: {item.ability_score_bonuses}</div>
                        <div className="px-3">Proficiency Bonus: {item.prof_bonus}</div>
                        <div>
                            {item.features ? (
                              <div>
                                <div className="font-bold py-2">Features</div>
                                {item.features.map((feature, index) =>
                                    <div className="px-3">{feature.name}</div>
                                )}
                              </div>
                            ):('')}
                        </div>
                        <div>
                            {item.spellcasting ? (
                                <div>
                                    <div className="font-bold py-2">Spellcasting</div>
                                    {Object.entries(item.spellcasting).map(([key, value])=>{
                                        return(
                                            <div className="px-3" key={key}>
                                                {key}: {value}
                                            </div>
                                    )})}
                                </div>
                            ):('')}
                        </div>
                        <div>
                            {item.class_specific && item.class.index !== "rogue" ? (
                                <div>
                                    <div className="font-bold py-2">Class Specific</div>
                                    {Object.entries(item.class_specific).map(([key, value])=>{
                                        return(
                                            <div className="px-3" key={key}>
                                                {key}: {value}
                                            </div>
                                    )})}
                                </div>
                            ):('')}
                        </div>
                    </div>
                    )}
                </div>
            ):('')}
            <div className="flex justify-center">
                <button onClick={()=> setClassLevelPop(!classLevelPop)} className='w-1/4 h-1/4 py-2 ml-10  mt-3 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default ClassLevels