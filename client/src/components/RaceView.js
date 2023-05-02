import React, { useEffect, useState } from "react";
import Proficiency from "./Proficiency";
import Trait from "./Trait";

function RaceView({raceUrl, setProficiencyUrl, setTraitUrl}){
    const [race, setRace] = useState({})

    useEffect(()=>{
        fetch(raceUrl)
            .then(r => r.json())
            .then(data => setRace(data))
    }, [])

    return(
        <div>
            <div>Race Page</div>
            <div>{race.name}</div>
            <div>{race.speed}</div>
            {race.ability_bonuses ? (<div>{race.ability_bonuses.map((score, index) => <div key={index}>{score.ability_score.name}: {score.bonus}</div>)}</div>) : ('')}
            <div>{race.alignment}</div>
            <div>{race.age}</div>
            <div>{race.size}</div>
            <div>{race.size_description}</div>
            {race.starting_proficiencies ? (
                <div>
                    {race.starting_proficiencies.map((sp, index) => 
                        <Proficiency key={index} name={sp.name} url={sp.url} setProficiencyUrl={setProficiencyUrl} />
                    )}
                </div>
            ):('')}
            {race.starting_proficiency_options ? (<div>{race.starting_proficiency_options.desc} Choose {race.starting_proficiency_options.choose}.</div>):('')}
            {race.starting_proficiency_options ? (
                <div>
                    {race.starting_proficiency_options.from.options.map((option, index) => 
                        <Proficiency key={index} name={option.item.name} url={option.item.url} setProficiencyUrl={setProficiencyUrl} />
                    )}
                </div>
            ):('')}
            <div>{race.language_desc}</div>
            {race.languages ? (<div>{race.languages.map((language, index) => <div key={index}>{language.name}</div>)}</div>): ('')}
            {race.language_options ? (<div>{race.language_options.from.options.map((language, index) => <div key={index}>{language.item.name}</div>)}</div>):('')}
            {race.traits ? (
                <div>
                    {race.traits.map((trait, index) => 
                        <Trait key={index} name={trait.name} url={trait.url} setTraitUrl={setTraitUrl} />
                    )}
                </div>
            ):('')}
        </div>
    )
}

export default RaceView