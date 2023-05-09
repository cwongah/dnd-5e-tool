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

    // return(
    //     <div>
    //         <div>Dashboard</div>
    //         {userData && userData.characters ? userData.characters.map((character, index)=>
    //             <Character key={index} setCharacterId={setCharacterId} name={character.name} level={character.level} id={character.id} />
    //         ):null}
    //         {userData && userData.encounters ? userData.encounters.map((encounter, index)=>
    //             <Encounter key={index} referenceTable={referenceTable} setEncounterId={setEncounterId} name={encounter.name} id={encounter.id} userId={userData.id} />
    //         ):null}
    //     </div>
    // )
    return (
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-1">
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold border-b border-gray-300 mb-4 pb-2">Characters</h2>
              {userData && userData.characters
                ? userData.characters.map((character, index) => (
                    <div key={index} className="my-4 w-full">
                      <Character
                        setCharacterId={setCharacterId}
                        name={character.name}
                        level={character.level}
                        id={character.id}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold border-b border-gray-300 mb-4 pb-2">Encounters</h2>
              {userData && userData.encounters
                ? userData.encounters.map((encounter, index) => (
                    <div key={index} className="my-4 w-full">
                      <Encounter
                        referenceTable={referenceTable}
                        setEncounterId={setEncounterId}
                        name={encounter.name}
                        id={encounter.id}
                        userId={userData.id}
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      );
      
      
      
      
      
}

export default Dashboard