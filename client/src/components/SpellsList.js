import React, { useEffect, useState } from "react";
import Spell from "./Spell";

function SpellsList({setReferenceUrl}){
    const [spellsList, setSpellsList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/spells')
        .then(r => r.json())
        .then (data => setSpellsList(data.results))
    }, [])

    const spellsToDisplay = spellsList.map((spell) => {
        return(
            <div>
                <Spell key={spell.index} name={spell.name} index={spell.index} url={spell.url} setReferenceUrl={setReferenceUrl} />
            </div>
        )
    })

    return(
        <div>
            <div>Spells</div>
            {spellsToDisplay}
        </div>
    )
}

export default SpellsList