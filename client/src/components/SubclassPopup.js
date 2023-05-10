import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spell from "./Spell";

function SubclassPop({subclassUrl, setSubclassPop, subclassPop}){
    const [subclass, setSubclass] = useState({})

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co${subclassUrl}`)
            .then(r => r.json())
            .then(data => setSubclass(data))
    }, [])

    return(
        <div>
            <div className="text-lg font-bold mb-4 border-b border-gray-300">{subclass.name}</div>
            {subclass.class ? (<div className="text-md font-bold mb-4 py-2 w-1/2">Class: {subclass.class.name}</div>):('')}
            {subclass.desc ? (
                <div>
                    <div className="text-md font-bold mb-4 w-1/2">Description:</div>
                    <div className="px-3">{subclass.desc}</div>
                </div>
            ):('')}
            {subclass.subclass_flavor ? (<div className="p-3">Subclass Flavor: {subclass.subclass_flavor}</div>):('')}
            {subclass.spells && subclass.spells.length !== 0 ? (
                <div>
                    <div className="text-md font-bold mb-4 w-1/2">Spells:</div>
                    {subclass.spells.map((spell, index)=>
                        <div key={index} className="px-3">{spell.spell.name}</div>
                    )}
                </div>
            ):('')}
            <div className="flex justify-center">
                <button onClick={()=> setSubclassPop(!subclassPop)} className='w-1/4 h-1/4 py-2 ml-10  mt-3 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default SubclassPop