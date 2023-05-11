import React, { useEffect, useState } from "react";
import Proficiency from "./Proficiency";
import Trait from "./Trait";
import ProfPopup from "./ProfPopup";
import TraitPopup from "./TraitPopup";

function RaceView({raceUrl, setProficiencyUrl, setTraitUrl}){
    const [race, setRace] = useState({})
    const [traitPop, setTraitPop] = useState(false)
    const [traitPopUrl, setTraitPopUrl] = useState()
    const [profPop, setProfPop] = useState(false)
    const [profPopUrl, setProfPopUrl] = useState()

    useEffect(()=>{
        fetch(raceUrl)
            .then(r => r.json())
            .then(data => setRace(data))
    }, [raceUrl])

    console.log(race)

    return(
        <div>
            <div className="text-white text-5xl font-bold pl-4 pb-10">{race.name}</div>
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                <div className="text-4xl font-bold border-b border-gray-300 text-white px-3 mb-2 pb-2">Race Information</div> 
                    <div className="">
                        <div className="px-4">Speed: {race.speed}</div>
                        <div className="text-xl p-4 w-1/4 font-bold border-b text-white border-gray-300 mb-4">Ability Bonuses</div>
                        {race.ability_bonuses ? (
                            <div>
                                {race.ability_bonuses.map((score, index) => 
                                    <div className="px-4" key={index}>
                                        {score.ability_score.name}: {score.bonus}
                                    </div>
                                )
                            }</div>
                            ) : ('')}
                        <div className="text-xl p-4 w-1/4 font-bold border-b text-white border-gray-300 mb-4">Alignment</div>
                        <div className="px-4">{race.alignment}</div>
                        <div className="text-xl p-4 w-1/4 font-bold border-b text-white border-gray-300 mb-4">Age</div>
                        <div className="px-4">{race.age}</div>
                        <div className="text-xl p-4 w-1/4 font-bold border-b text-white border-gray-300 mb-4">Size: {race.size}</div>
                        <div className="px-4">{race.size_description}</div>
                        {race.starting_proficiencies && race.starting_proficiencies.length !== 0 ? (
                            <div>
                                <div className="text-xl p-4 w-60 font-bold border-b text-white border-gray-300 mb-4">Starting Proficiencies</div>
                                {race.starting_proficiencies.map((sp, index) => 
                                    <div onClick={()=>{
                                        setProfPop(!profPop)
                                        setProfPopUrl(sp.url)
                                    }} className="px-4" key={index}>{sp.name}</div>
                                    )}
                            </div>
                        ):('')}
                        {race.starting_proficiency_options ? (
                            <div>
                                <div className="text-xl p-4 w-1/4 font-bold border-b text-white border-gray-300 mb-4">Starting Proficiencies Options</div>
                            </div>
                        ):('')}
                        {race.starting_proficiency_options ? (
                            <div>
                                {race.starting_proficiency_options.from.options.map((option, index) => 
                                    <div onClick={()=>{
                                        setProfPop(!profPop)
                                        setProfPopUrl(option.item.url)
                                    }} className="px-4" key={index}>{option.item.name}</div>
                                    )}
                            </div>
                        ):('')}
                        {race.languages ? (
                            <div>
                                <div className="text-xl p-4 w-1/4 font-bold border-b text-white border-gray-300 mb-4">Languages</div>
                                <div className="px-4">{race.language_desc}</div>
                                {race.languages.map((language, index) => 
                                    <div className="px-4" key={index}>
                                        {language.name}
                                    </div>
                                )}
                            </div>
                        ): ('')}
                        {race.language_options ? (
                            <div>
                                <div className="text-xl p-4 w-1/4 font-bold border-b text-white border-gray-300 mb-4">Languages Options</div>
                                {race.language_options.from.options.map((language, index) => 
                                    <div className="px-4" key={index}>
                                        {language.item.name}
                                    </div>
                                )}
                            </div>
                        ):('')}
                        {race.traits && race.traits.length !== 0 ? (
                            <div>
                                <div className="text-xl p-4 w-1/4 font-bold border-b text-white border-gray-300 mb-4">Traits</div>
                                {race.traits.map((trait, index) => 
                                    <div onClick={()=>{
                                        setTraitPop(!traitPop)
                                        setTraitPopUrl(trait.url)
                                    }} className="px-4" key={index}>{trait.name}</div>
                                )}
                            </div>
                        ):('')}
                    </div>
            </div>
            {traitPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full lg:w-3/4 overflow-y-scroll">
                    <TraitPopup traitPop={traitPop} setTraitPop={setTraitPop} traitUrl={traitPopUrl} />
                </div>
            </div> 
            ) : null}
            {profPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-xs w-full lg:w-3/4 ">
                    <ProfPopup profPop={profPop} setProfPop={setProfPop} proficiencyUrl={profPopUrl} />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default RaceView