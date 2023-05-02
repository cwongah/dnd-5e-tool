import React from "react";
import { useNavigate } from "react-router-dom";

function Equipment({name, index, url, setEquipmentUrl}){
    const navigate = useNavigate()

    function handleClick(){
        setEquipmentUrl(`https://www.dnd5eapi.co${url}`)
        navigate(`/equipment/${name}`)
    }

    return(
        <div onClick={handleClick}>
            <div>{name}</div>
        </div>
    )
}

export default Equipment