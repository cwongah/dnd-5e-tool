import React from "react";
import { useState, useEffect } from "react";
import Encounter from "./Encounter";

function EncountersList({token, setEncounterId, referenceTable, userId}){
    const [encountersList, setEncountersList] = useState([])
    useEffect(()=> {
        if(token && token != '' && token != undefined){
            fetch('http://127.0.0.1:5555/encounters',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
                .then(r=>r.json())
                .then(data => {setEncountersList(data)})
        }
    }, [])


    const encountersToDisplay = encountersList.map((encounter, index) => {
        return(
            <div>
                <Encounter key={index} name={encounter.name} userId={userId} setEncounterId={setEncounterId} referenceTable={referenceTable} />
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