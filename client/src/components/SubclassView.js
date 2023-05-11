import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spell from "./Spell";
import SpellPopup from "./SpellPopup";

function SubclassView({subclassUrl, setCurrentSubclass, setSpellUrl, setSubclassLevelUrl}){
    const [subclass, setSubclass] = useState({})
    const navigate = useNavigate()
    const [spellPop, setSpellPop] = useState(false)
    const [spellPopUrl, setSpellPopUrl] = useState()

    console.log(subclass)

    function handleSubClassLevelClick(){
        setCurrentSubclass(subclass.name)
        setSubclassLevelUrl(`https://www.dnd5eapi.co${subclass.subclass_levels}`)
        navigate(`/subclasses/${subclass.name}/levels`)
    }

    useEffect(()=>{
        fetch(subclassUrl)
            .then(r => r.json())
            .then(data => setSubclass(data))
    }, [subclassUrl]) 

    return(
        <div>
            <div className="text-white text-5xl font-bold pl-4 pb-10">{subclass.name}</div>
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                <div className="text-xl p-4 w-60 font-bold border-b text-white border-gray-300 mb-4">Class</div>
                {subclass.class ? (<div className="text-md px-3 mb-4 py-2 w-1/2">{subclass.class.name}</div>):('')}
                {subclass.desc ? (
                    <div>
                        <div className="text-xl p-4 w-60 font-bold border-b text-white border-gray-300 mb-4">Description:</div>
                        <div className="px-3">{subclass.desc}</div>
                    </div>
                ):('')}
                {subclass.subclass_flavor ? (<div className="p-3">Subclass Flavor: {subclass.subclass_flavor}</div>):('')}
                {subclass.spells && subclass.spells.length !== 0 ? (
                    <div>
                        <div className="text-xl p-4 w-60 font-bold border-b text-white border-gray-300 mb-4">Spells:</div>
                        {subclass.spells.map((spell, index)=>
                            <div onClick={()=>{
                                setSpellPop(!spellPop)
                                setSpellPopUrl(spell.spell.url)
                            }} key={index} className="px-3">{spell.spell.name}</div>
                        )}
                    </div>
                ):('')}
            </div>
            {spellPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="h-3/4 bg-white rounded-lg p-6 max-w-2xl w-full lg:w-3/4 overflow-y-scroll">
                    <SpellPopup spellPop={spellPop} setSpellPop={setSpellPop} spellUrl={spellPopUrl}  />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default SubclassView