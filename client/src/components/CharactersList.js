import React, { useEffect, useState } from "react";
import Character from "./Character";

function CharactersList(){
    const [charactersList, setCharactersList] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:5555/characters')
        .then(r => r.json())
        .then(data => {
            setCharactersList(data)
        })
    },[])
    console.log(charactersList)
    const charactersToDisplay = charactersList.map((character) => {
        return <Character key={character.id} name={character.name} level={character.level} url={character.url} />
    })

    return(
        <div>
            <div>Characters</div>
            {charactersToDisplay}
        </div>
    )
}

export default CharactersList