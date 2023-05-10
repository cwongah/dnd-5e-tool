import React from "react";
import { useNavigate } from "react-router-dom";

function CharacterClass({name, index, url, setClassUrl}){
    const navigate = useNavigate()

    function handleClick(){
        setClassUrl(`https://www.dnd5eapi.co${url}`)
        navigate(`/classes/${name}`)
    }

    return(
        <div className="bg-white rounded-md shadow-md p-4 cursor-pointer">
          <div className="text-lg font-bold">{name}</div>
        </div>
    )
}

export default CharacterClass