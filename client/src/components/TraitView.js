import React, { useEffect, useState } from "react";
import Race from "./Race";

function TraitView({referenceUrl, setReferenceUrl}){
    const [trait, setTrait] = useState({})

    useEffect(()=>{
        fetch(referenceUrl)
            .then(r => r.json())
            .then(data => setTrait(data))
    }, [])

    return(
        <div>
            <div>Trait Page</div>
            <div>{trait.name}</div>
            {trait.desc ? (<div>{trait.desc}</div>):('')}
            {trait.races ? (<div>{trait.races.map((race, index)=><Race key={index} name={race.name} index={race.index} url={race.url} setReferenceUrl={setReferenceUrl} />)}</div>):('')}
            
        </div>
    )
}

export default TraitView