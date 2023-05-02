import React, { useEffect, useState } from "react";

function ClassLevels({referenceUrl, currentClass}){
    const [classLevels, setClassLevels] = useState([])

    useEffect(()=>{
        fetch(referenceUrl)
            .then(r => r.json())
            .then(data => setClassLevels(data))
    }, [])

    return(
        <div>
            <div>{currentClass} Levels</div>
            {classLevels ? (
                <div>
                    {classLevels.map((item, index)=>
                    <div key={index}>
                        <div>Level: {item.level}</div>
                        <div>AB: {item.ability_score_bonuses}</div>
                        <div>PB: {item.prof_bonus}</div>
                        <div>
                            {item.features ? (
                              <div>
                                Features
                                {item.features.map((feature, index) =>
                                    <div key={index}>
                                        {feature.name}
                                    </div>
                                )}
                              </div>
                            ):('')}
                        </div>
                        <div>
                            {item.spellcasting ? (
                                <div>
                                    {Object.entries(item.spellcasting).map(([key, value])=>{
                                        return(
                                            <div key={key}>
                                                {key}: {value}
                                            </div>
                                    )})}
                                </div>
                            ):('')}
                        </div>
                        <div>
                            {item.class_specific ? (
                                <div>
                                    {Object.entries(item.class_specific).map(([key, value])=>{
                                        return(
                                            <div key={key}>
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
        </div>
    )
}

export default ClassLevels