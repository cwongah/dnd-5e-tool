import React from "react";
import { useState, useEffect } from "react";
import Encounter from "./Encounter";

function EncountersList({setEncounterId, referenceTable, setEncounterUser, encounterUser}){
    const [encountersList, setEncountersList] = useState([])
    useEffect(()=> {
        fetch('http://127.0.0.1:5555/encounters')
            .then(r=>r.json())
            .then(data => {setEncountersList(data)})
    }, [])


    const encountersToDisplay = encountersList.map((encounter) => {
        return(
            <div>
                <Encounter key={encounter.id} id={encounter.id} name={encounter.name} user_id={encounter.user_id} setEncounterId={setEncounterId} referenceTable={referenceTable} setEncounterUser={setEncounterUser} encounterUser={encounterUser} />
            </div>
        )
    })

    return(
        <div>
            <div>Encounters</div>
            {encountersToDisplay}
        </div>
    )
}

export default EncountersList