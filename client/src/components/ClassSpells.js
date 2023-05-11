import React, { useEffect, useState } from "react";
import Spell from "./Spell";

function ClassSpells({classSpellUrl, currentClass, setSpellUrl, setClassSpellPop, classSpellPop}){
    const[spells, setSpells] = useState([])

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co${classSpellUrl}`)
            .then(r => r.json())
            .then(data => setSpells(data.results))
    }, [])

    console.log(spells)

    const spellsToDisplay = spells.map((spell) => {
        return(
            <div>
                <div className="px-3">{spell.name}</div>
            </div>
        )
    })

    return(
        <div>
            <div className="text-lg font-bold mb-4 py-2 border-b border-gray-300">Class Spells</div>
            {spellsToDisplay ? (<div>{spellsToDisplay}</div>):('')}
            <div className="flex justify-center">
                <button onClick={()=> setClassSpellPop(!classSpellPop)} className='w-1/4 h-1/4 py-2 ml-10  mt-3 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default ClassSpells