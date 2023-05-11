import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";
import Subclass from "./Subclass";
import ClassPopup from "./ClassPopup";
import SubclassPop from "./SubclassPopup";

function SpellView({spellUrl, setClassUrl, setSubclassUrl}){
    const [spell, setSpell] = useState({})
    const [classPop, setClassPop] = useState(false)
    const [classPopurl, setClassPopUrl] = useState()
    const [subclassPop, setSubclassPop] = useState(false)
    const [subclassPopurl, setSubclassPopUrl] = useState()

    useEffect(()=>{
        fetch(spellUrl)
            .then(r => r.json())
            .then(data => setSpell(data))
    }, [spellUrl])

    console.log(spell)

    return(
        <div>
            {spell ? (
                <div>
                    <div className="text-white text-5xl font-bold pl-4 pb-10 border-b border-gray-300">{spell.name}</div>
                    <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                        <div className="text-xl p-4 w-full font-bold border-b text-white border-gray-300 mb-4">Description</div>
                        <div className="px-3">{spell.desc}</div>
                        <div className="px-3">{spell.higher_level}</div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="col-span-1">
                                <div className="text-xl p-4 w-3/4 font-bold border-b text-white border-gray-300 mb-4">Range</div>
                                <div className="px-3">{spell.range}</div>
                                <div className="text-xl p-4 w-3/4 font-bold border-b text-white border-gray-300 mb-4">Components</div>
                                <div className="px-3">{spell.components}</div>
                                <div className="text-xl p-4 w-3/4 font-bold border-b text-white border-gray-300 mb-4">Materials</div>
                                <div className="px-3">{spell.material}</div>
                                {spell.area_of_effect ? (
                                    <div>
                                        <div className="text-xl p-4 w-3/4 font-bold border-b text-white border-gray-300 mb-4">
                                            Area of Effect
                                        </div>
                                        <div className="px-3">
                                            {spell.area_of_effect.type}: {spell.area_of_effect.size}
                                        </div>
                                    </div>
                                ):('')}
                                {spell.concentration ? (
                                    <div>
                                        <div className="text-xl p-4 w-3/4 font-bold border-b text-white border-gray-300 mb-4">
                                            Concentration
                                        </div>
                                        <div className="px-3">
                                            {spell.concentration.toString()}
                                        </div>
                                    </div>
                                ):('')}
                                {spell.casting_time ? (
                                    <div>
                                        <div className="text-xl p-4 w-3/4 font-bold border-b text-white border-gray-300 mb-4">
                                            Casting Time
                                        </div>
                                        <div className="px-3">
                                            {spell.casting_time}
                                        </div>
                                    </div>
                                ):('')}
                                {spell.attack_type ? (
                                    <div>
                                        <div className="text-xl p-4 w-3/4 font-bold border-b text-white border-gray-300 mb-4">
                                            Attack Type
                                        </div>
                                        <div className="px-3">
                                            {spell.attack_type}: {spell.damage.damage_type.name}
                                        </div>
                                    </div>
                                ):('')}
                                {spell.damage ? (
                                    <div>
                                        <div className="text-xl p-4 w-3/4 font-bold border-b text-white border-gray-300 mb-4">
                                            Damage by Level
                                        </div>
                                        {Object.entries(spell.damage.damage_at_slot_level).map(([key, value])=>(
                                            <div className="px-3">
                                                Level {key}: {value}
                                            </div>
                                        ))}
                                    </div>
                                ):('')}
                            </div>
                            <div className="col-span-1">
                                {spell.school ? (
                                    <div>
                                        <div className="text-xl p-4 w-3/4 font-bold border-b text-white border-gray-300 mb-4">
                                            School
                                        </div>
                                        <div className="px-3">
                                            {spell.school.name}
                                        </div>

                                    </div>
                                ):('')}
                                {spell.classes && spell.classes.length > 0 ? (
                                    <div>
                                        <div className="text-xl p-4 w-3/4 font-bold border-b text-white border-gray-300 mb-4">
                                            Classes
                                        </div>
                                        {spell.classes.map((characterClass, index) => (
                                            <div onClick={()=>{
                                                setClassPop(!classPop)
                                                setClassPopUrl(characterClass.url)
                                            }} key={index} className="px-3">{characterClass.name}</div>
                                        ))}
                                    </div>
                                ):('')}
                                {spell.subclasses && spell.subclasses.length > 0 ? (
                                    <div>
                                        <div className="text-xl p-4 w-3/4 font-bold border-b text-white border-gray-300 mb-4">
                                            Subclasses
                                        </div>
                                        {spell.subclasses.map((subclass, index) => (
                                            <div onClick={()=>{
                                                setSubclassPop(!subclassPop)
                                                setSubclassPopUrl(subclass.url)
                                            }} className="px-3" key={index}>{subclass.name}</div>
                                        ))}
                                    </div>
                                ):('')}
                                
                            </div>
                        </div>
                    </div>
                </div>)
            :('')}
            {classPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="h-2/3 bg-white rounded-lg p-6 max-w-6xl w-full lg:w-3/4 overflow-y-scroll">
                    <ClassPopup classPop={classPop} setClassPop={setClassPop} classUrl={classPopurl} />
                </div>
            </div> 
            ) : null}
            {subclassPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full lg:w-3/4 h-3/4 overflow-y-scroll">
                    <SubclassPop subclassPop={subclassPop} setSubclassPop={setSubclassPop} subclassUrl={subclassPopurl} />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default SpellView