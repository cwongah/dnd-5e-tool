import React, {useState} from 'react'
import SearchBar from './SearchBar'
import Login from './Login';

function Home({userId, setUserId, token, setToken, email, setEmail, pw, setPw, referenceTable, setSearchedObject, setUserUrl, setClassUrl, setSkillUrl, setFeatureUrl, setEquipmentUrl, setSpellUrl, setRaceUrl, setSubclassUrl, setProficiencyUrl, setTraitUrl}){
    // console.log(referenceTable.length)
    return(
        <div className='flex justify-center flex-col mx-auto items-center min-h-screen w-screen'>
            {/* <div>Hello! This is my home page</div> */}
            <div className="w-1/2 ">
                {/* <SearchBar referenceTable={referenceTable} setSearchedObject={setSearchedObject} setUserUrl={setUserUrl} setClassUrl={setClassUrl} setSkillUrl={setSkillUrl} setFeatureUrl={setFeatureUrl} setEquipmentUrl={setEquipmentUrl} setSpellUrl={setSpellUrl} setRaceUrl={setRaceUrl} setSubclassUrl={setSubclassUrl} setProficiencyUrl={setProficiencyUrl} setTraitUrl={setTraitUrl} /> */}
                <Login userId={userId} setUserId={setUserId} token={token} setToken={setToken} email={email} setEmail={setEmail} pw={pw} setPw={setPw} />
            </div>
        </div>
    )
}

export default Home;