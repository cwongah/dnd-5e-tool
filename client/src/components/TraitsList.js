import React, { useEffect, useState } from "react";
import Trait from "./Trait";

function TraitsList({setReferenceUrl}){
    const [traitsList, setTraitsList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/traits')
        .then(r => r.json())
        .then (data => setTraitsList(data.results))
    }, [])

    const traitsToDisplay = traitsList.map((trait) => {
        return(
            <div>
                <Trait key={trait.index} name={trait.name} index={trait.index} url={trait.url} setReferenceUrl={setReferenceUrl} />
            </div>
        )
    })

    return(
        <div>
            <div>Traits</div>
            {traitsToDisplay}
        </div>
    )
}

export default TraitsList