import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";

function ClassesList({setClassUrl}){
    const [classesList, setClassesList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/classes')
        .then(r => r.json())
        .then (data => setClassesList(data.results))
    }, [])

    const classesToDisplay = classesList.map((characterClass, index) => {
        return(
            <div>
                <CharacterClass key={index} name={characterClass.name} index={characterClass.index} url={characterClass.url} setClassUrl={setClassUrl} />
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