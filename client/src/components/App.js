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
import EquipmentsList from "./EquipmentsList";
import EquipmentView from "./EquipmentView";
import SpellsList from "./SpellsList";
import SpellView from "./SpellView";
import RacesList from "./RacesList";
import RaceView from "./RaceView";
import ClassesList from "./ClassesList";
import ClassView from "./ClassView";
import ClassLevels from "./ClassLevels";
import ClassSpells from "./ClassSpells";
import SubclassesList from "./SubclassesList";
import SubclassView from "./SubclassView";
import SubclassLevels from "./SubclassLevels";
import ProficienciesList from "./ProficienciesList";
import ProficiencyView from "./ProficiencyView";
import TraitsList from "./TraitsList";
import TraitView from "./TraitView";
import Sidebar from "./Sidebar";
import CharacterCreation from "./CharacterCreation";
import Dashboard from "./Dashboard";
import Signup from "./Signup";
import LevelUp from "./LevelUp";
import EncounterCreation from "./EncounterCreation";
import UserView from "./UserView";

function App() {
  const [referenceTable, setReferenceTable] = useState([])
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')
  const [searchedObject, setSearchedObject] = useState()
  const [characterId, setCharacterId] = useState('')
  const [encounterId, setEncounterId] = useState('')
  const [currentClass, setCurrentClass] = useState('')
  const [currentSubclass, setCurrentSubclass] = useState('')
  const [userUrl, setUserUrl] = useState('')
  const [classUrl, setClassUrl] = useState('')
  const [skillUrl, setSkillUrl] = useState('')
  const [featureUrl, setFeatureUrl] = useState('')
  const [equipmentUrl, setEquipmentUrl] = useState('')
  const [spellUrl, setSpellUrl] = useState('')
  const [raceUrl, setRaceUrl] = useState('')
  const [subclassUrl, setSubclassUrl] = useState('')
  const [proficiencyUrl, setProficiencyUrl] = useState('')
  const [classLevelUrl, setClassLevelUrl] = useState('')
  const [classSpellUrl, setClassSpellUrl] = useState('')
  const [traitUrl, setTraitUrl] = useState('')
  const [subclassLevelUrl, setSubclassLevelUrl] = useState('')
  const [toggle, setToggle] = useState(false)

  // console.log(characterId)
  // console.log(token)

  useEffect(() => {
    fetch('http://127.0.0.1:5555/references')
      .then(r => r.json())
      .then(data => {
        setReferenceTable(data)
      })
  }, [])

  return(
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800">
      <div >
      <Sidebar userId={userId} token={token} setToken={setToken} toggle={toggle} setToggle={setToggle} />
      </div>
      <div >
      {/* className={`${toggle ? "transform translate-x-64" : ""}`} */}
        <NavBar userId={userId} toggle={toggle} setToggle={setToggle} referenceTable={referenceTable} setSearchedObject={setSearchedObject} setUserUrl={setUserUrl} setClassUrl={setClassUrl} setSkillUrl={setSkillUrl} setFeatureUrl={setFeatureUrl} setEquipmentUrl={setEquipmentUrl} setSpellUrl={setSpellUrl} setRaceUrl={setRaceUrl} setSubclassUrl={setSubclassUrl} setProficiencyUrl={setProficiencyUrl} setTraitUrl={setTraitUrl} />
        <div className="px-5">
          <Routes>
            {/* <Route path="/" element={<Home userId={userId} setUserId={setUserId} token={token} setToken={setToken} email={email} setEmail={setEmail} pw={pw} setPw={setPw} referenceTable={referenceTable} setSearchedObject={setSearchedObject} setUserUrl={setUserUrl} setClassUrl={setClassUrl} setSkillUrl={setSkillUrl} setFeatureUrl={setFeatureUrl} setEquipmentUrl={setEquipmentUrl} setSpellUrl={setSpellUrl} setRaceUrl={setRaceUrl} setSubclassUrl={setSubclassUrl} setProficiencyUrl={setProficiencyUrl} setTraitUrl={setTraitUrl} />} /> */}
            <Route path="/" element={<Login setToggle={setToggle} userId={userId} setUserId={setUserId} token={token} setToken={setToken} email={email} setEmail={setEmail} pw={pw} setPw={setPw} />} />
            <Route path="/users" element={<Users token={token} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/characters" element={<CharactersList token={token} setCharacterId={setCharacterId} />} />
            <Route path="/encounters" element={<EncountersList userId={userId} token={token} setEncounterId={setEncounterId} referenceTable={referenceTable} />} />
            <Route path="/skills" element={<SkillsList setSkillUrl={setSkillUrl} />} />
            <Route path="/features" element={<FeaturesList setFeatureUrl={setFeatureUrl} />} />
            <Route path="/equipment" element={<EquipmentsList setEquipmentUrl={setEquipmentUrl} />} />
            <Route path="/spells" element={<SpellsList setSpellUrl={setSpellUrl} />} />
            <Route path="/races" element={<RacesList setRaceUrl={setRaceUrl} />} />
            <Route path="/classes" element={<ClassesList setClassUrl={setClassUrl} />} />
            <Route path="/subclasses" element={<SubclassesList setSubclassUrl={setSubclassUrl} />} />
            <Route path="/proficiencies" element={<ProficienciesList setProficiencyUrl={setProficiencyUrl} />} />
            <Route path="/traits" element={<TraitsList setTraitUrl={setTraitUrl} />} />
            <Route path="/dashboard" element={<Dashboard referenceTable={referenceTable} setEncounterId={setEncounterId} setCharacterId={setCharacterId} userId={userId} />} />
            <Route path="/users/:id" element={<UserView userUrl={userUrl} referenceTable={referenceTable} setEncounterId={setEncounterId} setCharacterId={setCharacterId} userId={userId} />} />
            <Route path="/characters/:id" element={<CharacterView userId={userId} token={token} characterId={characterId} setSkillUrl={setSkillUrl} setFeatureUrl={setFeatureUrl} setEquipmentUrl={setEquipmentUrl} setSpellUrl={setSpellUrl} setRaceUrl={setRaceUrl} setSubclassUrl={setSubclassUrl} setProficiencyUrl={setProficiencyUrl} setClassUrl={setClassUrl} setTraitUrl={setTraitUrl} />} />
            <Route path="/encounters/:id" element={<EncounterView token={token} encounterId={encounterId} referenceTable={referenceTable} />} />
            <Route path="/skills/:id" element={<SkillView skillUrl={skillUrl} />} />
            <Route path="/features/:id" element={<FeatureView featureUrl={featureUrl} setClassUrl={setClassUrl} setSubclassUrl={setSubclassUrl} />} />
            <Route path="/equipment/:id"element={<EquipmentView equipmentUrl={equipmentUrl} />} />
            <Route path="/spells/:id" element={<SpellView spellUrl={spellUrl} setClassUrl={setClassUrl} setSubclassUrl={setSubclassUrl} />} />
            <Route path="/races/:id" element={<RaceView  raceUrl={raceUrl} setProficiencyUrl={setProficiencyUrl} setTraitUrl={setTraitUrl} />} />
            <Route path="/classes/:id" element={<ClassView classUrl={classUrl} setClassUrl={setClassUrl} setCurrentClass={setCurrentClass} setClassLevelUrl={setClassLevelUrl} setClassSpellUrl={setClassSpellUrl} setSubclassUrl={setSubclassUrl} setProficiencyUrl={setProficiencyUrl} setEquipmentUrl={setEquipmentUrl} />} />
            <Route path="/subclasses/:id" element={<SubclassView subclassUrl={subclassUrl} setSubclassUrl={setSubclassUrl} setCurrentSubclass={setCurrentSubclass} setSpellUrl={setSpellUrl} setSubclassLevelUrl={setSubclassLevelUrl} />} />
            <Route path="/proficiencies/:id" element={<ProficiencyView proficiencyUrl={proficiencyUrl} setProficiencyUrl={setProficiencyUrl} setRaceUrl={setRaceUrl} setClassUrl={setClassUrl} />} />
            <Route path="/traits/:id" element={<TraitView traitUrl={traitUrl} setRaceUrl={setRaceUrl} />} />
            <Route path="/classes/:className/levels" element={<ClassLevels classLevelUrl={classLevelUrl} currentClass={currentClass} setFeatureUrl={setFeatureUrl} />} />
            <Route path="/classes/:className/spells" element={<ClassSpells spellUrl={spellUrl} currentClass={currentClass} setSpellUrl={setSpellUrl} classSpellUrl={classSpellUrl} />} />
            <Route path="/subclasses/:subclassName/levels" element={<SubclassLevels subclassLevelUrl={subclassLevelUrl} currentSubclass={currentSubclass} setFeatureUrl={setFeatureUrl} />} />
            <Route path="/character_creation" element={<CharacterCreation setReferenceTable={setReferenceTable} userId={userId} setCharacterId={setCharacterId} referenceTable={referenceTable} setFeatureUrl={setFeatureUrl} setProficiencyUrl={setProficiencyUrl} setTraitUrl={setTraitUrl} />} />
            <Route path="/characters/:id/level-up" element={<LevelUp referenceTable={referenceTable} token={token} characterId={characterId} setFeatureUrl={setFeatureUrl} />} />
            <Route path="/encounter_creation" element={<EncounterCreation setEncounterId={setEncounterId} setReferenceTable={setReferenceTable} token={token} referenceTable={referenceTable} userId={userId} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App;