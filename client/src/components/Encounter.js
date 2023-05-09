import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Encounter({id, name, setEncounterId, referenceTable, userId}){
    
    const navigate = useNavigate()
    // const [user, setUser] = useState([])

    function handleEncounterClick(){
        setEncounterId(id)
        navigate(`/encounters/${id}`)
    }

    // setUser(referenceTable.filter((reference) => reference.class_type == 'user' && reference.object_id == userId))
    // console.log(user)

    return(
        <div onClick={handleEncounterClick}>
            <div>{name}</div><div>
            {/* {user[0].name} */}
            </div>
        </div>
    )
}

export default Encounter