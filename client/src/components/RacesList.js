import React, { useEffect, useState } from "react";
import Race from "./Race";

function RacesList({setReferenceUrl}){
    const [racesList, setRacesList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/races')
        .then(r => r.json())
        .then (data => setRacesList(data.results))
    }, [])

    const racesToDisplay = racesList.map((race, index) => {
        return(
            <div>
                <Race key={index} name={race.name} index={race.index} url={race.url} setReferenceUrl={setReferenceUrl} />
            </div>
        )
    })

    return(
        <div>
            <div>Races</div>
            {racesToDisplay}
        </div>
    )
}

export default RacesList