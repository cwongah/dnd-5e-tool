import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";
import Subclass from "./Subclass";

function SpellPopup({spellUrl, setClassUrl, setSubclassUrl, setSpellPop, spellPop}){
    const [spell, setSpell] = useState({})

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co${spellUrl}`)
            .then(r => r.json())
            .then(data => setSpell(data))
    }, [])

    console.log(spell)

    return(
        <div>
            {spell ? (<div>
                <div className="text-lg font-bold mb-4 border-b border-gray-300">{spell.name}</div>
                <div className="text-md font-bold">Description</div>
                <div className="px-3">{spell.desc}</div>
                <div className="px-3">{spell.higher_level}</div>
                <div className="text-md font-bold">Range</div>
                <div className="px-3">{spell.range}</div>
                <div className="text-md font-bold">Components</div>
                <div className="px-3">{spell.components}</div>
                {spell.material ? (
                    <div>
                        <div className="text-md font-bold">Materials</div>
                        <div className="px-3">{spell.material}</div>
                    </div>
                ): null}
                {spell.area_of_effect ? (
                    <div>
                        <div className="text-md font-bold">
                            Area of Effect
                        </div>
                        <div className="px-3">
                            {spell.area_of_effect.type}: {spell.area_of_effect.size}
                        </div>
                    </div>
                ):('')}
                {spell.concentration ? (
                    <div>
                        <div className="text-md font-bold">
                            Concentration
                        </div>
                        <div className="px-3">
                            {spell.concentration.toString()}
                        </div>
                    </div>
                ):('')}
                {spell.casting_time ? (
                    <div>
                        <div className="text-md font-bold">
                            Casting Time
                        </div>
                        <div className="px-3">
                            {spell.casting_time}
                        </div>
                    </div>
                ):('')}
                {spell.attack_type ? (
                    <div>
                        <div className="text-md font-bold">
                            Attack Type
                        </div>
                        <div className="px-3">
                            {spell.attack_type}: {spell.damage.damage_type.name}
                        </div>
                    </div>
                ):('')}
                {spell.damage ? (
                    <div>
                        <div className="text-md font-bold">
                            Damage by Level
                        </div>
                        {Object.entries(spell.damage.damage_at_slot_level).map(([key, value])=>(
                            <div className="px-3">
                                Level {key}: {value}
                            </div>
                        ))}
                    </div>
                ):('')}
                {spell.school ? (
                    <div>
                        <div className="text-md font-bold">
                            School
                        </div>
                        <div className="px-3">
                            {spell.school.name}
                        </div>
  
                    </div>
                ):('')}
                {spell.classes && spell.classes.length > 0 ? (
                    <div>
                        <div className="text-md font-bold">
                            Classes
                        </div>
                        {spell.classes.map((characterClass, index) => (
                            <div key={index} className="px-3">{characterClass.name}</div>
                        ))}
                    </div>
                ):('')}
                {spell.subclasses && spell.subclasses.length > 0 ? (
                    <div>
                        <div className="text-md font-bold">
                            Subclasses
                        </div>
                        {spell.subclasses.map((subclass, index) => (
                            <div className="px-3" key={index}>{subclass.name}</div>
                        ))}
                    </div>
                ):('')}
            </div>):('')}
            <div className="flex justify-center">
                <button onClick={()=> setSpellPop(!spellPop)} className='w-1/4 h-1/4 py-2 ml-10  mt-3 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default SpellPopup