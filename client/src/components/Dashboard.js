import React, { useEffect, useState } from "react";
import Character from "./Character";
import Encounter from "./Encounter";

function Dashboard({userId, setEncounterId, setCharacterId, referenceTable}){
    const [userData, setUserData] = useState({})
    console.log(userData)
    useEffect(()=>{
        fetch(`http://127.0.0.1:5555/users/${userId}`)
            .then(r=>r.json())
            .then(data=>(setUserData(data)))
    }, [])

    return(
        <div>
            <div>Dashboard</div>
            {userData && userData.characters ? userData.characters.map((character, index)=>
                <Character key={index} setCharacterId={setCharacterId} name={character.name} level={character.level} id={character.id} />
            ):null}
            {userData && userData.encounters ? userData.encounters.map((encounter, index)=>
                <Encounter key={index} referenceTable={referenceTable} setEncounterId={setEncounterId} name={encounter.name} id={encounter.id} userId={userData.id} />
            ):null}
        </div>
    )
}

export default Dashboard