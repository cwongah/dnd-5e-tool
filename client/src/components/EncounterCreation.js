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
            <div>Encounter Creation</div>
            <input onChange={handleEncounterNameChange} value={encounterName} type="text" placeholder="Encounter Name" />
            <button onClick={handleEncounterCreation} >Create Encounter</button>
            <div>
                <input onChange={handleCharSearchChange} value={searchedChar} type="text" placeholder="Search Characters" />
                <button onClick={addCharacter}>Add Character</button>
            </div>
            <div id="Character List"></div>
            {encounterChars.map((char)=>(
                <div key={char.id}>{char.name}<button onClick={()=> handleRemoveCharacter(char.id)} >Remove Character</button></div>
            ))}
        </div>
    )
}

export default EncounterCreation