import React from "react";
import { useNavigate } from "react-router-dom";

function Character({name, level, url, id, setCharacterId}){

    const navigate = useNavigate()
    
    function handleCharacterClick(){
        setCharacterId(id)
        navigate(`/characters/${name}`)
    }

    // return(
    //     <div onClick={handleCharacterClick}>
    //         <div>{name}</div><div>{level}</div>
    //     </div>
    // )
    return (
        <div onClick={handleCharacterClick} className="bg-white rounded-md shadow-md p-4 cursor-pointer">
          <div className="text-lg font-bold">{name}</div>
          <div className="text-sm text-gray-500">Level: {level}</div>
        </div>
      );
      
}

export default Character