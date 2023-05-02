import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";

function ClassesList({setReferenceUrl}){
    const [classesList, setClassesList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/classes')
        .then(r => r.json())
        .then (data => setClassesList(data.results))
    }, [])

    const classesToDisplay = classesList.map((characterClass) => {
        return(
            <div>
                <CharacterClass key={characterClass.index} name={characterClass.name} index={characterClass.index} url={characterClass.url} setReferenceUrl={setReferenceUrl} />
            </div>
        )
    })

    return(
        <div>
            <div>Classes</div>
            {classesToDisplay}
        </div>
    )
}

export default ClassesList