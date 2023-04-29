import React, { useEffect, useState } from "react";

function CharacterView({characterId}){

    const [character, setCharacter] = useState({})

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/characters/${characterId}`)
            .then(r => r.json())
            .then(data => {
                // console.log(data)
                setCharacter(data)
            })
    }, [])

    console.log(character)
    const characterAttrToDisplay = (<div>
            <div>name: {character.name}</div> 
            <div>bio: {character.bio}</div>
            {character.character_classes && character.character_classes[0].name ? (<div>class: {character.character_classes[0].name}</div>) : (<div>Loading...</div>)}
            <div>level: {character.level}</div>
            <div>proficiency bonus:{character.proficiency_bonus}</div>
            <div>passive perception: {character.passive_perception}</div>
            <div>speed: {character.speed}</div>
            <div>armor class: {character.armor_class}</div>
            <div>hit die: {character.hit_die}</div>
            <div>hit die total: {character.hit_die_total}</div>
            <div>hit points: {character.hit_points}</div>
            <div>spellcasting ability: {character.spellcasting_ability}</div>
            <div>spellcasting save: {character.spellcasting_save}</div>
            <div>spellcasting attack: {character.spellcasting_attack}</div>
            <div>strength: {character.strength}</div>
            <div>dexterity: {character.dexterity}</div>
            <div>constitution: {character.constitution}</div>
            <div>intelligence: {character.intelligence}</div>
            <div>wisdom: {character.wisdom}</div>
            <div>charisma: {character.charisma}</div>
            <div>strength proficiency: {character.strength_proficiency? 'true': 'false'}</div>
            <div>dexterity proficiency: {character.dexterity_proficiency? 'true': 'false'}</div>
            <div>constitution proficiency: {character.constitution_proficiency? 'true': 'false'}</div>
            <div>intelligence proficiency: {character.intelligence_proficiency? 'true': 'false'}</div>
            <div>wisdom proficiency: {character.wisdom_proficiency? 'true': 'false'}</div>
            <div>charisma proficiency: {character.charisma_proficiency? 'true': 'false'}</div>
            <div>strength saving throw: {character.strength_saving_throw}</div>
            <div>dexterity saving throw: {character.dexterity_saving_throw}</div>
            <div>constitution saving throw: {character.constitution_saving_throw}</div>
            <div>intelligence saving throw: {character.intelligence_saving_throw}</div>
            <div>wisdom saving throw: {character.wisdom_saving_throw}</div>
            <div>charisma saving throw: {character.charisma_saving_throw}</div>
            {character.skills && character.skills.length > 0 ? (<div>{character.skills.map((skill, index) => (<div key={index}>{skill.name}: {skill.ability}</div>))}</div>) : (<div>Loading...</div>)}
            {character.features && character.features.length > 0 ? (<div>{character.features.map((feature, index) => (<div key={index}>{feature.name}</div>))}</div>) : (<div>Loading...</div>)}
            {character.equipments && character.equipments.length > 0 ? (<div>{character.equipments.map((equipment, index) => (<div key={index}>{equipment.name}</div>))}</div>) : (<div>Loading...</div>)}
            {character.spells && character.spells.length > 0 ? (<div>{character.spells.map((spell, index) => (<div key={index}>{spell.name}</div>))}</div>) : (<div>Loading...</div>)}
            {character.races && character.races.length > 0 ? (<div>{character.races.map((race, index) => (<div key={index}>{race.name}</div>))}</div>) : (<div>Loading...</div>)}
            {character.subclasses && character.subclasses.length > 0 ? (<div>{character.subclasses.map((subclass, index) => (<div key={index}>{subclass.name}</div>))}</div>) : (<div>Loading...</div>)}
            {character.proficiencies && character.proficiencies.length > 0 ? (<div>{character.proficiencies.map((proficiency, index) => (<div key={index}>{proficiency.name}</div>))}</div>) : (<div>Loading...</div>)}
            {character.traits && character.traits.length > 0 ? (<div>{character.traits.map((trait, index) => (<div key={index}>{trait.name}</div>))}</div>) : (<div>Loading...</div>)}
            {character.encounters && character.encounters.length > 0 ? (<div>{character.encounters.map((encounter, index) => (<div key={index}>{encounter.name}</div>))}</div>) : (<div>Loading...</div>)}
            
        </div>)

    return(
        <div>
            <div>Character Page</div>
            {characterAttrToDisplay}
        </div>
    )
}

export default CharacterView