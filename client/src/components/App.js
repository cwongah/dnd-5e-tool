import React, { useEffect, useState } from "react";
import { Switch, Route, Routes, BrowserRouter} from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Users from "./Users";
import Login from "./Login";
import CharactersList from "./CharactersList";
import CharacterView from "./CharacterView";
import EncountersList from "./EncountersList";
import EncounterView from "./EncounterView";
import SkillsList from "./SkillsList";
import SkillView from "./SkillView";
import FeaturesList from "./FeaturesList";
import FeatureView from "./FeatureView";

function App() {
  const [referenceTable, setReferenceTable] = useState([])
  const [currentUser, setCurrentUser] = useState('')
  const [userPW, setUserPW] = useState('')
  const [searchedObject, setSearchedObject] = useState()
  const [characterId, setCharacterId] = useState('')
  const [encounterId, setEncounterId] = useState('')
  const [encounterUser, setEncounterUser] = useState({})
  // const [skillUrl, setSkillUrl] = useState('')
  const [referenceUrl, setReferenceUrl] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:5555/references')
      .then(r => r.json())
      .then(data => {
        setReferenceTable(data)
        // console.log(data)
      })
  }, [])

  return(
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home referenceTable={referenceTable} setSearchedObject={setSearchedObject} />} />
        {/* to do */}
        <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} userPW={userPW} setUserPW={setUserPW} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/characters" element={<CharactersList setCharacterId={setCharacterId} />} />
        <Route path="/encounters" element={<EncountersList setEncounterId={setEncounterId} referenceTable={referenceTable} setEncounterUser={setEncounterUser} encounterUser={encounterUser} />} />
        <Route path="/skills" element={<SkillsList setReferenceUrl={setReferenceUrl} />} />
        <Route path="/features" element={<FeaturesList setReferenceUrl={setReferenceUrl} />} />
        <Route path="/equipments" />
        <Route path="/spells" />
        <Route path="/races" />
        <Route path="/classes" />
        <Route path="/subclasses" />
        <Route path="/proficiencies" />
        <Route path="/traits" />
        <Route path="/users/:id" />
        <Route path="/characters/:id" element={<CharacterView characterId={characterId} />} />
        <Route path="/encounters/:id" element={<EncounterView encounterId={encounterId} referenceTable={referenceTable} />} />
        <Route path="/skills/:id" element={<SkillView referenceUrl={referenceUrl} />} />
        <Route path="/features/:id" element={<FeatureView referenceUrl={referenceUrl} />} />
        <Route path="/equipments/:id" />
        <Route path="/spells/:id" />
        <Route path="/races/:id" />
        <Route path="/classes/:id" />
        <Route path="/subclasses/:id" />
        <Route path="/proficiencies/:id" />
        <Route path="/traits/:id" />
      </Routes>
    </div>
  )
}

export default App;
