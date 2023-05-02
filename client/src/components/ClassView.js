import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ClassView({classUrl, setCurrentClass, setClassLevelUrl, setClassSpellUrl}){
    const navigate = useNavigate()

    const [characterClass, setCharacterClass] = useState({})

    useEffect(()=>{
        fetch(classUrl)
            .then(r => r.json())
            .then(data => {
                setCharacterClass(data)
                setCurrentClass(data.name)
            })
    }, [])

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
            <div>Class Page</div>
            <div>{characterClass.name}</div>
            <div>{characterClass.hit_die}</div>
            {characterClass.saving_throws ? (
                <div>
                    {characterClass.saving_throws.map((saving_throw, index)=>
                    <div key={index}>
                        {saving_throw.name}
                    </div>
                    )}
                </div>
            ):('')}
            {characterClass.subclasses ? (
                <div>
                    {characterClass.subclasses.map((subclass, index)=>
                    <div key={index}>
                        {subclass.name}
                    </div>
                    )}
                </div>
            ):('')}
            {characterClass.class_levels ? (<div onClick={handleLevelsClick}>Class Levels</div>):('')}
            {characterClass.proficiencies ? (
                <div>{characterClass.proficiencies.map((proficiency, index) => 
                    <div key={index}>
                        {proficiency.name}
                    </div>)}
                </div>
            ):('')}
            {characterClass.proficiency_choices && characterClass.index != 'monk' ? (
                <div>
                    {characterClass.proficiency_choices.map((proficiency, index)=>
                        <div key={index}>
                            {proficiency.desc}
                            {proficiency.from.options.map((option, index) => <div key={index}>{option.item.name}</div>)}
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
                                    {proficiency.from.options.map((option) => 
                                        <div>
                                            {option.item.name}
                                        </div>
                                    )}
                                </div>):(
                                <div>
                                    {proficiency.from.options.map((option) =>
                                        <div>
                                            {option.choice.desc}
                                            {option.choice.from.options.map((deeper_option)=>
                                                <div>
                                                    {deeper_option.item.name}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ):('')}
            {characterClass.spellcasting ? (
                <div>
                    <div>
                        {characterClass.spellcasting.level}
                    </div>
                    <div>
                        {characterClass.spellcasting.spellcasting_ability.name}
                    </div>
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
            {characterClass.spells ? (<div onClick={handleSpellsClick} >Spells</div>):('')}
            {characterClass.starting_equipment ? (
                <div>
                    {characterClass.starting_equipment.map((equip, index) =>
                        <div key={index}>
                            {equip.equipment.name}: {equip.quantity}
                        </div>
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
    )
}

export default ClassView