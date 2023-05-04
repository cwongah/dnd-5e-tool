import React, { useEffect, useState } from "react";
import Feature from "./Feature";

function CharacterCreation({setFeatureUrl}){
    const classes = [{'name': 'Barbarian','subclass': 'Berserker'},{'name': 'Bard','subclass': 'Lore'},{'name': 'Cleric','subclass': 'Life'},{'name': 'Druid','subclass': 'Land'},{'name': 'Fighter','subclass': 'Champion'},{'name': 'Monk','subclass': 'Open-Hand'},{'name': 'Paladin','subclass': 'Devotion'},{'name': 'Ranger','subclass': 'Hunter'},{'name': 'Rogue','subclass': 'Thief'},{'name': 'Sorcerer','subclass': 'Draconic'},{'name': 'Warlock','subclass': 'Fiend'},{'name': 'Wizard','subclass': 'Evocation'}]
    const races = ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Half-Orc', 'Halfing', 'Human', 'Tiefling']
    const [selectedClass, setSelectedClass] = useState('')
    const [classData, setClassData] = useState('')
    const [featureData, setFeatureData] = useState('')
    const [checkedSkill, setCheckedSkill] = useState({})
    const [selectedSubclass, setSelectedSubclass] = useState('')
    const [subclassData, setSubclassData] = useState('')
    const [selectedRace, setSelectedRace] = useState('')
    const [raceData, setRaceData] = useState('')
    // console.log(selectedClass)
    // console.log(classData)
    // console.log(featureData)
    // console.log(selectedSubclass)
    // console.log(subclassData)
    // console.log(selectedRace)
    // console.log(raceData)
    console.log(checkedSkill)

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co/api/classes/${selectedClass.toLowerCase()}`)
        .then(r=>r.json())
        .then(data => setClassData(data))
    },[selectedClass])

    useEffect(()=>{
        selectedClass != '' ? (
            fetch(`https://www.dnd5eapi.co/api/classes/${selectedClass.toLowerCase()}/levels`)
            .then(r=>r.json())
            .then(data => setFeatureData(data[0].features))
        ):(console.log('no class selected'))
    },[selectedClass])

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co/api/subclasses/${selectedSubclass.toLowerCase()}`)
        .then(r=>r.json())
        .then(data => setSubclassData(data))
    },[selectedSubclass])

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co/api/races/${selectedRace.toLowerCase()}`)
        .then(r=>r.json())
        .then(data => setRaceData(data))
    },[selectedRace])

    function handleClassSelection(e){
        setSelectedClass(e.target.value)
        let subclass = classes.filter((characterClass)=>characterClass.name===e.target.value)[0].subclass
        setSelectedSubclass(subclass)
    }
    function handleRaceSelection(e){
        setSelectedRace(e.target.value)
    }
    function removeSkillChoice(choice){
        const {[choice]: value, ...removedSkill} = checkedSkill
        return removedSkill
    }
    function handleSkillChoiceChange(e){
        console.log(e.target.name)
        console.log(e.target.checked)
        e.target.checked ? setCheckedSkill({...checkedSkill, [e.target.name]:e.target.checked}): setCheckedSkill(removeSkillChoice(e.target.name))
    }

    return(
        <div>
            <div>Character Creation</div>
            <form >
                <input type='text' placeholder="Character name" className="block w-1/2 px-4 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                <input type='text' placeholder="Character bio" className="block w-1/2 px-4 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                <select id="class-selection" name="class-selection" onChange={handleClassSelection}>
                    <option value={''} disabled selected>Select a Class</option>
                    {classes.map((characterClass, index)=><option key={index} value={characterClass.name}>{characterClass.name}</option>)}
                </select>
                <div>Subclass: {selectedSubclass}</div>
                <select id="race-selection" name="race-selection" onChange={handleRaceSelection}>
                    <option value={''} disabled selected>Select a Race</option>
                    {races.map((race, index)=><option key={index} value={race}>{race}</option>)}
                </select>
                <div>
                    <div>Features</div>
                    {featureData ? (
                        <div>
                            {featureData.map((feature, index)=> 
                                <Feature key={index} name={feature.name} url={feature.url} setFeatureUrl={setFeatureUrl} />
                            )}
                        </div>
                    ):('')}
                </div>
                <div>
                    {classData.proficiency_choices ? (
                        <div>
                            {classData.proficiency_choices.map((choice, index)=>{
                                let maxItems = choice.choose
                                return(
                                    <div key={index}>
                                        <div>
                                            {choice.desc}
                                        </div>
                                        {choice.from.options.map((option, index)=>
                                            <div key={index}>
                                                <input type="checkbox" name={option.item.name} disabled={Object.keys(checkedSkill).length >= maxItems  && !checkedSkill[`${option.item.name}`] } onChange={handleSkillChoiceChange} />
                                                <label>{option.item.name}</label>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ):('')}
                </div>
            </form>
        </div>
    )
}

export default CharacterCreation