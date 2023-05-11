import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Subclass from "./Subclass";
import Proficiency from "./Proficiency";
import Equipment from "./Equipment";
import SubclassPop from "./SubclassPopup";
import ProfPopup from "./ProfPopup";
import SkillPopup from "./SkillPopup";
import EquipmentPopup from "./EquipmentPopup";
import ClassLevels from "./ClassLevels";
import ClassSpells from "./ClassSpells";

function ClassView({classUrl, setCurrentClass, setClassLevelUrl, setClassSpellUrl, setSubclassUrl, setProficiencyUrl, setEquipmentUrl}){
    const navigate = useNavigate()
    const [characterClass, setCharacterClass] = useState({})
    const [subclassPop, setSubclassPop] = useState(false)
    const [profPop, setProfPop] = useState(false)
    const [profPopUrl, setProfPopUrl] = useState()
    const [skillPop, setSkillPop] = useState(false)
    const [skillPopUrl, setSkillPopUrl] = useState()
    const [equipPop, setEquipPop] = useState(false)
    const [equipPopUrl, setEquipPopUrl] = useState()
    const [classLevelPop, setClassLevelPop] = useState(false)
    const [classSpellPop, setClassSpellPop] = useState(false)

    console.log(characterClass.spells)

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
                                                <div onClick={()=> setSubclassPop(!subclassPop)}>Subclass: {subclass.name}</div>
                                            )}
                                        </div>
                                    ):('')}
                                    {characterClass.class_levels ? (<div onClick={()=> setClassLevelPop(!classLevelPop)}>Class Levels</div>):('')}
                                    {characterClass.spells ? (<div onClick={()=> setClassSpellPop(!classSpellPop)} >Class Spells</div>):('')}
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
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                        <div className="text-4xl font-bold text-white px-3 mb-5 pb-2 border-b border-gray-300">Skills, Proficiencies, and Equipment</div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="col-span-1">
                                {characterClass.proficiencies ? (
                                    <div>
                                        <div className="text-xl w-full font-bold border-b text-white border-gray-300 mb-4 p-4">Starting Proficiencies</div>
                                        {characterClass.proficiencies.map((proficiency, index) => 
                                            <div className="px-3" onClick={()=> {
                                                setProfPop(!profPop)
                                                setProfPopUrl([proficiency.url])
                                            }}>{proficiency.name}</div>
                                        )}
                                    </div>
                                ):('')}
                                {characterClass.proficiency_choices && characterClass.index != 'monk' ? (
                                    <div>
                                        <div className="text-xl w-full font-bold border-b text-white border-gray-300 mb-4 p-4">Starting Proficiencies Options</div>
                                        {characterClass.proficiency_choices.map((proficiency, index)=>
                                            <div className="px-3" key={index}>
                                                <div className="font-bold py-2">{proficiency.desc}</div>
                                                {proficiency.from.options.map((option, index) => 
                                                    // <div key={index}>{option.item.name}</div>)
                                                    <div onClick={()=>{
                                                        setProfPop(!profPop)
                                                        setProfPopUrl(option.item.url)
                                                    }}>{option.item.name}</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ):('')}
                                {characterClass.proficiency_choices && characterClass.index == 'monk' ? (
                                    <div>
                                        <div className="text-xl w-full font-bold border-b text-white border-gray-300 mb-4 p-4">Starting Proficiencies Options</div>
                                        {characterClass.proficiency_choices.map((proficiency, index)=>
                                            <div className="px-3" key={index}>
                                                <div className="font-bold py-2>">{proficiency.desc}</div>
                                                {proficiency.choose == 2 ? (
                                                    <div>
                                                        {proficiency.from.options.map((option, index) => 
                                                            <div>{option.item.name}</div>
                                                        )}
                                                    </div>):(
                                                    <div>
                                                        {proficiency.from.options.map((option) =>
                                                            <div>
                                                                <div className="font-bold py-2">{option.choice.desc}</div>
                                                                {option.choice.from.options.map((deeper_option, index)=>
                                                                    <div>{deeper_option.item.name}</div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ):('')}
                                
                            </div>
                            <div className="col-span-1">
                                {characterClass.starting_equipment ? (
                                    <div>
                                        <div className="text-xl w-full font-bold border-b text-white border-gray-300 mb-4 p-4">Starting Equipment</div>
                                        {characterClass.starting_equipment.map((equip, index) => 
                                            <div onClick={()=> {
                                                setEquipPop(!equipPop)
                                                setEquipPopUrl(equip.equipment.url)
                                            }} key={index} className="px-3">
                                                {equip.equipment.name}
                                            </div>
                                        )}
                                    </div>
                                ):('')}
                                {characterClass.starting_equipment_options ? (
                                    <div>
                                        <div className="text-xl w-full font-bold border-b text-white border-gray-300 mb-4 p-4">Starting Equipment Options</div>
                                        {characterClass.starting_equipment_options.map((option, index)=>
                                            <div key={index} className="px-3">                            
                                                    {option.desc}
                                            </div>
                                        )}
                                    </div>
                                ):('')}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            {subclassPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full lg:w-3/4 h-3/4 overflow-y-scroll">
                    <SubclassPop subclassPop={subclassPop} setSubclassPop={setSubclassPop} subclassUrl={characterClass.subclasses[0].url} />
                </div>
            </div> 
            ) : null}
            {profPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-xs w-full lg:w-3/4 ">
                    <ProfPopup profPop={profPop} setProfPop={setProfPop} proficiencyUrl={profPopUrl} />
                </div>
            </div> 
            ) : null}
            {skillPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full lg:w-3/4 overflow-y-scroll">
                    <SkillPopup skillPop={skillPop} setSkillPop={setSkillPop} skillUrl={skillPopUrl} />
                </div>
            </div> 
            ) : null}
            {equipPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="h-3/4 bg-white rounded-lg p-6 max-w-2xl w-full lg:w-3/4 overflow-y-scroll">
                    <EquipmentPopup equipPop={equipPop} setEquipPop={setEquipPop} equipmentUrl={equipPopUrl}  />
                </div>
            </div> 
            ) : null}
            {classLevelPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="h-3/4 bg-white rounded-lg p-6 max-w-lg w-full lg:w-3/4 overflow-y-scroll">
                    <ClassLevels classLevelPop={classLevelPop} setClassLevelPop={setClassLevelPop} classLevelUrl={characterClass.class_levels}  />
                </div>
            </div> 
            ) : null}
            {classSpellPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="h-2/3 bg-white rounded-lg p-6 max-w-xs w-full lg:w-3/4 overflow-y-scroll">
                    <ClassSpells classSpellPop={classSpellPop} setClassSpellPop={setClassSpellPop} classSpellUrl={characterClass.spells}  />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default ClassView