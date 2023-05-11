import React, { useEffect, useState } from "react";
import Proficiency from "./Proficiency";
import Trait from "./Trait";

function RacePopup({raceUrl,racePop, setRacePop}){
    const [race, setRace] = useState({})

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co${raceUrl}`)
            .then(r => r.json())
            .then(data => setRace(data))
    }, [])

    return(
        <div>
            <div className="text-lg font-bold mb-4 border-b border-gray-300">{race.name}</div>
            {/* <div className="text-md font-bold mb-4 border-b py-2 w-1/3 border-gray-300">Basic Information</div> */}
            <div>Speed: {race.speed}</div>
            <div className="text-md font-bold py-2 w-3/4">Ability Bonuses</div>
            {race.ability_bonuses ? (
                <div>
                    {race.ability_bonuses.map((score, index) => 
                        <div key={index}>
                            {score.ability_score.name}: {score.bonus}
                        </div>
                    )
                }</div>
                ) : ('')}
            <div className="text-md font-bold py-2 w-3/4">Alignment</div>
            <div>{race.alignment}</div>
            <div className="text-md font-bold py-2 w-3/4">Age</div>
            <div>{race.age}</div>
            <div className="text-md font-bold py-2 w-3/4">Size: {race.size}</div>
            <div>{race.size_description}</div>
            {race.starting_proficiencies && race.starting_proficiencies.length !== 0 ? (
                <div>
                    <div className="text-md font-bold py-2 w-3/4">Starting Proficiencies</div>
                    {race.starting_proficiencies.map((sp, index) => 
                        <div key={index}>{sp.name}</div>
                        )}
                </div>
            ):('')}
            {race.starting_proficiency_options ? (
                <div>
                    <div className="text-md font-bold py-2 w-3/4">Starting Proficiencies Options</div>
                </div>
            ):('')}
            {race.starting_proficiency_options ? (
                <div>
                    {race.starting_proficiency_options.from.options.map((option, index) => 
                        <div key={index}>{option.item.name}</div>
                        )}
                </div>
            ):('')}
            {race.languages ? (
                <div>
                    <div className="text-md font-bold py-2 w-3/4">Languages</div>
                    <div>{race.language_desc}</div>
                    {race.languages.map((language, index) => 
                        <div key={index}>
                            {language.name}
                        </div>
                    )}
                </div>
            ): ('')}
            {race.language_options ? (
                <div>
                    <div className="text-md font-bold py-2 w-3/4">Languages Options</div>
                    {race.language_options.from.options.map((language, index) => 
                        <div key={index}>
                            {language.item.name}
                        </div>
                    )}
                </div>
            ):('')}
            {race.traits ? (
                <div>
                    <div className="text-md font-bold py-2 w-3/4">Traits</div>
                    {race.traits.map((trait, index) => 
                        <div key={index}>{trait.name}</div>
                    )}
                </div>
            ):('')}
            <div className="flex justify-center">
                <button onClick={()=> setRacePop(!racePop)} className='w-1/4 h-1/4 py-2 ml-10  mt-3 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default RacePopup