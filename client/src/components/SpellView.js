import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";
import Subclass from "./Subclass";

function SpellView({spellUrl, setClassUrl, setSubclassUrl}){
    const [spell, setSpell] = useState({})

    useEffect(()=>{
        fetch(spellUrl)
            .then(r => r.json())
            .then(data => setSpell(data))
    }, [])

    console.log(spell)

    return(
        <div>
            {spell ? (<div>
                <div>Spell Page</div>
                <div>{spell.name}</div>
                <div>{spell.desc}</div>
                <div>{spell.higher_level}</div>
                <div>{spell.range}</div>
                <div>{spell.components}</div>
                <div>{spell.material}</div>
                {spell.area_of_effect ? (<div>{spell.area_of_effect.size}/{spell.area_of_effect.type}</div>):('')}
                {spell.concentration ? (<div>{spell.concentration.toString()}</div>):('')}
                {spell.casting_time ? (<div>{spell.casting_time}</div>):('')}
                <div>{spell.level}</div>
                {spell.attack_type ? (<div>{spell.attack_type}</div>):('')}
                {spell.damage ? (<div>{spell.damage.damage_type.name}</div>) : ('')}
                {spell.damage ? (Object.entries(spell.damage.damage_at_slot_level).map(([key, value])=>(<div>{key}: {value}</div>))):('')}
                {spell.school ? (<div>{spell.school.name}</div>):('')}
                {spell.classes && spell.classes.length > 0 ? (
                    <div>
                        {spell.classes.map((characterClass, index) => (
                            <CharacterClass key={index} name={characterClass.name} url={characterClass.url} setClassUrl={setClassUrl} />
                        ))}
                    </div>
                ):('')}
                {spell.subclasses && spell.subclasses.length > 0 ? (
                    <div>
                        {spell.subclasses.map((subclass, index) => (
                            <Subclass key={index} name={subclass.name} url={subclass.url} setSubclassUrl={setSubclassUrl} />
                        ))}
                    </div>
                ):('')}
            </div>):('')}
        </div>
    )
}

export default SpellView