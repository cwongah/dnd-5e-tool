import React, { useEffect, useState } from "react";
import Race from "./Race";

function TraitPopup({traitUrl, setRaceUrl, traitPop, setTraitPop}){
    const [trait, setTrait] = useState({})

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co${traitUrl}`)
            .then(r => r.json())
            .then(data => setTrait(data))
    }, [])

    return(
        <div>
            <div className="text-lg font-bold mb-4 border-b border-gray-300">{trait.name}</div>
            {trait.desc ? (<div className="px-3">{trait.desc}</div>):('')}
            {trait.races && trait.races.length !== 0 ? (
                <div>
                    <div className="font-bold pt-3">Races</div>
                    {trait.races.map((race, index)=>
                        <div className="px-3" key={index}>{race.name}</div>
                    )}
                </div>
            ):('')}
             <div className="flex justify-center">
                <button onClick={()=> setTraitPop(!traitPop)} className='w-1/4 h-1/4 py-2 ml-10  mt-3 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default TraitPopup