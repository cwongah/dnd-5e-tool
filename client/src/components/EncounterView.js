import React, { useState, useEffect } from "react";

function EncounterView({encounterId, referenceTable}){

    const [encounter, setEncounter] = useState({})
    const [user, setUser] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/encounters/${encounterId}`)
            .then(r => r.json())
            .then(data => {
                // console.log(data)
                setEncounter(data)
            })
    }, [])

    useEffect(() => {
        setUser(referenceTable.filter(reference => reference.class_type === 'user' && reference.object_id === encounter.user_id))
      }, [encounter.user_id, referenceTable])

    // console.log(encounter)
    // setUser(referenceTable.filter((reference) => reference.class_type == 'user' && reference.object_id == encounter.user_id))
    console.log(user)

    const encounterAttrToDisplay = (
        <div>
            <div>name: {encounter.name} </div>
            {user[0] && user.length > 0 ? (<div>{user[0].name}</div>) : (<div>Loading...</div>)}
            <div>Characters</div>
            {encounter.characters && encounter.characters.length > 0 ? (<div>{encounter.characters.map((character, index)=>(<div key={index}>{character.name} - level:{character.level}</div>))}</div>) : (<div>Loading...</div>)}
        </div>
    )

    return(
        <div>
            <div>Encounter Page</div>
            {encounterAttrToDisplay}
        </div>
    )

}

export default EncounterView