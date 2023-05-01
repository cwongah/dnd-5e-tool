import React from "react";
import { useNavigate } from "react-router-dom";

function Encounter({id, name, user_id, setEncounterId, referenceTable}){
    
    const navigate = useNavigate()

    function handleEncounterClick(){
        setEncounterId(id)
        navigate(`/encounters/${id}`)
    }

    const user = referenceTable.filter((reference) => reference.class_type == 'user' && reference.object_id == user_id)

    return(
        <div onClick={handleEncounterClick}>
            <div>{name}</div><div>{user[0].name}</div>
        </div>
    )
}

export default Encounter