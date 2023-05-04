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
    const [raceProf, setRaceProf] = useState([])
    const [classProf, setClassProf] = useState([])
    const [checkedProf, setCheckedProf] = useState('')
    const [traitData, setTraitData] = useState([])
    const [strengthAS, setStrengthAS] = useState(0)
    const [dexterityAS, setDexterityAS] = useState(0)
    const [constitutionAS, setConstitutionAS] = useState(0)
    const [intelligenceAS, setIntelligenceAS] = useState(0)
    const [wisdomAS, setWisdomAS] = useState(0)
    const [charismaAS, setCharismaAS] = useState(0)
    const [asBonus, setAsBonus] = useState({'str':0, 'dex':0, 'con':0, 'int':0, 'wis':0, 'cha':0})
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
        .then((data) => {
            setClassData(data)
            setClassProf(data.proficiencies)
        })
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
            setRaceProf(data.starting_proficiencies ? data.starting_proficiencies.map((raceProf)=>raceProf): [])
            setTraitData(data.traits ? data.traits: [])
            setAsBonus(addASBonus(data))
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
        setRaceProf([])
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
    function handleReroll(e){
        e.preventDefault()
        setStrengthAS(Math.floor(Math.random()*15)+4)
        setDexterityAS(Math.floor(Math.random()*15)+4)
        setConstitutionAS(Math.floor(Math.random()*15)+4)
        setIntelligenceAS(Math.floor(Math.random()*15)+4)
        setWisdomAS(Math.floor(Math.random()*15)+4)
        setCharismaAS(Math.floor(Math.random()*15)+4)
    }
    function addASBonus(data){
        let resetASB = {'str':0, 'dex':0, 'con':0, 'int':0, 'wis':0, 'cha':0}
        if(data){
            data.ability_bonuses.map((ab)=>{
                switch(ab.ability_score.index){
                    case 'str':
                        resetASB['str']=ab.bonus
                        break
                }
                switch(ab.ability_score.index){
                    case 'dex':
                        resetASB['dex']=ab.bonus
                        break
                }
                switch(ab.ability_score.index){
                    case 'con':
                        resetASB['con']=ab.bonus
                        break
                }
                switch(ab.ability_score.index){
                    case 'int':
                        resetASB['int']=ab.bonus
                        break
                }
                switch(ab.ability_score.index){
                    case 'wis':
                        resetASB['wis']=ab.bonus
                        break
                }
                switch(ab.ability_score.index){
                    case 'cha':
                        resetASB['cha']=ab.bonus
                        break
                }
            })
        }
        return(resetASB)
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
                <div>Level: 1</div>
                <div>Proficiency Bonus: +2 </div>
                <div>Passive Perception: </div>
                <div>Speed: </div>
                <div>Armor Class: </div>
                <div>Hit Points: </div>
                <div>Hit Die: </div>
                <div>Strength: {strengthAS + asBonus['str']}</div>
                <div>Dexterity: {dexterityAS + asBonus['dex']}</div>
                <div>Constitution: {constitutionAS + asBonus['con']}</div>
                <div>Intelligence: {intelligenceAS +asBonus['int']}</div>
                <div>Wisdom: {wisdomAS + asBonus['wis']}</div>
                <div>Charisma: {charismaAS + asBonus['cha']}</div>
                <button onClick={handleReroll}>Roll Ability Scores</button>
                <div>Strength Proficiency: </div>
                <div>Dexterity Proficiency: </div>
                <div>Constitution Proficiency: </div>
                <div>Intelligence Proficiency: </div>
                <div>Wisdom Proficiency: </div>
                <div>Charisma Proficiency: </div>
                <div>Strength Saving Throw: </div>
                <div>Dexterity Saving Throw: </div>
                <div>Constitution Saving Throw: </div>
                <div>Intelligence Saving Throw: </div>
                <div>Wisdom Saving Throw: </div>
                <div>Charisma Saving Throw: </div>
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
                    <div>Traits</div>
                    {traitData ? (
                        <div>
                            {traitData.map((trait, index)=>
                                <Trait key={index} name={trait.name} url={trait.url} setTraitUrl={setTraitUrl} />
                            )}
                        </div>
                    ):('')}
                </div>
                <div>
                    {raceProf !== [] ? (
                        <div>
                            <div>Starting Proficiencies</div>
                            <div>
                                {classProf ? (
                                    classProf.map((prof, index)=>
                                        <Proficiency key={index} name={prof.name} url={prof.url} setProficiencyUrl={setProficiencyUrl} />
                                    )
                                ):('')}
                            </div>
                            <div>
                                {raceProf.map((proficiency, index)=>
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