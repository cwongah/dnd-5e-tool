import React, { useState, useEffect } from "react";
import Feature from "./Feature";
import { json, useNavigate } from "react-router-dom";

function LevelUp({characterId, token, setFeatureUrl, referenceTable}){
    const [character, setCharacter] = useState()
    const [levelUpData, setLevelUpData] = useState()
    const [newAs, setNewAs] = useState({'str': 0, 'dex': 0, 'con': 0, 'int': 0, 'wis': 0, 'cha': 0})
    const [asCount, setAsCount] = useState(0)
    const [newFeatureIds, setNewFeatureIds] = useState([])
    const navigate = useNavigate()

    // console.log(characterId)
    
    function handleLevelUp(){
        fetch(`http://127.0.0.1:5555/characters/${characterId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                "level": character.level + 1,
                "armor_class": (character.dexterity + parseInt(newAs['dex']) - 10)/2 > 0 ? Math.floor((character.dexterity + parseInt(newAs['dex']) - 10)/2) + 10 : Math.ceil((character.dexterity + parseInt(newAs['dex']) - 10)/2) + 10,
                "hit_points": (character.constitution + parseInt(newAs['con']) - 10)/2 > 0 ? Math.floor((character.constitution + parseInt(newAs['con'])-10)/2) + character.hit_points + Math.floor(Math.random() * character.hit_die) + 1 : Math.ceil((character.constitution + parseInt(newAs['con'])-10)/2) + character.hit_points + Math.floor(Math.random() * character.hit_die) + 1,
                "hit_die_total": character.hit_die_total + 1,
                "passive_perception": (character.wisdom + parseInt(newAs['wis']) - 10)/2 > 0 ? Math.floor((character.wisdom + parseInt(newAs['wis']) - 10)/2) + 10 : Math.ceil((character.wisdom + parseInt(newAs['wis']) - 10)/2) + 10,
                "proficiency_bonus": levelUpData.prof_bonus,
                "strength": character.strength + parseInt(newAs['str']),
                "dexterity": character.dexterity + parseInt(newAs['dex']),
                "constitution": character.constitution + parseInt(newAs['con']),
                "intelligence": character.intelligence + parseInt(newAs['int']),
                "wisdom": character.wisdom + parseInt(newAs['wisdom']),
                "charisma": character.charisma + parseInt(newAs['cha']),
                "strength_saving_throw": (character.strength + parseInt(newAs['str']) - 10)/2 > 0 ? Math.floor((character.strength + parseInt(newAs['str']) - 10)/2) : Math.ceil((character.strength + parseInt(newAs['str']) - 10)/2),
                "dexterity_saving_throw": (character.dexterity + parseInt(newAs['dex']) - 10)/2 > 0 ? Math.floor((character.dexterity + parseInt(newAs['dex']) - 10)/2) : Math.ceil((character.dexterity + parseInt(newAs['dex']) - 10)/2),
                "constitution_saving_throw": (character.constitution + parseInt(newAs['con']) - 10)/2 > 0 ? Math.floor((character.constitution + parseInt(newAs['con']) - 10)/2) : Math.ceil((character.constitution + parseInt(newAs['con']) - 10)/2),
                "intelligence_saving_throw": (character.intelligence + parseInt(newAs['int']) - 10)/2 > 0 ? Math.floor((character.intelligence + parseInt(newAs['int']) - 10)/2) : Math.ceil((character.intelligence + parseInt(newAs['int']) - 10)/2),
                "wisdom_saving_throw": (character.wisdom + parseInt(newAs['wis']) - 10)/2 > 0 ? Math.floor((character.wisdom + parseInt(newAs['wis']) - 10)/2) : Math.ceil((character.wisdom + parseInt(newAs['wis']) - 10)/2),
                "charisma_saving_throw": (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2),
                "spellcasting_ability": ()=> {switch(character.character_classes[0].name){
                    case 'Barbarian':
                        return 0
                    case 'Bard':
                        return (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2)
                    case 'Cleric':
                        return (character.wisdom + parseInt(newAs['wis']) - 10)/2 > 0 ? Math.floor((character.wisdom + parseInt(newAs['wis']) - 10)/2) : Math.ceil((character.wisdom + parseInt(newAs['wis']) - 10)/2)
                    case 'Druid':
                        return (character.wisdom + parseInt(newAs['wis']) - 10)/2 > 0 ? Math.floor((character.wisdom + parseInt(newAs['wis']) - 10)/2) : Math.ceil((character.wisdom + parseInt(newAs['wis']) - 10)/2)
                    case 'Fighter':
                        return 0
                    case 'Monk':
                        return 0
                    case 'Paladin':
                        return (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2)
                    case 'Ranger':
                        return (character.wisdom + parseInt(newAs['wis']) - 10)/2 > 0 ? Math.floor((character.wisdom + parseInt(newAs['wis']) - 10)/2) : Math.ceil((character.wisdom + parseInt(newAs['wis']) - 10)/2)
                    case 'Rogue':
                        return 0
                    case 'Sorcerer':
                        return (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2)
                    case 'Warlock':
                        return (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2)
                    case 'Wizard':
                        return (character.intelligence + parseInt(newAs['int']) - 10)/2 > 0 ? Math.floor((character.intelligence + parseInt(newAs['int']) - 10)/2) : Math.ceil((character.intelligence + parseInt(newAs['int']) - 10)/2)
                }},
                "spellcasting_attack": ()=> {switch(character.character_classes[0].name){
                    case 'Barbarian':
                        return 0
                    case 'Bard':
                        return (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus
                    case 'Cleric':
                        return (character.wisdom + parseInt(newAs['wis']) - 10)/2 > 0 ? Math.floor((character.wisdom + parseInt(newAs['wis']) - 10)/2) + character.proficiency_bonus : Math.ceil((character.wisdom + parseInt(newAs['wis']) - 10)/2) + character.proficiency_bonus
                    case 'Druid':
                        return (character.wisdom + parseInt(newAs['wis']) - 10)/2 > 0 ? Math.floor((character.wisdom + parseInt(newAs['wis']) - 10)/2) + character.proficiency_bonus : Math.ceil((character.wisdom + parseInt(newAs['wis']) - 10)/2) + character.proficiency_bonus
                    case 'Fighter':
                        return 0
                    case 'Monk':
                        return 0
                    case 'Paladin':
                        return (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus
                    case 'Ranger':
                        return (character.wisdom + parseInt(newAs['wis']) - 10)/2 > 0 ? Math.floor((character.wisdom + parseInt(newAs['wis']) - 10)/2) + character.proficiency_bonus : Math.ceil((character.wisdom + parseInt(newAs['wis']) - 10)/2) + character.proficiency_bonus
                    case 'Rogue':
                        return 0
                    case 'Sorcerer':
                        return (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus
                    case 'Warlock':
                        return (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus
                    case 'Wizard':
                        return (character.intelligence + parseInt(newAs['int']) - 10)/2 > 0 ? Math.floor((character.intelligence + parseInt(newAs['int']) - 10)/2) + character.proficiency_bonus : Math.ceil((character.intelligence + parseInt(newAs['int']) - 10)/2) + character.proficiency_bonus
                }},
                "spellcasting_save": ()=> {switch(character.character_classes[0].name){
                    case 'Barbarian':
                        return 0
                    case 'Bard':
                        return (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus + 8 : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus + 8
                    case 'Cleric':
                        return (character.wisdom + parseInt(newAs['wis']) - 10)/2 > 0 ? Math.floor((character.wisdom + parseInt(newAs['wis']) - 10)/2) + character.proficiency_bonus + 8 : Math.ceil((character.wisdom + parseInt(newAs['wis']) - 10)/2) + character.proficiency_bonus + 8
                    case 'Druid':
                        return (character.wisdom + parseInt(newAs['wis']) - 10)/2 > 0 ? Math.floor((character.wisdom + parseInt(newAs['wis']) - 10)/2) + character.proficiency_bonus + 8 : Math.ceil((character.wisdom + parseInt(newAs['wis']) - 10)/2) + character.proficiency_bonus + 8
                    case 'Fighter':
                        return 0
                    case 'Monk':
                        return 0
                    case 'Paladin':
                        return (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus + 8 : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus + 8
                    case 'Ranger':
                        return (character.wisdom + parseInt(newAs['wis']) - 10)/2 > 0 ? Math.floor((character.wisdom + parseInt(newAs['wis']) - 10)/2) + character.proficiency_bonus + 8 : Math.ceil((character.wisdom + parseInt(newAs['wis']) - 10)/2) + character.proficiency_bonus + 8
                    case 'Rogue':
                        return 0
                    case 'Sorcerer':
                        return (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus + 8 : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus + 8
                    case 'Warlock':
                        return (character.charisma + parseInt(newAs['cha']) - 10)/2 > 0 ? Math.floor((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus + 8 : Math.ceil((character.charisma + parseInt(newAs['cha']) - 10)/2) + character.proficiency_bonus + 8
                    case 'Wizard':
                        return (character.intelligence + parseInt(newAs['int']) - 10)/2 > 0 ? Math.floor((character.intelligence + parseInt(newAs['int']) - 10)/2) + character.proficiency_bonus + 8 : Math.ceil((character.intelligence + parseInt(newAs['int']) - 10)/2) + character.proficiency_bonus + 8
                }},
            })
        })
        newFeatureIds.map((featureId)=> {
            fetch('http://127.0.0.1:5555/character_features',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "character_id": characterId,
                    "feature_id": featureId
                })
            })
                .then(r=>r.json())
                .then(data=>console.log(data))
        })
        navigate(`/characters/${character.name}`)
        console.log('levelup')
    }

    useEffect(() => {
        if(token && token != '' && token != undefined){
            fetch(`http://127.0.0.1:5555/characters/${characterId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
                .then(r => r.json())
                .then(data => {
                    setCharacter(data)
                })
        }
    }, [])

    useEffect(()=>{
        setAsCount(Object.values(newAs).reduce((acc, val)=> acc + parseInt(val), 0))
    },[newAs])

    useEffect(()=> {
        if(character && character.character_classes != [] && character.character_classes != undefined){
            fetch(`https://www.dnd5eapi.co/api/classes/${character.character_classes[0].name.toLowerCase()}/levels`)
                .then(r=>r.json())
                .then(data=>{
                    setLevelUpData(data.filter((level)=>level.level == character.level + 1)[0])
                })
        }
    },[character])

    useEffect(()=>{
        (levelUpData && levelUpData.features) ? setNewFeatureIds(levelUpData.features.map((feature)=> referenceTable.filter((reference)=> reference.name == feature.name)[0].object_id)) : setNewFeatureIds('')
    }, [levelUpData])

    console.log(newFeatureIds)

    return(
        <div>
            <div>Level Up</div>
                {levelUpData ? (
                    <div>
                        {levelUpData.level ? <div>Level: {levelUpData.level}</div>:null}
                        {levelUpData.prof_bonus? <div>Proficiency Bonus: {levelUpData.prof_bonus}</div> :null}
                        {levelUpData.features && levelUpData.features[0].name != 'Ability Score Improvement' ? levelUpData.features.map((feature, index)=>
                            <Feature key={index} name={feature.name} url={feature.url} setFeatureUrl={setFeatureUrl} />
                        ) :null}
                        {levelUpData.features && levelUpData.features[0].name == 'Ability Score Improvement' ? 
                            <div>
                                <div>Increase one ability score of your choice by 2 or two ability scores of your choice by 1.</div>
                                <label>Strength: </label>
                                <input placeholder="0" type="number" min={0} max={asCount == 2 ? 1 : 2} step={1} onChange={(e)=>setNewAs(prevState => ({...prevState, str: e.target.value}))} disabled={asCount == 2 && newAs['str'] == 0} />
                                <label>Dexterity: </label>
                                <input placeholder="0" type="number" min={0} max={asCount == 2 ? 1 : 2} step={1} onChange={(e)=>setNewAs(prevState => ({...prevState, dex: e.target.value}))} disabled={asCount == 2 && newAs['dex'] == 0} />
                                <label>Constitution: </label>
                                <input placeholder="0" type="number" min={0} max={asCount == 2 ? 1 : 2} step={1} onChange={(e)=>setNewAs(prevState => ({...prevState, con: e.target.value}))} disabled={asCount == 2 && newAs['con'] == 0} />
                                <label>Intelligence: </label>
                                <input placeholder="0" type="number" min={0} max={asCount == 2 ? 1 : 2} step={1} onChange={(e)=>setNewAs(prevState => ({...prevState, int: e.target.value}))} disabled={asCount == 2 && newAs['int'] == 0} />
                                <label>Wisdom: </label>
                                <input placeholder="0" type="number" min={0} max={asCount == 2 ? 1 : 2} step={1} onChange={(e)=>setNewAs(prevState => ({...prevState, wis: e.target.value}))} disabled={asCount == 2 && newAs['wis'] == 0} />
                                <label>Charisma: </label>
                                <input placeholder="0" type="number" min={0} max={asCount == 2 ? 1 : 2} step={1} onChange={(e)=>setNewAs(prevState => ({...prevState, cha: e.target.value}))} disabled={asCount == 2 && newAs['cha'] == 0} />
                            </div>
                         :null}
                        {levelUpData.class_specific ? Object.keys(levelUpData.class_specific).map((key, index)=>(
                            <div key={index}>{key.replace(/_/g, ' ')}: {levelUpData.class_specific[key]}</div>
                        )):null}
                        <button onClick={handleLevelUp} >Level Up!</button>
                    </div>
                ):null}
        </div>
    )
}

export default LevelUp