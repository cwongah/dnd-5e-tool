import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";
import Race from "./Race";

function ProficiencyView({proficiencyUrl, setRaceUrl, setClassUrl}){
    const [proficiency, setProficiency] = useState({})

    useEffect(()=>{
        fetch(proficiencyUrl)
            .then(r => r.json())
            .then(data => setProficiency(data))
    }, [])

    return(
        <div>
            <div>Proficiency Page</div>
            <div>{proficiency.name}</div>
            {proficiency.classes ? (
                <div>
                    {proficiency.classes.map((character_class, index)=>
                        <CharacterClass key={index} name={character_class.name} index={character_class.index} url={character_class.url} setClassUrl={setClassUrl} />
                    )}
                </div>
            ):('')}
            {proficiency.races ? (
                <div>
                    {proficiency.races.map((race, index)=>
                        <Race key={index} name={race.name} index={race.index} url={race.url} setRaceUrl={setRaceUrl} />
                    )}
                </div>
            ):('')}
        </div>
    )
}

export default ProficiencyView