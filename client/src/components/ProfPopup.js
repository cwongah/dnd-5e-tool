import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";
import Race from "./Race";

function ProfPopup({proficiencyUrl, setRaceUrl, setClassUrl, profPop, setProfPop}){
    const [proficiency, setProficiency] = useState({})

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co${proficiencyUrl}`)
            .then(r => r.json())
            .then(data => setProficiency(data))
    }, [])

    return(
        <div>
            <div className="text-lg font-bold mb-4 border-b border-gray-300">{proficiency.name}</div>
            {proficiency.type && proficiency.type !== '' ? (
                <div>
                        <div className="font-bold">Type</div>
                        <div className="px-3">{proficiency.type}</div>
                </div>
            ):('')}
            {proficiency.classes && proficiency.classes.length !== 0 ? (
                <div>
                    <div className="font-bold">Classes</div>
                    {proficiency.classes.map((character_class, index)=>
                        <div className="px-3" key={index}>{character_class.name}</div>
                    )}
                </div>
            ):('')}
            {proficiency.races && proficiency.races.length !== 0 ? (
                <div>
                    <div className="font-bold">Races</div>
                    {proficiency.races.map((race, index)=>
                        <div key={index}>{race.name}</div>
                    )}
                </div>
            ):('')}
            <div className="flex justify-center">
                <button onClick={()=> setProfPop(!profPop)} className='w-1/4 h-1/4 py-2 ml-10  mt-3 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default ProfPopup