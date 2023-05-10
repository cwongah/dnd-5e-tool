import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ClassPopup({classUrl, setCurrentClass, setClassSpellUrl, classPop, setClassPop}){
    const navigate = useNavigate()

    const [characterClass, setCharacterClass] = useState({})

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co${classUrl}`)
            .then(r => r.json())
            .then(data => {
                setCharacterClass(data)
                setCurrentClass(data.name)
            })
    }, [])

    // function handleSpellsClick(){
    //     setClassSpellUrl(`https://www.dnd5eapi.co${characterClass.spells}`)
    //     navigate(`/classes/${characterClass.name}/spells`)
    // }

    return(
        <div className="text-sm">
            <div className="text-lg font-bold mb-4 border-b border-gray-300">{characterClass.name}</div>
            <div className="grid grid-cols-2 gap-8">
                <div className="col-span-1">
                    <div className="text-md font-bold mb-4 border-b py-2 w-3/4 border-gray-300">Basic Information</div>
                    {characterClass.subclasses ? (
                        <div>
                            {characterClass.subclasses.map((subclass, index)=>
                                <div key={index}>Subclass: {subclass.name}</div>
                            )}
                        </div>
                    ):('')}
                    <div>Hit Die:{characterClass.hit_die}</div>
                    <div className="text-md font-bold mb-4 border-b py-2 w-3/4 border-gray-300">Saving Throws</div>
                    {characterClass.saving_throws ? (
                        <div>
                            {characterClass.saving_throws.map((saving_throw, index)=>
                            <div key={index}>
                                {saving_throw.name}
                            </div>
                            )}
                        </div>
                    ):('')}
                    <div className="text-md font-bold mb-4 border-b py-2 w-3/4 border-gray-300">Proficiencies</div>
                    {characterClass.proficiencies ? (
                        <div>
                            {characterClass.proficiencies.map((proficiency, index) => 
                                <div key={index}>{proficiency.name}</div>
                            )}
                        </div>
                    ):('')}
                    <div className="text-md font-bold mb-4 border-b py-2 w-3/4 border-gray-300">Proficiency Choices</div>
                    {characterClass.proficiency_choices && characterClass.index != 'monk' ? (
                        <div>
                            {characterClass.proficiency_choices.map((proficiency, index)=>
                                <div key={index}>
                                    <div className="font-bold">{proficiency.desc}</div>
                                    {proficiency.from.options.map((option, index) => 
                                        <div key={index}>{option.item.name}</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ):('')}
                    {characterClass.proficiency_choices && characterClass.index == 'monk' ? (
                        <div>
                            {characterClass.proficiency_choices.map((proficiency, index)=>
                                <div key={index}>
                                    <div className="font-bold">{proficiency.desc}</div>
                                    {proficiency.choose == 2 ? (
                                        <div>
                                            {proficiency.from.options.map((option, index) => 
                                                <div key={index}>{option.item.name}</div>
                                            )}
                                        </div>):(
                                        <div>
                                            {proficiency.from.options.map((option) =>
                                                <div>
                                                    <div className="font-bold">{option.choice.desc}</div>
                                                    {option.choice.from.options.map((deeper_option, index)=>
                                                        <div key={index}>{deeper_option.item.name}</div>
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
                    {characterClass.spellcasting ? (
                        <div>
                            <div className="text-md font-bold mb-4 border-b w-3/4 py-2 border-gray-300">Spellcasting</div>
                            {characterClass.spellcasting.info.map((item, index) =>
                                <div key={index}>
                                    <div>
                                        {item.name}
                                    </div>
                                    <div>
                                        {item.desc}
                                    </div>
                                </div>
                            )}
                        </div>
                    ):('')}
                    {/* {characterClass.spells ? (<div onClick={handleSpellsClick} >Spells</div>):('')} */}
                    <div className="text-md font-bold mb-4 border-b w-3/4 py-2 border-gray-300">Starting Equipment</div>
                    {characterClass.starting_equipment ? (
                        <div>
                            {characterClass.starting_equipment.map((equip, index) =>
                                <div key={index}>{equip.equipment.name}</div>
                            )}
                        </div>
                    ):('')}
                    <div className="text-md font-bold mb-4 border-b py-2 w-3/4 border-gray-300">Starting Equipment Options</div>
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
            <div className="flex justify-center">
                <button onClick={()=> setClassPop(!classPop)} className='w-1/4 h-1/4 py-2 ml-10  mt-3 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default ClassPopup