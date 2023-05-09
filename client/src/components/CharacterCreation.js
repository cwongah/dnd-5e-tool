import React, { useEffect, useState } from "react";
import Feature from "./Feature";
import Proficiency from "./Proficiency";
import Trait from "./Trait";
import { useNavigate } from "react-router-dom";

function CharacterCreation({setReferenceTable, userId, setCharacterId, referenceTable, setFeatureUrl, setProficiencyUrl, setTraitUrl}){
    const navigate = useNavigate()
    const classes = [{'name': 'Barbarian','subclass': 'Berserker'},{'name': 'Bard','subclass': 'Lore'},{'name': 'Cleric','subclass': 'Life'},{'name': 'Druid','subclass': 'Land'},{'name': 'Fighter','subclass': 'Champion'},{'name': 'Monk','subclass': 'Open-Hand'},{'name': 'Paladin','subclass': 'Devotion'},{'name': 'Ranger','subclass': 'Hunter'},{'name': 'Rogue','subclass': 'Thief'},{'name': 'Sorcerer','subclass': 'Draconic'},{'name': 'Warlock','subclass': 'Fiend'},{'name': 'Wizard','subclass': 'Evocation'}]
    const races = ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Half-Orc', 'Halfling', 'Human', 'Tiefling']
    const [characterName, setCharacterName] = useState('')
    const [characterBio, setCharacterBio] = useState('')
    const [selectedClass, setSelectedClass] = useState('')
    const [passivePerception, setPassivePerception] = useState(0)
    const [ac, setAc] = useState(0)
    const [speed, setSpeed] = useState(0)
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
    const [checkedProf, setCheckedProf] = useState([])
    const [traitData, setTraitData] = useState([])
    const [strengthAS, setStrengthAS] = useState(0)
    const [dexterityAS, setDexterityAS] = useState(0)
    const [constitutionAS, setConstitutionAS] = useState(0)
    const [intelligenceAS, setIntelligenceAS] = useState(0)
    const [wisdomAS, setWisdomAS] = useState(0)
    const [charismaAS, setCharismaAS] = useState(0)
    const [asBonus, setAsBonus] = useState({'str':0, 'dex':0, 'con':0, 'int':0, 'wis':0, 'cha':0})
    const [checkedASB, setCheckedASB] = useState({})
    const [hitDie, setHitDie] = useState(0)
    const [hitPoints, setHitPoints] = useState(0)
    const [ogHitPoints, setOgHitPoints] = useState(0)
    const [abProf, setAbProf] = useState({'str':false, 'dex':false, 'con':false, 'int':false, 'wis':false, 'cha':false})
    const [pb, setPb] = useState(2)
    const [level, setLevel] = useState(1)
    const [hitDieTotal, setHitDieTotal] = useState(1)
    const [spellcasting, setSpellcasting] = useState({'scab':0, 'scat':0, 'scs':0})
    const [newChar, setNewChar] = useState({
        'name': '',
        'bio': '',
        'level': 1,
        'proficiency_bonus': 2,
        'passive_perception': 0,
        'speed': 0,
        'armor_class': 0,
        'hit_die': 0,
        'hit_die_total': 1,
        'hit_points': 0,
        'spellcasting_ability': 0,
        'spellcasting_save': 0,
        'spellcasting_attack': 0,
        'strength': 0,
        'dexterity': 0,
        'constitution': 0,
        'intelligence': 0,
        'wisdom': 0,
        'charisma': 0,
        'strength_proficiency': false,
        'dexterity_proficiency': false,
        'constitution_proficiency': false,
        'intelligence_proficiency': false,
        'wisdom_proficiency': false,
        'charisma_proficiency': false,
        'strength_saving_throw': 0,
        'dexterity_saving_throw': 0,
        'constitution_saving_throw': 0,
        'intelligence_saving_throw': 0,
        'wisdom_saving_throw': 0,
        'charisma_saving_throw': 0,
        'user_id': 1
    })

    useEffect(()=>{
        fetch('http://127.0.0.1:5555/references')
            .then(r => r.json())
            .then(data => {
                setReferenceTable(data)
            })
    }, [])

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co/api/classes/${selectedClass.toLowerCase()}`)
        .then(r=>r.json())
        .then((data) => {
            setClassData(data)
            setClassProf(data.proficiencies)
            setHitDie(data.hit_die)
            setOgHitPoints(Math.floor(Math.random()*data.hit_die)+1)
            setAbProf(addAbProf(data))
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
            setSpeed(data.speed)
        })
    },[selectedRace])

    useEffect(()=>{
        setHitPoints(ogHitPoints + Math.floor((asBonus['con'] + constitutionAS - 10)/2) > 0 ? ogHitPoints + Math.floor((asBonus['con'] + constitutionAS - 10)/2): 1)
    },[asBonus['con'], constitutionAS, selectedClass])

    useEffect(()=>{
        setPassivePerception(asBonus['wis']+wisdomAS-10 > 0 ? Math.floor((asBonus['wis'] + wisdomAS - 10)/2)+10: Math.ceil((asBonus['wis'] + wisdomAS - 10)/2)+10)
    },[asBonus['wis'], wisdomAS, selectedRace])

    useEffect(()=>{
        setAc(asBonus['dex']+dexterityAS-10 > 0 ? Math.floor((asBonus['dex'] + dexterityAS - 10)/2)+10: Math.ceil((asBonus['dex'] + dexterityAS - 10)/2)+10)
    },[asBonus['dex'], dexterityAS], selectedRace)

    useEffect(()=>{
        if(classData && classData.spellcasting){
                switch(classData.spellcasting.spellcasting_ability.index){
                    case 'cha':
                        setSpellcasting({
                            'scab': asBonus['cha']+charismaAS-10 > 0 ? Math.floor((asBonus['cha'] + charismaAS - 10)/2): Math.ceil((asBonus['cha'] + charismaAS - 10)/2),
                            'scat': asBonus['cha']+charismaAS-10 > 0 ? Math.floor((asBonus['cha'] + charismaAS - 10)/2)+pb: Math.ceil((asBonus['cha'] + charismaAS - 10)/2)+pb,
                            'scs': asBonus['cha']+charismaAS-10 > 0 ? Math.floor((asBonus['cha'] + charismaAS - 10)/2)+pb+8: Math.ceil((asBonus['cha'] + charismaAS - 10)/2)+pb+8
                        })
                        break
                    case 'wis':
                        setSpellcasting({
                            'scab': asBonus['wis']+wisdomAS-10 > 0 ? Math.floor((asBonus['wis'] + wisdomAS - 10)/2): Math.ceil((asBonus['wis'] + wisdomAS - 10)/2),
                            'scat': asBonus['wis']+wisdomAS-10 > 0 ? Math.floor((asBonus['wis'] + wisdomAS - 10)/2)+pb: Math.ceil((asBonus['wis'] + wisdomAS - 10)/2)+pb,
                            'scs': asBonus['wis']+wisdomAS-10 > 0 ? Math.floor((asBonus['wis'] + wisdomAS - 10)/2)+pb+8: Math.ceil((asBonus['wis'] + wisdomAS - 10)/2)+pb+8
                        })
                        break
                    case 'int':
                        setSpellcasting({
                            'scab': asBonus['int']+intelligenceAS-10 > 0 ? Math.floor((asBonus['int'] + intelligenceAS - 10)/2): Math.ceil((asBonus['int'] + intelligenceAS - 10)/2),
                            'scat': asBonus['int']+intelligenceAS-10 > 0 ? Math.floor((asBonus['int'] + intelligenceAS - 10)/2)+pb: Math.ceil((asBonus['int'] + intelligenceAS - 10)/2)+pb,
                            'scs': asBonus['int']+intelligenceAS-10 > 0 ? Math.floor((asBonus['int'] + intelligenceAS - 10)/2)+pb+8: Math.ceil((asBonus['int'] + intelligenceAS - 10)/2)+pb+8
                        })
                        break
            }
        }
    },[asBonus['cha'], asBonus['wis'], asBonus['int'], charismaAS, wisdomAS, intelligenceAS])

    useEffect(()=>{
        setNewChar({
            'name': characterName,
            'bio': characterBio,
            'level': level,
            'proficiency_bonus': pb,
            'passive_perception': passivePerception,
            'speed': speed,
            'armor_class': ac,
            'hit_die': hitDie,
            'hit_die_total': hitDieTotal,
            'hit_points': hitPoints,
            'spellcasting_ability': spellcasting['scab'],
            'spellcasting_attack': spellcasting['scat'],
            'spellcasting_save': spellcasting['scs'],
            'strength': asBonus['str'] + strengthAS,
            'dexterity': asBonus['dex'] + dexterityAS,
            'constitution': asBonus['con'] + constitutionAS,
            'intelligence': asBonus['int'] + intelligenceAS,
            'wisdom': asBonus['wis'] + wisdomAS,
            'charisma': asBonus['cha'] + charismaAS,
            'strength_proficiency': abProf['str'],
            'dexterity_proficiency': abProf['dex'],
            'constitution_proficiency': abProf['con'],
            'intelligence_proficiency': abProf['int'],
            'wisdom_proficiency': abProf['wis'],
            'charisma_proficiency': abProf['cha'],
            'strength_saving_throw': asBonus['str']+strengthAS-10 > 0 ? + Math.floor((asBonus['str'] + strengthAS - 10)/2): Math.ceil((asBonus['str'] + strengthAS - 10)/2),
            'dexterity_saving_throw': asBonus['dex']+dexterityAS-10 > 0 ? + Math.floor((asBonus['dex'] + dexterityAS - 10)/2): Math.ceil((asBonus['dex'] + dexterityAS - 10)/2),
            'constitution_saving_throw': asBonus['con']+constitutionAS-10 > 0 ? + Math.floor((asBonus['con'] + constitutionAS - 10)/2): Math.ceil((asBonus['con'] + constitutionAS - 10)/2),
            'intelligence_saving_throw': asBonus['int']+intelligenceAS-10 > 0 ? + Math.floor((asBonus['int'] + intelligenceAS - 10)/2): Math.ceil((asBonus['int'] + intelligenceAS - 10)/2),
            'wisdom_saving_throw': asBonus['wis']+wisdomAS-10 > 0 ? + Math.floor((asBonus['wis'] + wisdomAS - 10)/2): Math.ceil((asBonus['wis'] + wisdomAS - 10)/2),
            'charisma_saving_throw': asBonus['cha']+charismaAS-10 > 0 ? + Math.floor((asBonus['cha'] + charismaAS - 10)/2): Math.ceil((asBonus['cha'] + charismaAS - 10)/2),
            'user_id': userId
        })
    }, [characterName, characterBio, level, pb, passivePerception, speed, ac, hitDie, hitDieTotal, hitPoints, spellcasting, asBonus, strengthAS, dexterityAS, constitutionAS, intelligenceAS, wisdomAS, charismaAS, abProf])
    
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
        e.target.checked ? setCheckedProf({...checkedProf, [e.target.name]:e.target.checked}): setCheckedProf(removeProfChoice(e.target.name))
    }
    function removeASBChoice(choice){
        const {[choice]: value, ...removedASB} = checkedASB
        return removedASB
    }
    function handleASBChoiceChange(e, bonus){
        e.target.checked ? setCheckedASB({...checkedASB, [e.target.name]:e.target.checked}): setCheckedASB(removeASBChoice(e.target.name))
        e.target.checked ? setAsBonus({...asBonus, [e.target.name.toLowerCase()]: (asBonus[e.target.name.toLowerCase()] + bonus)}):setAsBonus({...asBonus, [e.target.name.toLowerCase()]: (asBonus[e.target.name.toLowerCase()] - bonus)})
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
    function addAbProf(data){
        let resetAbProf = {'str':false, 'dex':false, 'con':false, 'int':false, 'wis':false, 'cha':false}
        if(data){
            data.saving_throws.map((abp)=>{
                switch(abp.index){
                    case 'str':
                        resetAbProf['str']=true
                        break
                }
                switch(abp.index){
                    case 'dex':
                        resetAbProf['dex']=true
                        break
                }
                switch(abp.index){
                    case 'con':
                        resetAbProf['con']=true
                        break
                }
                switch(abp.index){
                    case 'int':
                        resetAbProf['int']=true
                        break
                }
                switch(abp.index){
                    case 'wis':
                        resetAbProf['wis']=true
                        break
                }
                switch(abp.index){
                    case 'cha':
                        resetAbProf['cha']=true
                        break
                }
            }) 
        }
        return(resetAbProf)
    }
    function handleCharacterSubmit(e){
        e.preventDefault()
        fetch('http://127.0.0.1:5555/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newChar)
        })
            .then(r=>r.json())
            .then(data=>createRelationships(data.id))
    }

    function createRelationships(charId){
        let classId = referenceTable.filter((ref)=> ref.name === selectedClass)[0].object_id
        fetch('http://127.0.0.1:5555/character_character_classes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"character_id": charId, "character_class_id": classId})
        })
            .then(r=>r.json())
            .then(data=>console.log(data))

        let skillIds = Object.keys(checkedSkill).map((skill)=>referenceTable.filter((ref)=> ref.name === skill && ref.class_type === 'skill')[0].object_id)
        skillIds.map((skillId)=> 
            fetch('http://127.0.0.1:5555/character_skills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"character_id": charId, "skill_id": skillId})
            })
                .then(r=>r.json())
                .then(data=>console.log(data))
        )

        let featureIds = featureData.map((feature)=>referenceTable.filter((ref)=> ref.name === feature.name)[0].object_id)
        featureIds.map((featureId)=> 
            fetch('http://127.0.0.1:5555/character_features', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"character_id": charId, "feature_id": featureId})
            })
                .then(r=>r.json())
                .then(data=>console.log(data))
        )

        let raceId = referenceTable.filter((ref)=> ref.name === selectedRace)[0].object_id
        fetch('http://127.0.0.1:5555/character_races', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"character_id": charId, "race_id": raceId})
        })
            .then(r=>r.json())
            .then(data=>console.log(data))

        let subclassId = referenceTable.filter((ref)=> ref.name === selectedSubclass)[0].object_id
        fetch('http://127.0.0.1:5555/character_subclasses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"character_id": charId, "subclass_id": subclassId})
        })
            .then(r=>r.json())
            .then(data=>console.log(data))

        let raceProfId = raceProf.map((prof)=>referenceTable.filter((ref)=> ref.name === prof.name)[0].object_id)
        let classProfId = classProf.map((prof)=>referenceTable.filter((ref)=> ref.name === prof.name)[0].object_id)
        let checkedProfId = Object.keys(checkedProf).map((prof)=>referenceTable.filter((ref)=> ref.name === prof && ref.class_type === 'proficiency' )[0].object_id)
        raceProfId.map((profId)=>
            fetch('http://127.0.0.1:5555/character_proficiencies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"character_id": charId, "proficiency_id": profId})
        })
            .then(r=>r.json())
            .then(data=>console.log(data))
        )
        classProfId.map((profId)=>
            fetch('http://127.0.0.1:5555/character_proficiencies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"character_id": charId, "proficiency_id": profId})
        })
            .then(r=>r.json())
            .then(data=>console.log(data))
        )
        checkedProfId.map((profId)=>
            fetch('http://127.0.0.1:5555/character_proficiencies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"character_id": charId, "proficiency_id": profId})
        })
            .then(r=>r.json())
            .then(data=>console.log(data))
        )
        let traitIds = traitData.map((trait)=> referenceTable.filter((ref)=> ref.name === trait.name && ref.class_type === 'trait')[0].object_id)
        traitIds.map((traitId)=>{
            fetch('http://127.0.0.1:5555/character_traits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"character_id": charId, "trait_id": traitId})
            })
            .then(r=>r.json())
            .then(data=>console.log(data))
        })

        fetch(`http://127.0.0.1:5555/characters/${charId}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"url": `http://127.0.0.1:5555/characters/${charId}`})
        })
            .then(r=>r.json())
            .then(data=>console.log(data))

        fetch('http://127.0.0.1:5555/references',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": characterName,
                "url": `http://127.0.0.1:5555/characters/${charId}`,
                "class_type": "character",
                "object_id": charId
            })
        })
            .then(r=>r.json())
            .then(data=>console.log(data))

        fetch('http://127.0.0.1:5555/references')
            .then(r => r.json())
            .then(data => {
                setReferenceTable(data)
            })

        setCharacterId(charId)
        navigate(`/characters/${charId}`)
    }

    return(
        <div>
            <div className="text-white text-5xl font-bold pl-4 pb-10">Character Creation</div>
            <div className="grid grid-cols-2 gap-8">
                <div className="col-span-1">
                    <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                        <form onSubmit={handleCharacterSubmit} >
                        <div className="text-4xl font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2">Character Information</div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="col-span-1">
                                    <input type='text'
                                        onChange={(e) => setCharacterName(e.target.value)}
                                        placeholder="Character name"
                                        className="block w-3/4 px-4 py-1 my-4 border-b border-gray-300 shadow-sm placeholder-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-transparent text-white"
                                    />
                                    <select
                                        id="class-selection"
                                        name="class-selection"
                                        onChange={handleClassSelection}
                                        className="block w-3/4 py-2 px-3 border-b border-gray-300 bg-transparent shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                                        >
                                        <option value={''} disabled selected>
                                            Select a Class
                                        </option>
                                        {classes.map((characterClass, index) => (
                                            <option key={index} value={characterClass.name}>
                                            {characterClass.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="block py-3 px-4 text-white sm:text-sm">
                                        Subclass: {selectedSubclass}
                                    </div>
                                    <select 
                                        id="race-selection" 
                                        name="race-selection" 
                                        onChange={handleRaceSelection}
                                        className="block w-3/4 py-2 px-3 border-b border-gray-300 bg-transparent shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
                                    >
                                        <option value={''} disabled selected>Select a Race</option>
                                        {races.map((race, index)=><option key={index} value={race}>{race}</option>)}
                                    </select>
                                    {raceData && raceData.ability_bonus_options ? (
                                        <div>
                                            <div className="w-3/4 text-lg font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2 pt-10">Ability Score Bonuses</div>
                                            <div className="w-3/4 text-md px-3 pb-2 py-2" >Choose {raceData.ability_bonus_options.choose} of the following:</div>
                                            {raceData.ability_bonus_options.from.options.map((option, index)=>
                                                <div key={index} className="px-3">
                                                    {/* <input type="checkbox" name={option.ability_score.name} disabled={Object.keys(checkedASB).length >= raceData.ability_bonus_options.choose && !checkedASB[`${option.ability_score.name}`]} onChange={(e) => handleASBChoiceChange(e, option.bonus)} /> */}
                                                    <input
                                                        type="checkbox"
                                                        name={option.ability_score.name}
                                                        disabled={Object.keys(checkedASB).length >= raceData.ability_bonus_options.choose && !checkedASB[`${option.ability_score.name}`]}
                                                        onChange={(e) => handleASBChoiceChange(e, option.bonus)}
                                                        className="form-checkbox h-4 w-4 text-gray-600 transition duration-150 ease-in-out"
                                                    />
                                                    <label className="px-3 text-sm">{option.ability_score.name}: +{option.bonus}</label>
                                                </div>
                                            )}
                                        </div>
                                    ):('')}
                                    <div>
                                        {raceData.starting_proficiency_options && raceData.name == 'Dwarf' ? (
                                            <div className="pb-5">
                                                <div className="w-3/4 text-lg font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2 pt-10">Proficiency Options</div>
                                                <div className="w-3/4 text-md px-3 pb-2 py-2">Choose one of the following:</div>
                                                {raceData.starting_proficiency_options.from.options.map((option, index)=>
                                                    <div key={index} className="px-3">
                                                        <input className="form-checkbox h-4 w-4 text-gray-600 transition duration-150 ease-in-out" type="checkbox" name={option.item.name} disabled={Object.keys(checkedProf).length >= raceData.starting_proficiency_options.choose && !checkedProf[`${option.item.name}`]} onChange={handleProfChoiceChange} />
                                                        <label className="px-3 text-sm">{option.item.name}</label>
                                                    </div>
                                                )}
                                            </div>
                                        ):('')}
                                        {raceData.starting_proficiency_options && raceData.name == 'Half-Elf' ? (
                                            <div className="pb-5">
                                                <div className="w-3/4 text-lg font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2 pt-10">Skill Options</div>
                                                <div className="w-3/4 text-md px-3 pb-2 py-2">Choose two of the following:</div>
                                                {raceData.starting_proficiency_options.from.options.map((option, index)=>
                                                    <div key={index} className="px-3">
                                                        <input className="form-checkbox h-4 w-4 text-gray-600 transition duration-150 ease-in-out" type="checkbox" name={option.item.name} disabled={Object.keys(checkedRaceSkill).length >= raceData.starting_proficiency_options.choose && !checkedRaceSkill[`${option.item.name}`]} onChange={handleRaceSkillChoiceChange} />
                                                        <label className="px-3 text-sm">{option.item.name}</label>
                                                    </div>
                                                )}
                                            </div>
                                        ):('')}
                                    </div>
                                    <div>
                                        {classData.proficiency_choices && classData.name != 'Monk' ? (
                                            <div className="pb-5">
                                                <div className="w-3/4 text-lg font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2 pt-10">Skill Options</div>
                                                <div>
                                                    <div className="w-3/4 text-md px-3 pb-2 py-2">Choose {classData.proficiency_choices[0].choose} of the following:</div>
                                                    {classData.proficiency_choices[0].from.options.map((option, index)=>
                                                                    <div key={index} className="px-3">
                                                                        <input className="form-checkbox h-4 w-4 text-gray-600 transition duration-150 ease-in-out" type="checkbox" name={option.item.name} disabled={Object.keys(checkedSkill).length >= classData.proficiency_choices[0].choose  && !checkedSkill[`${option.item.name}`] } onChange={handleSkillChoiceChange} />
                                                                        <label className="px-3 text-sm">{option.item.name}</label>
                                                                    </div>
                                                                )}
                                                </div>
                                                {classData.proficiency_choices[1] ? (
                                                    <div>
                                                        <div className="w-3/4 text-lg font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2 pt-10">Instrument Options</div>
                                                        <div className="w-3/4 text-md px-3 pb-2 py-2">Choose {classData.proficiency_choices[1].choose} of the following:</div>
                                                        {classData.proficiency_choices[1].from.options.map((option, index)=>
                                                                        <div key={index} className="px-3">
                                                                            <input className="form-checkbox h-4 w-4 text-gray-600 transition duration-150 ease-in-out" type="checkbox" name={option.item.name} disabled={Object.keys(checkedEquip).length >= classData.proficiency_choices[1].choose  && !checkedEquip[`${option.item.name}`] } onChange={handleEquipChoiceChange} />
                                                                            <label className="px-3 text-sm">{option.item.name}</label>
                                                                        </div>
                                                                    )}
                                                    </div>
                                                ):('')}
                                            </div>
                                        ):('')}
                                        {classData.proficiency_choices && classData.name == 'Monk' ? (
                                            <div>
                                                <div>
                                                <div className="w-3/4 text-lg font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2 pt-10">Skill Options</div>
                                                    <div className="w-3/4 text-md px-3 pb-2 py-2">Choose {classData.proficiency_choices[0].choose} of the following:</div>
                                                    {classData.proficiency_choices[0].from.options.map((option, index)=>
                                                                    <div key={index} className="px-3">
                                                                        <input className="form-checkbox h-4 w-4 text-gray-600 transition duration-150 ease-in-out" type="checkbox" name={option.item.name} disabled={Object.keys(checkedSkill).length >= classData.proficiency_choices[0].choose  && !checkedSkill[`${option.item.name}`] } onChange={handleSkillChoiceChange} />
                                                                        <label className="px-3 text-sm">{option.item.name}</label>
                                                                    </div>
                                                                )}
                                                </div>
                                                {classData.proficiency_choices[1] ? (
                                                    <div className="pb-5">
                                                        <div className="w-3/4 text-lg font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2 pt-10">Tool Options</div>
                                                        <div className="w-3/4 text-md px-3 pb-2 py-2">Choose {classData.proficiency_choices[1].choose} of the following:</div>
                                                        {classData.proficiency_choices[1].from.options.map((option, index)=>
                                                                        option.choice.from.options.map((deeper_option, index)=>     
                                                                        <div key={index} className="px-3">
                                                                                <input className="form-checkbox h-4 w-4 text-gray-600 transition duration-150 ease-in-out" type="checkbox" name={deeper_option.item.name} disabled={Object.keys(checkedEquip).length >= classData.proficiency_choices[1].choose  && !checkedEquip[`${deeper_option.item.name}`] } onChange={handleEquipChoiceChange} />
                                                                                <label className="px-3 text-sm">{deeper_option.item.name}</label>
                                                                            </div>
                                                                        )
                                                                        )}
                                                    </div>
                                                ):('')}
                                            </div>
                                        ):('')}
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <textarea
                                        className="block w-3/4 px-4 py-1 my-3 border-b  border-gray-300 shadow-sm h-8 placeholder-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-transparent text-white resize-y"
                                        onChange={(e) => setCharacterBio(e.target.value)}
                                        placeholder="Character bio"
                                    />
                                </div>
                            </div>
                            <input type="submit" value='Create Character' className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg' />
                        </form>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                    <div className="text-4xl font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2">Character Statistics</div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="col-span-1 pt-3">
                                <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 pb-2">Basic Information</div>
                                <div>Level: {level}</div> <div>Proficiency Bonus: +{pb} </div>
                                <div>Passive Perception: {passivePerception} </div>
                                <div>Speed: {speed} </div>
                                <div>Armor Class: {ac} </div>
                                <div>Hit Points: {hitPoints && hitPoints > 0 ? hitPoints:('')}</div>
                                <div>Hit Die: {hitDie}</div>
                                <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 pt-4 pb-2">Ability Scores</div>
                                <div>Strength: {strengthAS + asBonus['str']}</div>
                                <div>Dexterity: {dexterityAS + asBonus['dex']}</div>
                                <div>Constitution: {constitutionAS + asBonus['con']}</div>
                                <div>Intelligence: {intelligenceAS +asBonus['int']}</div>
                                <div>Wisdom: {wisdomAS + asBonus['wis']}</div>
                                <div>Charisma: {charismaAS + asBonus['cha']}</div>
                                <button onClick={handleReroll} className='w-3/4 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>Roll Ability Scores</button>
                                <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 pt-4 pb-2">Ability Proficiencies</div>
                                    {abProf['str'] ? <div>Strength </div>:null}
                                    {abProf['dex'] ? <div>Dexterity </div>:null}
                                    {abProf['con'] ? <div>Constitution </div>:null}
                                    {abProf['int'] ? <div>Intelligence </div>:null}
                                    {abProf['wis'] ? <div>Wisdom </div>:null}
                                    {abProf['cha'] ? <div>Charisma </div>:null}
                                    <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 pt-4 pb-2">Saving Throws</div>
                                <div>Strength Saving Throw: {asBonus['str']+strengthAS-10 > 0 ? '+' + Math.floor((asBonus['str'] + strengthAS - 10)/2): Math.ceil((asBonus['str'] + strengthAS - 10)/2)}</div>
                                <div>Dexterity Saving Throw: {asBonus['dex']+dexterityAS-10 > 0 ? '+' + Math.floor((asBonus['dex'] + dexterityAS - 10)/2): Math.ceil((asBonus['dex'] + dexterityAS - 10)/2)}</div>
                                <div>Constitution Saving Throw: {asBonus['con']+constitutionAS-10 > 0 ? '+' + Math.floor((asBonus['con'] + constitutionAS - 10)/2): Math.ceil((asBonus['con'] + constitutionAS - 10)/2)}</div>
                                <div>Intelligence Saving Throw: {asBonus['int']+intelligenceAS-10 > 0 ? '+' + Math.floor((asBonus['int'] + intelligenceAS - 10)/2): Math.ceil((asBonus['int'] + intelligenceAS - 10)/2)}</div>
                                <div>Wisdom Saving Throw: {asBonus['wis']+wisdomAS-10 > 0 ? '+' + Math.floor((asBonus['wis'] + wisdomAS - 10)/2): Math.ceil((asBonus['wis'] + wisdomAS - 10)/2)}</div>
                                <div>Charisma Saving Throw: {asBonus['cha']+charismaAS-10 > 0 ? '+' + Math.floor((asBonus['cha'] + charismaAS - 10)/2): Math.ceil((asBonus['cha'] + charismaAS - 10)/2)}</div>
                                {classData && classData.spellcasting ? (
                                    <div>
                                        <div>Spellcasting</div>
                                        <div>SpellCasting Ability: {spellcasting['scab']} </div>
                                        <div>Spellcasting Attack: {spellcasting['scat']} </div>
                                        <div>Spellcasting Save: {spellcasting['scs']} </div>
                                    </div>
                                ):null}
                            </div>
                            <div className="col-span-1 pt-3">
                                <div>
                                    <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 pb-2">Features</div>
                                    {featureData ? (
                                        <div className="mb-4 pb-2"> 
                                            {featureData.map((feature, index)=> 
                                                <Feature key={index} name={feature.name} url={feature.url} setFeatureUrl={setFeatureUrl} />
                                            )}
                                        </div>
                                    ):null}
                                </div>
                                <div>
                                    <div className="text-xl  w-3/4 font-bold border-b text-white border-gray-300 mb-4 pb-2">Traits</div>
                                        {traitData ? (
                                            <div className="mb-4 pb-2">
                                                {traitData.map((trait, index)=>
                                                    <Trait key={index} name={trait.name} url={trait.url} setTraitUrl={setTraitUrl} />
                                                )}
                                            </div>
                                        ):('')}
                                </div>
                                <div>
                                    {raceProf !== [] ? (
                                        <div>
                                            <div className="text-xl  w-3/4 font-bold border-b text-white border-gray-300 mb-4 pb-2">Starting Proficiencies</div>
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
                            </div>
                            <div className="col-span-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterCreation