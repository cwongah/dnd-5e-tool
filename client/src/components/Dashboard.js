import React, { useEffect, useState } from "react";
import Character from "./Character";

function Dashboard({userId, setCharacterId}){
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
        </div>
    )
}

export default Dashboard