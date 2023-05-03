import React, { useState } from "react";

function CharacterCreation(){
    const classes = [{'name': 'Barbarian','subclass': 'Berserker'},{'name': 'Bard','subclass': 'Lore'},{'name': 'Cleric','subclass': 'Life'},{'name': 'Druid','subclass': 'Land'},{'name': 'Fighter','subclass': 'Champion'},{'name': 'Monk','subclass': 'Open-Hand'},{'name': 'Palidin','subclass': 'Devotion'},{'name': 'Ranger','subclass': 'Hunter'},{'name': 'Rogue','subclass': 'Thief'},{'name': 'Sorcerer','subclass': 'Draconic'},{'name': 'Warlock','subclass': 'Fiend'},{'name': 'Wizard','subclass': 'Evocation'},]
    const [selectedClass, setSelectedClass] = useState('')
    const [selectedSubclass, setSelectedSubclass] = useState('')
    console.log(selectedClass)

    function handleClassSelection(e){
        setSelectedClass(e.target.value)
    }

    return(
        <div>
            <div>Character Creation</div>
            <form >
                <input type='text' placeholder="Character name" className="block w-1/2 px-4 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                <input type='text' placeholder="Character bio" className="block w-1/2 px-4 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></input>
                <select id="class-selection" name="class-selection" onChange={handleClassSelection}>
                    <option value={''} disabled selected>Select a Class</option>
                    {classes.map((characterClass, index)=><option key={index} value={characterClass.name}>{characterClass.name}</option>)}
                </select>
            </form>
        </div>
    )
}

export default CharacterCreation