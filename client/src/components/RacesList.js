import React, { useEffect, useState } from "react";
import Race from "./Race";
import RacePopup from "./RacePopup";

function RacesList({setRaceUrl}){
    const [racesList, setRacesList] = useState([])
    const [racePop, setRacePop] = useState(false)
    const [url, setUrl] = useState()
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/races')
        .then(r => r.json())
        .then (data => setRacesList(data.results))
    }, [])

    const racesToDisplay = racesList.map((race, index) => {
        return(
            // <div>
            //     <Race key={index} name={race.name} index={race.index} url={race.url} setRaceUrl={setRaceUrl} />
            // </div>
            <div key={index} className="bg-white rounded-md shadow-md p-4 cursor-pointer">
            <div onClick={()=> {
                setRacePop(!racePop)
                setUrl(race.url)
                }}
                className="text-lg font-bold"    
            >
                {race.name}
            </div>
        </div>
        )
    })

    return(
        // <div>
        //     <div>Races</div>
        //     {racesToDisplay}
        // </div>
        <div className="bg-white bg-opacity-50  px-4 py-8 mx-20 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold border-b border-gray-300 mb-4 pb-5 text-white">Races</h2>
            <div className="grid grid-cols-3 gap-10 px-3">
                {racesToDisplay}
            </div>
            {racePop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center overflow-y-scroll">
                <div className="h-3/4 bg-white rounded-lg p-6 max-w-4xl w-full lg:w-3/4 overflow-y-scroll">
                    <RacePopup racePop={racePop} setRacePop={setRacePop} raceUrl={url} />
                </div>
            </div> 
            ) : null}
        </div> 
    )
}

export default RacesList