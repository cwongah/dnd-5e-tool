import React, { useEffect, useState } from "react";
import Character from "./Character";
// import { useNavigate } from "react-router-dom";

function CharactersList({setCharacterId, token}){
    
    const [charactersList, setCharactersList] = useState([])
    useEffect(() => {
        if(token && token != '' && token != undefined){
            fetch('http://127.0.0.1:5555/characters',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(r => r.json())
            .then(data => {
                setCharactersList(data)
            })
        }
    },[])

    const charactersToDisplay = charactersList.map((character, index) => {
        return (
            <div >
                <Character key={index} id={character.id} name={character.name} level={character.level} url={character.url} setCharacterId={setCharacterId} />
            </div>
        )
    })

    return (
        <div className="bg-white bg-opacity-50  px-4 py-8 mx-20 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold border-b border-gray-300 mb-4 pb-5">Characters</h2>
          <div className="grid grid-cols-3 gap-10">
            {charactersToDisplay}
          </div>
        </div>
      );
      
}

export default CharactersList