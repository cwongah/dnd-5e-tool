import React, { useEffect, useState } from "react";
import Trait from "./Trait";

function TraitsList({setTraitUrl}){
    const [traitsList, setTraitsList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/traits')
        .then(r => r.json())
        .then (data => setTraitsList(data.results))
    }, [])

    const traitsToDisplay = traitsList.map((trait, index) => {
        return(
            <div>
                <Trait key={index} name={trait.name} index={trait.index} url={trait.url} setTraitUrl={setTraitUrl} />
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