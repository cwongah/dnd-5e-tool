import React, { useEffect, useState } from "react";
import Spell from "./Spell";

function ClassSpells({referenceUrl, currentClass, setReferenceUrl}){
    const[spells, setSpells] = useState([])

    useEffect(()=>{
        fetch(referenceUrl)
            .then(r => r.json())
            .then(data => setSpells(data.results))
    }, [])

    console.log(spells)

    const spellsToDisplay = spells.map((spell) => {
        return(
            <div>
                <Spell key={spell.index} name={spell.name} index={spell.index} url={spell.url} setReferenceUrl={setReferenceUrl} />
            </div>
        )
    })

    return(
        <div>
            <div>{currentClass} Spells</div>
            {spellsToDisplay ? (<div>{spellsToDisplay}</div>):('')}
        </div>
    )
}

export default ClassSpells