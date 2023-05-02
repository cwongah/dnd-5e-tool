import React, { useEffect, useState } from "react";
import Proficiency from "./Proficiency";

function ProficienciesList({setReferenceUrl}){
    const [proficienciesList, setProficienciesList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/proficiencies')
        .then(r => r.json())
        .then (data => setProficienciesList(data.results))
    }, [])

    const proficienciesToDisplay = proficienciesList.map((proficiency) => {
        return(
            <div>
                <Proficiency key={proficiency.index} name={proficiency.name} index={proficiency.index} url={proficiency.url} setReferenceUrl={setReferenceUrl} />
            </div>
        )
    })

    return(
        <div>
            <div>Proficiencies</div>
            {proficienciesToDisplay}
        </div>
    )
}

export default ProficienciesList