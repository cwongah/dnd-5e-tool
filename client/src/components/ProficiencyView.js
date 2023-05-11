import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";
import Race from "./Race";
import ClassPopup from "./ClassPopup";
import RacePopup from "./RacePopup";

function ProficiencyView({proficiencyUrl, setRaceUrl, setClassUrl}){
    const [proficiency, setProficiency] = useState({})
    const [racePop, setRacePop] = useState(false)
    const [classPop, setClassPop] = useState(false)
    const [classPopUrl, setClassPopUrl] = useState()
    const [racePopUrl, setRacePopUrl] = useState()

    useEffect(()=>{
        fetch(proficiencyUrl)
            .then(r => r.json())
            .then(data => setProficiency(data))
    }, [proficiencyUrl])

    return(
        <div>
            <div className="text-white text-5xl font-bold pl-4 pb-10">{proficiency.name}</div>
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                <div className=" text-lg font-bold px-5">Type: {proficiency.type}</div>
                {proficiency.classes && proficiency.classes.length !== 0 ? (
                    <div>
                        <div className=" text-lg font-bold px-5">Classes</div>
                        {proficiency.classes.map((character_class, index)=>
                            <div onClick={()=>{
                                setClassPop(!classPop)
                                setClassPopUrl(character_class.url)
                            }} className="px-8" key={index}>{character_class.name}</div>
                        )}
                    </div>
                ):('')}
                {proficiency.races && proficiency.races.length !== 0 ? (
                    <div>
                        <div className=" text-lg font-bold px-5">Races</div>
                        {proficiency.races.map((race, index)=>
                            <div onClick={()=>{
                                setRacePop(!racePop)
                                setRacePopUrl(race.url)
                            }} className=" text-lg font-bold px-5" key={index}>{race.name}</div>
                        )}
                    </div>
                ):('')}
            </div>
            {classPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="h-2/3 bg-white rounded-lg p-6 max-w-6xl w-full lg:w-3/4 overflow-y-scroll">
                    <ClassPopup classPop={classPop} setClassPop={setClassPop} classUrl={classPopUrl}  />
                </div>
            </div> 
            ) : null}
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

export default ProficiencyView