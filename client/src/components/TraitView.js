import React, { useEffect, useState } from "react";
import Race from "./Race";

function TraitView({traitUrl, setRaceUrl}){
    const [trait, setTrait] = useState({})

    useEffect(()=>{
        fetch(traitUrl)
            .then(r => r.json())
            .then(data => setTrait(data))
    }, [])

    return(
        <div>
            <div>Trait Page</div>
            <div>{trait.name}</div>
            {trait.desc ? (<div>{trait.desc}</div>):('')}
            {trait.races ? (
                <div>
                    {trait.races.map((race, index)=>
                        <Race key={index} name={race.name} index={race.index} url={race.url} setRaceUrl={setRaceUrl} />
                    )}
                </div>
            ):('')}
            
        </div>
    )
}

export default TraitView