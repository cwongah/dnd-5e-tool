import React, { useState, useEffect } from "react";

function EncounterView({token, encounterId, referenceTable}){
    // const [user, setUser] = useState([])
    const [encounter, setEncounter] = useState({})
    const [encounterCharId, setEncounterCharId] = useState([])
    const [encounterChars, setEncounterChars] = useState([])
    const [initiativeOrder, setInitiativeOrder] = useState([])
    const [initiativeRolled, setInitiativeRolled] = useState(false)
    const [dieRoll, setDieRoll] = useState()
    console.log(encounter)
    console.log(encounterCharId)
    console.log(encounterChars)
    console.log(initiativeOrder)

    function initiativeRoller(){
        let characterInitiativeRolls = (encounterChars.map(char => {
            return (char.dexterity_saving_throw + Math.floor(Math.random()*20) + 1) > 0 ? {'name': char.name, 'initiative': char.dexterity_saving_throw + Math.floor(Math.random()*20) + 1} : {'name': char.name, 'initiative': 1}
        }))
        console.log(characterInitiativeRolls)
        setInitiativeOrder(()=> characterInitiativeRolls.sort((a, b) => {
            if (a.initiative > b.initiative) return -1
            if (a.initiative < b.initiative) return 1
            return 0
        }))
        setInitiativeRolled(true)
    }

    function rollD20(){
        setDieRoll(Math.floor(Math.random()*20)+1)
    }

    function rollD12(){
        setDieRoll(Math.floor(Math.random()*12)+1)
    }

    function rollD10(){
        setDieRoll(Math.floor(Math.random()*10)+1)
    }

    function rollD8(){
        setDieRoll(Math.floor(Math.random()*8)+1)
    }

    function rollD6(){
        setDieRoll(Math.floor(Math.random()*6)+1)
    }

    function rollD4(){
        setDieRoll(Math.floor(Math.random()*4)+1)
    }

    useEffect(() => {
        if(token && token != '' && token != undefined){
            fetch(`http://127.0.0.1:5555/encounters/${encounterId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
                .then(r => r.json())
                .then(data => {
                    setEncounter(data)
                    let charId = data.characters.map(char=>char.id)
                    setEncounterCharId(charId)
                })
        }
    }, [])

    useEffect(()=>{
        if(encounterCharId.length > 0){
            encounterCharId.map(id =>{
                fetch(`http://127.0.0.1:5555/characters/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(r=>r.json())
                .then(data=>setEncounterChars(prevChars => [...prevChars, data]))
            })
        }
    },[encounterCharId])
    
    // useEffect(() => {
    //     setUser(referenceTable.filter(reference => reference.class_type === 'user' && reference.object_id === encounter.user_id))
    //   }, [])
    
    return(
        <div>
            <div>Encounter Page</div>
            {initiativeRolled ? 
                <div>
                    {initiativeOrder.map(char=><div>{char.name}: {char.initiative}</div>)}
                    <button onClick={initiativeRoller} >Reroll Initiative</button>
                </div>:
                <div>
                    <div>name: {encounter.name} </div>
                    {/* {user[0] && user.length > 0 ? (<div>{user[0].name}</div>) : (<div>Loading...</div>)} */}
                    <div>Characters</div>
                    {encounter.characters && encounter.characters.length > 0 ? (<div>{encounter.characters.map((character, index)=>(<div key={index}>{character.name} - level:{character.level}</div>))}</div>) : (<div>Loading...</div>)}
                    <button onClick={initiativeRoller} >Roll for Initiative!</button>
                </div>
            }
            <div>Die Roller</div>
            <div>{dieRoll}</div>
            <div>
                <button onClick={rollD20}>D20</button>
                <button onClick={rollD12}>D12</button>
                <button onClick={rollD10}>D10</button>
                <button onClick={rollD8}>D8</button>
                <button onClick={rollD6}>D6</button>
                <button onClick={rollD4}>D4</button>
            </div>
        </div>
    )
}

export default EncounterView