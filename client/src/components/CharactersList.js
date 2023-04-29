import React, { useEffect, useState } from "react";
import Character from "./Character";
// import { useNavigate } from "react-router-dom";

function CharactersList({setCharacterId}){
    
    const [charactersList, setCharactersList] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:5555/characters')
        .then(r => r.json())
        .then(data => {
            setCharactersList(data)
        })
    },[])
    // console.log(charactersList)


    const charactersToDisplay = charactersList.map((character) => {
        return (
            <div >
                <Character key={character.id} id={character.id} name={character.name} level={character.level} url={character.url} setCharacterId={setCharacterId} />
            </div>
        )
    })

    return(
        <div>
            <div>Characters</div>
            {charactersToDisplay}
        </div>
    )
}

export default CharactersList