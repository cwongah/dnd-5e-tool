import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";
import Race from "./Race";

function ProficiencyView({proficienyUrl, setRaceUrl, setClassUrl}){
    const [proficieny, setProficiency] = useState({})

    useEffect(()=>{
        fetch(proficienyUrl)
            .then(r => r.json())
            .then(data => setProficiency(data))
    }, [])

    return(
        <div>
            <div>Proficiency Page</div>
            <div>{proficieny.name}</div>
            {proficieny.classes ? (
                <div>
                    {proficieny.classes.map((character_class, index)=>
                        <CharacterClass key={index} name={character_class.name} index={character_class.index} url={character_class.url} setClassUrl={setClassUrl} />
                    )}
                </div>
            ):('')}
            {proficieny.races ? (
                <div>
                    {proficieny.races.map((race, index)=>
                        <Race key={index} name={race.name} index={race.index} url={race.url} setRaceUrl={setRaceUrl} />
                    )}
                </div>
            ):('')}
        </div>
    )
}

export default ProficiencyView