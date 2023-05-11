import React, { useEffect, useState } from "react";
import Race from "./Race";
import RacePopup from "./RacePopup";

function TraitView({traitUrl, setRaceUrl}){
    const [trait, setTrait] = useState({})
    const [racePop, setRacePop] = useState(false)
    const [racePopUrl, setRacePopUrl] = useState()

    useEffect(()=>{
        fetch(traitUrl)
            .then(r => r.json())
            .then(data => setTrait(data))
    }, [traitUrl])

    return(
        <div>
            <div className="text-white text-5xl font-bold pl-4 pb-10">{trait.name}</div>
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                {trait.desc ? (
                    <div>
                        <div className="text-xl p-4 w-1/4 font-bold border-b text-white border-gray-300 mb-4">
                            Description
                        </div>
                        <div className="px-3">
                            {trait.desc}
                        </div>
                    </div>
                ):('')}
                {trait.races && trait.races.length !== 0 ? (
                    <div>
                        <div className="text-xl p-4 w-1/4 font-bold border-b text-white border-gray-300 mb-4">Races</div>
                        {trait.races.map((race, index)=>
                            <div onClick={()=>{
                                setRacePop(!racePop)
                                setRacePopUrl(race.url)
                            }} className="px-3" key={index}>{race.name}</div>
                        )}
                    </div>
                ):('')}
            </div>
            {racePop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-4xl w-full lg:w-3/4 h-3/4 overflow-y-scroll">
                    <RacePopup racePop={racePop} setRacePop={setRacePop} raceUrl={racePopUrl} />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default TraitView 