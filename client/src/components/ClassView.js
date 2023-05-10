import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Subclass from "./Subclass";
import Proficiency from "./Proficiency";
import Equipment from "./Equipment";

function ClassView({classUrl, setCurrentClass, setClassLevelUrl, setClassSpellUrl, setSubclassUrl, setProficiencyUrl, setEquipmentUrl}){
    const navigate = useNavigate()

    const [characterClass, setCharacterClass] = useState({})

    useEffect(()=>{
        fetch(classUrl)
            .then(r => r.json())
            .then(data => {
                setCharacterClass(data)
                setCurrentClass(data.name)
            })
    }, [classUrl])

    function handleLevelsClick(){
        setClassLevelUrl(`https://www.dnd5eapi.co${characterClass.class_levels}`)
        navigate(`/classes/${characterClass.name}/levels`)
    }

    function handleSpellsClick(){
        setClassSpellUrl(`https://www.dnd5eapi.co${characterClass.spells}`)
        navigate(`/classes/${characterClass.name}/spells`)
    }

    return(
        <div>
            <div className="text-white text-5xl font-bold pl-4 pb-10">{characterClass.name}</div>
            <div className="grid grid-cols-2 gap-8">
                <div className="col-span-1">
                    <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                        <div className="text-4xl font-bold text-white px-3 mb-5 pb-2 border-b border-gray-300">Class Statistics</div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="col-span-1">
                                <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 p-4">Basic Information</div>
                                <div className="px-3">
                                    <div>Hit Die: {characterClass.hit_die}</div>
                                    {characterClass.subclasses ? (
                                        <div>
                                            {characterClass.subclasses.map((subclass, index)=>
                                                <div>Subclass: {subclass.name}</div>
                                            )}
                                        </div>
                                    ):('')}
                                    {/* DO THIS FUCKING THING */}
                                    {characterClass.class_levels ? (<div onClick={handleLevelsClick}>Class Levels</div>):('')}
                                    {/* Do iot fucker you have to */}
                                </div> 
                            </div>
                            <div className="col-span-1">
                                <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 p-4">Saving Throws</div>
                                {characterClass.saving_throws ? (
                                    <div> 
                                        {characterClass.saving_throws.map((saving_throw, index)=>
                                        <div className="px-3" key={index}>
                                            {saving_throw.name}
                                        </div>
                                        )}
                                    </div>
                                ):('')}
                            </div>
                        </div>
                        {characterClass.spellcasting ? (
                            <div>
                                <div className="text-xl w-full font-bold border-b text-white border-gray-300 mb-4 p-4">Spellcasting</div>
                                <div className="px-3">
                                    <div>
                                        Level: {characterClass.spellcasting.level}
                                    </div>
                                    <div>
                                        Spellcasting Ability: {characterClass.spellcasting.spellcasting_ability.name}
                                    </div>
                                    {characterClass.spellcasting.info.map((item, index) =>
                                        <div key={index}>
                                            <div className="font-bold py-4">
                                                {item.name}
                                            </div>
                                            <div>
                                                {item.desc}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ):('')}
                        {/* DO THIS FUCKING THING */}
                        {characterClass.spells ? (<div onClick={handleSpellsClick} >Spells</div>):('')}
                        {/* Do iot fucker you have to */}
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="col-span-1">
                                
                            </div>
                        </div>
                    <div className="text-4xl font-bold text-white px-3 mb-5 pb-2 border-b border-gray-300">Skills and Proficiencies</div>
                        {characterClass.proficiencies ? (
                            <div>
                                {characterClass.proficiencies.map((proficiency, index) => 
                                    <Proficiency key={index} name={proficiency.name} url={proficiency.url} setProficiencyUrl={setProficiencyUrl} />
                                )}
                            </div>
                        ):('')}
                        {characterClass.proficiency_choices && characterClass.index != 'monk' ? (
                            <div>
                                {characterClass.proficiency_choices.map((proficiency, index)=>
                                    <div key={index}>
                                        {proficiency.desc}
                                        {proficiency.from.options.map((option, index) => 
                                            // <div key={index}>{option.item.name}</div>)
                                            <Proficiency key={index} name={option.item.name} url={option.item.url} setProficiencyUrl={setProficiencyUrl} />
                                        )}
                                    </div>
                                )}
                            </div>
                        ):('')}
                        {characterClass.proficiency_choices && characterClass.index == 'monk' ? (
                            <div>
                                {characterClass.proficiency_choices.map((proficiency, index)=>
                                    <div key={index}>
                                        {proficiency.desc}
                                        {proficiency.choose == 2 ? (
                                            <div>
                                                {proficiency.from.options.map((option, index) => 
                                                    <Proficiency key={index} name={option.item.name} url={option.item.url} setProficiencyUrl={setProficiencyUrl} />
                                                )}
                                            </div>):(
                                            <div>
                                                {proficiency.from.options.map((option) =>
                                                    <div>
                                                        {option.choice.desc}
                                                        {option.choice.from.options.map((deeper_option, index)=>
                                                            <Proficiency key={index} name={deeper_option.item.name} url={deeper_option.item.url} setProficiencyUrl={setProficiencyUrl} />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ):('')}
                        {characterClass.starting_equipment ? (
                            <div>
                                {characterClass.starting_equipment.map((equip, index) =>
                                    <Equipment key={index} name={equip.equipment.name} url={equip.equipment.url} setEquipmentUrl={setEquipmentUrl} />
                                )}
                            </div>
                        ):('')}
                        {characterClass.starting_equipment_options ? (
                            <div>
                                {characterClass.starting_equipment_options.map((option, index)=>
                                    <div key={index}>                            
                                            {option.desc}
                                    </div>
                                )}
                            </div>
                        ):('')}

                    </div>
                </div>
            </div>
            
            
            
        </div>
    )
}

export default ClassView