import React, {useState} from 'react'
import SearchBar from './SearchBar'

function Home({referenceTable, setSearchedObject, setUserUrl, setClassUrl, setSkillUrl, setFeatureUrl, setEquipmentUrl, setSpellUrl, setRaceUrl, setSubclassUrl, setProficiencyUrl, setTraitUrl}){
    // console.log(referenceTable.length)
    return(
        <div>
            <div>Hello! This is my home page</div>
            <SearchBar referenceTable={referenceTable} setSearchedObject={setSearchedObject} setUserUrl={setUserUrl} setClassUrl={setClassUrl} setSkillUrl={setSkillUrl} setFeatureUrl={setFeatureUrl} setEquipmentUrl={setEquipmentUrl} setSpellUrl={setSpellUrl} setRaceUrl={setRaceUrl} setSubclassUrl={setSubclassUrl} setProficiencyUrl={setProficiencyUrl} setTraitUrl={setTraitUrl} />
        </div>
    )
}

export default Home;