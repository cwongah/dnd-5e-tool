import React, { useState, useEffect } from "react";
import { DefaultContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

function EncounterCreation({setEncounterId, setReferenceTable, referenceTable, userId, token}){
    const [encounterName, setEncounterName] = useState('')
    const [searchedChar, setSearchedChar] = useState('')
    const [encounterChars, setEncounterChars] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('http://127.0.0.1:5555/references')
            .then(r => r.json())
            .then(data => {
                setReferenceTable(data)
            })
    }, [])

    function handleEncounterNameChange(e){
        setEncounterName(e.target.value)
    }
    function handleCharSearchChange(e){
        setSearchedChar(e.target.value)
    }
    function addCharacter(){
        let char = referenceTable.filter((char)=> char.name == searchedChar && char.class_type == 'character')
        console.log(char)
        try{
            if(char.length === 0){
                alert("Character not found")
                throw new Error("Character not found")
            }
            // let newChar = {char[0].name: char[0]}
            setEncounterChars([...encounterChars, {'name': char[0].name, 'id': char[0].object_id }])
        } catch(error){
            console.error(error)
        }
    }
    function handleRemoveCharacter(id){
        setEncounterChars(encounterChars.filter(char => char.id !== id))
    }
    function handleEncounterCreation(){
        fetch('http://127.0.0.1:5555/encounters',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({"name": encounterName, "user_id": userId})
        })
        .then(r=>r.json())
        .then(data => handleEncounterRelationships(data.id))
    }

    function handleEncounterRelationships(id){
        encounterChars.map(char =>{
            fetch('http://127.0.0.1:5555/encounter_characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"encounter_id": id, "character_id": char.id})
            })
            .then(r=>r.json())
            .then(data=>console.log(data))
        })
        fetch('http://127.0.0.1:5555/references')
            .then(r => r.json())
            .then(data => {
                setReferenceTable(data)
            })
        setEncounterId(id)
        navigate(`/encounters/${id}`)
    }

    return(
        <div>
            <div className="text-white text-5xl font-bold pl-4 pb-10">Encounter Creation</div>
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1">
                    <div className="text-4xl w-3/4 font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2">Encounter Information</div>
                        <div className="px-6">
                            <div>
                                <input 
                                    onChange={handleEncounterNameChange} 
                                    value={encounterName} 
                                    type="text" 
                                    placeholder="Encounter Name" 
                                    className="block w-1/4 px-4 pt-6 my-4 border-b border-gray-300 shadow-sm placeholder-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-transparent text-white"
                                />
                            </div>
                            <div className="flex items-center gap-8">
                                <input 
                                    onChange={handleCharSearchChange} 
                                    value={searchedChar} 
                                    type="text" 
                                    placeholder="Search Characters" 
                                    className="block w-1/4 px-4 my-4 border-b border-gray-300 shadow-sm placeholder-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-transparent text-white"
                                />
                                <button className='w-1/5 my-5 py-1 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg' onClick={addCharacter}>Add Character</button>
                            </div>
                            <div>
                                <button className='w-3/4 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg' onClick={handleEncounterCreation} >Create Encounter</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                    <div className="text-4xl w-3/4 font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2">Added Characters</div>
                        {encounterChars.map((char)=>(
                            <div key={char.id} className="flex items-center gap-3 px-6">
                                <div>{char.name}</div>
                                <button className='w-1/5 my-5 py-1 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg' onClick={()=> handleRemoveCharacter(char.id)} >Remove Character</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EncounterCreation