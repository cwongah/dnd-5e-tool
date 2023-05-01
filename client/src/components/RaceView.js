import React, { useEffect, useState } from "react";

function RaceView({referenceUrl}){
    const [race, setRace] = useState({})

    useEffect(()=>{
        fetch(referenceUrl)
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
            {race.starting_proficiencies ? (<div>{race.starting_proficiencies.map((sp, index) => <div key={index}>{sp.name}</div>)}</div>):('')}
            {race.starting_proficiency_options ? (<div>{race.starting_proficiency_options.desc} Choose {race.starting_proficiency_options.choose}.</div>):('')}
            {race.starting_proficiency_options ? (<div>{race.starting_proficiency_options.from.options.map((option, index) => <div key={index}>{option.item.name}</div>)}</div>):('')}
            <div>{race.language_desc}</div>
            {race.languages ? (<div>{race.languages.map((language, index) => <div key={index}>{language.name}</div>)}</div>): ('')}
            {race.language_options ? (<div>{race.language_options.from.options.map((language, index) => <div key={index}>{language.item.name}</div>)}</div>):('')}
            {race.traits ? (<div>{race.traits.map((trait, index) => <div key={index}>{trait.name}</div>)}</div>):('')}
        </div>
    )
}

export default RaceView