import React, { useEffect, useState } from "react";
import Feature from "./Feature";
import Proficiency from "./Proficiency";
import Trait from "./Trait";

function CharacterCreation({setFeatureUrl, setProficiencyUrl, setTraitUrl}){
    const classes = [{'name': 'Barbarian','subclass': 'Berserker'},{'name': 'Bard','subclass': 'Lore'},{'name': 'Cleric','subclass': 'Life'},{'name': 'Druid','subclass': 'Land'},{'name': 'Fighter','subclass': 'Champion'},{'name': 'Monk','subclass': 'Open-Hand'},{'name': 'Paladin','subclass': 'Devotion'},{'name': 'Ranger','subclass': 'Hunter'},{'name': 'Rogue','subclass': 'Thief'},{'name': 'Sorcerer','subclass': 'Draconic'},{'name': 'Warlock','subclass': 'Fiend'},{'name': 'Wizard','subclass': 'Evocation'}]
    const races = ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Half-Orc', 'Halfing', 'Human', 'Tiefling']
    const [selectedClass, setSelectedClass] = useState('')
    const [classData, setClassData] = useState('')
    const [featureData, setFeatureData] = useState('')
    const [checkedSkill, setCheckedSkill] = useState({})
    const [checkedRaceSkill, setCheckedRaceSkill] = useState({})
    const [checkedEquip, setCheckedEquip] = useState({})
    const [selectedSubclass, setSelectedSubclass] = useState('')
    const [subclassData, setSubclassData] = useState('')
    const [selectedRace, setSelectedRace] = useState('')
    const [raceData, setRaceData] = useState('')
    const [prof, setProf] = useState([])
    const [checkedProf, setCheckedProf] = useState('')
    const [traitData, setTraitData] = useState([])
    // console.log(selectedClass)
    // console.log(classData)
    // console.log(featureData)
    // console.log(selectedSubclass)
    // console.log(subclassData)
    // console.log(selectedRace)
    // console.log(raceData)
    // console.log(checkedSkill)
    // console.log(prof)

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
        .then(data => {
            setRaceData(data)
            setProf(data.starting_proficiencies ? data.starting_proficiencies.map((prof)=>prof): [])
        })
    },[selectedRace])

    function handleClassSelection(e){
        setSelectedClass(e.target.value)
        let subclass = classes.filter((characterClass)=>characterClass.name===e.target.value)[0].subclass
        setSelectedSubclass(subclass)
        setCheckedSkill({})
        setCheckedEquip({})
    }
    function handleRaceSelection(e){
        setSelectedRace(e.target.value)
        setProf([])
        setCheckedRaceSkill({})
    }
    function removeSkillChoice(choice){
        const {[choice]: value, ...removedSkill} = checkedSkill
        return removedSkill
    }
    function handleSkillChoiceChange(e){
        e.target.checked ? setCheckedSkill({...checkedSkill, [e.target.name]:e.target.checked}): setCheckedSkill(removeSkillChoice(e.target.name))
    }
    function removeRaceSkillChoice(choice){
        const {[choice]: value, ...removedRaceSkill} = checkedRaceSkill
        return removedRaceSkill
    }
    function handleRaceSkillChoiceChange(e){
        e.target.checked ? setCheckedRaceSkill({...checkedRaceSkill, [e.target.name]:e.target.checked}): setCheckedRaceSkill(removeRaceSkillChoice(e.target.name))
    }
    function removeEquipChoice(choice){
        const {[choice]: value, ...removedEquip} = checkedEquip
        return removedEquip
    }
    function handleEquipChoiceChange(e){
        e.target.checked ? setCheckedEquip({...checkedEquip, [e.target.name]:e.target.checked}): setCheckedEquip(removeEquipChoice(e.target.name))
    }
    function removeProfChoice(choice){
        const {[choice]: value, ...removedProf} = checkedProf
        return removedProf
    }
    function handleProfChoiceChange(e){
        e.target.checked ? setCheckedProf({...checkedEquip, [e.target.name]:e.target.checked}): setCheckedProf(removeProfChoice(e.target.name))
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
                    {prof !== [] ? (
                        <div>
                            <div>Starting Proficiencies</div>
                            <div>
                                {prof.map((proficiency, index)=>
                                    <Proficiency key={index} name={proficiency.name} url={proficiency.url} setProficiencyUrl={setProficiencyUrl} />
                                    )}
                            </div>
                        </div>
                    ):('')}
                </div>
                <div>
                    {raceData.starting_proficiency_options && raceData.name == 'Dwarf' ? (
                        <div>
                            <div>{raceData.starting_proficiency_options.desc}</div>
                            {raceData.starting_proficiency_options.from.options.map((option, index)=>
                                <div key={index}>
                                    <input type="checkbox" name={option.item.name} disabled={Object.keys(checkedProf).length >= raceData.starting_proficiency_options.choose && !checkedProf[`${option.item.name}`]} onChange={handleProfChoiceChange} />
                                    <label>{option.item.name}</label>
                                </div>
                            )}
                        </div>
                    ):('')}
                    {raceData.starting_proficiency_options && raceData.name == 'Half-Elf' ? (
                        <div>
                            <div>Choose two from the following skills</div>
                            {raceData.starting_proficiency_options.from.options.map((option, index)=>
                                <div key={index}>
                                    <input type="checkbox" name={option.item.name} disabled={Object.keys(checkedRaceSkill).length >= raceData.starting_proficiency_options.choose && !checkedRaceSkill[`${option.item.name}`]} onChange={handleRaceSkillChoiceChange} />
                                    <label>{option.item.name}</label>
                                </div>
                            )}
                        </div>
                    ):('')}
                </div>
                <div>
                    {classData.proficiency_choices && classData.name != 'Monk' ? (
                        <div>
                            <div>
                                {classData.proficiency_choices[0].desc}
                                {classData.proficiency_choices[0].from.options.map((option, index)=>
                                                <div key={index}>
                                                    <input type="checkbox" name={option.item.name} disabled={Object.keys(checkedSkill).length >= classData.proficiency_choices[0].choose  && !checkedSkill[`${option.item.name}`] } onChange={handleSkillChoiceChange} />
                                                    <label>{option.item.name}</label>
                                                </div>
                                            )}
                            </div>
                            {classData.proficiency_choices[1] ? (
                                <div>
                                    {classData.proficiency_choices[1].desc}
                                    {classData.proficiency_choices[1].from.options.map((option, index)=>
                                                    <div key={index}>
                                                        <input type="checkbox" name={option.item.name} disabled={Object.keys(checkedEquip).length >= classData.proficiency_choices[1].choose  && !checkedEquip[`${option.item.name}`] } onChange={handleEquipChoiceChange} />
                                                        <label>{option.item.name}</label>
                                                    </div>
                                                )}
                                </div>
                            ):('')}
                        </div>
                    ):('')}
                    {classData.proficiency_choices && classData.name == 'Monk' ? (
                        <div>
                            <div>
                                {classData.proficiency_choices[0].desc}
                                {classData.proficiency_choices[0].from.options.map((option, index)=>
                                                <div key={index}>
                                                    <input type="checkbox" name={option.item.name} disabled={Object.keys(checkedSkill).length >= classData.proficiency_choices[0].choose  && !checkedSkill[`${option.item.name}`] } onChange={handleSkillChoiceChange} />
                                                    <label>{option.item.name}</label>
                                                </div>
                                            )}
                            </div>
                            {classData.proficiency_choices[1] ? (
                                <div>
                                    {classData.proficiency_choices[1].desc}
                                    {classData.proficiency_choices[1].from.options.map((option, index)=>
                                                    option.choice.from.options.map((deeper_option, index)=>     
                                                        <div key={index}>
                                                            <input type="checkbox" name={deeper_option.item.name} disabled={Object.keys(checkedEquip).length >= classData.proficiency_choices[1].choose  && !checkedEquip[`${deeper_option.item.name}`] } onChange={handleEquipChoiceChange} />
                                                            <label>{deeper_option.item.name}</label>
                                                        </div>
                                                    )
                                                )}
                                </div>
                            ):('')}
                        </div>
                    ):('')}
                </div>
            </form>
        </div>
    )
}

export default CharacterCreation