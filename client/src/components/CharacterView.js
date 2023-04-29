import React, { useEffect, useState } from "react";

function CharacterView({characterId}){

    const [character, setCharacter] = useState({
        armor_class: "",
        bio: "",
        character_classes: [],
        charisma: "",
        charisma_proficiency: "",
        charisma_saving_throw: "",
        constitution: "",
        constitution_proficiency: "",
        constitution_saving_throw: "",
        dexterity: "",
        dexterity_proficiency: "",
        dexterity_saving_throw: "",
        encounters: [],
        equipments: [],
        features: [],
        hit_die: "",
        hit_die_total: "",
        hit_points: "",
        id: "",
        intelligence: "",
        intelligence_proficiency: "",
        intelligence_saving_throw: "",
        level: "",
        name: "",
        passive_perception: "",
        proficiencies: [],
        proficiency_bonus: "",
        races: [],
        skills: [],
        speed: "",
        spellcasting_ability: "",
        spellcasting_attack: "",
        spellcasting_save: "",
        spells: [],
        strength: "",
        strength_proficiency: "",
        strength_saving_throw: "",
        traits: [],
        url: "",
        user_id: "",
        wisdom: "",
        wisdom_proficiency: "",
        wisdom_saving_throw: "",
      })

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
            <div>{character.name}</div> 
            <div>{character.bio}</div>
            {character.character_classes && character.character_classes[0].name ? (<div>{character.character_classes[0].name}</div>) : (<div>Loading...</div>)}
            {character.encounters && character.encounters[0].name ? (<div>{character.encounters[0].name}</div>) : (<div>Loading...</div>)}
        </div>)

    return(
        <div>
            <div>Character Page</div>
            {characterAttrToDisplay}
        </div>
    )
}

export default CharacterView