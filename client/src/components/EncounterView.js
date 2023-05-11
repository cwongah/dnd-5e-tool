import React, { useState, useEffect } from "react";
import d20 from '../data/dice/d20.png'
import d12 from '../data/dice/d12.png'
import d10 from '../data/dice/d10.png'
import d8 from '../data/dice/d8.png'
import d6 from '../data/dice/d6.png'
import d4 from '../data/dice/d4.png'

function EncounterView({token, encounterId, referenceTable}){
    // const [user, setUser] = useState([])
    const [encounter, setEncounter] = useState({})
    const [encounterCharId, setEncounterCharId] = useState([])
    const [encounterChars, setEncounterChars] = useState([])
    const [initiativeOrder, setInitiativeOrder] = useState([])
    const [initiativeRolled, setInitiativeRolled] = useState(false)
    const [dieRoll, setDieRoll] = useState()
    const [chosenDie, setChosenDie] = useState(d20)
    const [spin, setSpin] = useState(false)
    const [showRoll, setShowRoll] = useState(false)
    const fadeDiv = document.getElementById('fadeDiv');
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
        setTimeout(()=> setDieRoll(Math.floor(Math.random()*20)+1), 1000)
        setChosenDie(d20)
        setSpin(!spin)
        setTimeout(()=> setSpin(false), 1000)
        // fadeDiv.classList.toggle('opacity-0')
        // fadeDiv.classList.toggle('opacity-100')
        // setTimeout(()=>fadeDiv.classList.toggle('opacity-0'), 1000)
        setTimeout(()=> setShowRoll(true), 1000)
        setTimeout(()=> setShowRoll(false), 2500)
    }

    function rollD12(){
        setTimeout(()=>setDieRoll(Math.floor(Math.random()*12)+1), 1000)
        setChosenDie(d12)
        setSpin(!spin)
        setTimeout(()=> setSpin(false), 1000)
        setTimeout(()=> setShowRoll(true), 1000)
        setTimeout(()=> setShowRoll(false), 2500)
    }

    function rollD10(){
        setTimeout(()=>setDieRoll(Math.floor(Math.random()*10)+1), 1000)
        setChosenDie(d10)
        setSpin(!spin)
        setTimeout(()=> setSpin(false), 1000)
        setTimeout(()=> setShowRoll(true), 1000)
        setTimeout(()=> setShowRoll(false), 2500)
    }

    function rollD8(){
        setTimeout(()=>setDieRoll(Math.floor(Math.random()*8)+1), 1000)
        setChosenDie(d8)
        setSpin(!spin)
        setTimeout(()=> setSpin(false), 1000)
        setTimeout(()=> setShowRoll(true), 1000)
        setTimeout(()=> setShowRoll(false), 2500)
    }

    function rollD6(){
        setTimeout(()=>setDieRoll(Math.floor(Math.random()*6)+1), 1000)
        setChosenDie(d6)
        setSpin(!spin)
        setTimeout(()=> setSpin(false), 1000)
        setTimeout(()=> setShowRoll(true), 1000)
        setTimeout(()=> setShowRoll(false), 2500)
    }

    function rollD4(){
        setTimeout(()=>setDieRoll(Math.floor(Math.random()*4)+1), 1000)
        setChosenDie(d4)
        setSpin(!spin)
        setTimeout(()=> setSpin(false), 1000)
        setTimeout(()=> setShowRoll(true), 1000)
        setTimeout(()=> setShowRoll(false), 2500)
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
    
    return(
        <div>
            <div className="text-white text-5xl font-bold pl-4 pb-10">{encounter.name} </div>
            <div className="grid grid-cols-2 gap-8">
                <div className="col-span-1">
                    <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                        <div className="text-4xl font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2">Character Initiative</div>
                        {initiativeRolled ? 
                            <div>
                                <div className="flex justify-center gap-8 px-3">
                                    {initiativeOrder.map(char=>
                                        <div className=" w-1/4 mt-10 bg-teal-500 bg-opacity-70 shadow-lg shadow-teal-500/50  hover:shadow-teal-500/40 text-white text-s font-semibold rounded-lg p-5 mr-4">
                                            <div>{char.name}</div>
                                            <div>Initiative: {char.initiative}</div>
                                        </div>)}
                                </div>
                                <div className="text-center">
                                    <button className='w-2/3 my-5 py-2 mt-10 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg' onClick={initiativeRoller} >Reroll Initiative</button>
                                </div>
                            </div>:
                            <div >
                                {encounter.characters && encounter.characters.length > 0 ? (
                                    <div className="flex justify-center gap-8 px-3">
                                        {encounter.characters.map((character, index)=>(
                                            <div className=" w-1/4 mt-10 bg-teal-500 bg-opacity-70 shadow-lg shadow-teal-500/50  hover:shadow-teal-500/40 text-white text-s font-semibold rounded-lg p-2 pt-20 mr-4" key={index}>
                                                <div>{character.name}</div>
                                                <div>Level: {character.level}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>Loading...</div>
                                )}
                                <div className="text-center">
                                    <button className='w-2/3 my-5 mt-10 py-2  bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg' onClick={initiativeRoller} >Roll for Initiative!</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="relative bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                        <div className="text-4xl font-bold border-b text-white border-gray-300 px-3 mb-2 pb-2">Die Roller</div>
                        {/* <div className="w-full absolute flex justify-center items-center">{dieRoll}</div> */}
                        <div className="relative flex justify-center  bg-black bg-opacity-30 rounded-lg shadow-lg mx-20 my-10 py-10">
                            <img className={`h-[200px] w-[200px] my-10 ${spin ? 'spin': ''}`}  src={chosenDie} />
                            {showRoll ? 
                                <div class={`absolute top-14 left-15 w-3/4 h-3/4 flex flex-col items-center justify-center text-white rounded-lg transition duration-500 ease-in-out`}>
                                    <h1 class="text-3xl font-bold mb-4">{dieRoll}</h1>
                                </div>
                            : null}
                            {/* {showRoll ? <div id="fadeDiv" class="bg-red-500 text-white px-4 py-2 rounded opacity-0 transition-opacity duration-1000">This div will fade in/out</div>: null} */}
                        </div>
                        <div className=" bg-teal-500 bg-opacity-70 shadow-lg shadow-teal-500/50  hover:shadow-teal-500/40 text-white text-s font-semibold rounded-lg p-2">
                            <div className="flex justify-center" >Previous Roll: {dieRoll}</div>
                            <div className="flex justify-center gap-10 py-5">
                                <button onClick={rollD20}><img className='h-10 object-cover' src={d20}/></button>
                                <button onClick={rollD12}><img className='h-10 object-cover' src={d12}/></button>
                                <button onClick={rollD10}><img className='h-10 object-cover' src={d10}/></button>
                                <button onClick={rollD8}><img className='h-10 object-cover' src={d8}/></button>
                                <button onClick={rollD6}><img className='h-10 object-cover' src={d6}/></button>
                                <button onClick={rollD4}><img className='h-10 object-cover' src={d4}/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EncounterView