import React, { useEffect, useState } from "react";
import Skill from "./Skill";
import Feature from "./Feature";
import Equipment from "./Equipment";
import Spell from "./Spell";
import Race from "./Race";
import Subclass from "./Subclass";
import Proficiency from "./Proficiency";
import CharacterClass from "./CharacterClass";
import Trait from "./Trait";
import { useNavigate } from "react-router-dom";
import LevelUp from "./LevelUp";
import Test from "./test";
import ClassPopup from "./ClassPopup";
import SubclassPop from "./SubclassPopup";
import RacePopup from "./RacePopup";
import SkillPopup from "./SkillPopup";
import FeaturePopup from "./FeaturePopup";
import TraitPopup from "./TraitPopup";
import ProfPopup from "./ProfPopup";

function CharacterView({referenceTable, userId, token, characterId, setSkillUrl, setFeatureUrl, setEquipmentUrl, setSpellUrl, setRaceUrl, setSubclassUrl, setProficiencyUrl, setClassUrl, setTraitUrl, setCurrentClass, setClassSpellUrl}){

    const navigate = useNavigate()
    const [character, setCharacter] = useState({})
    const [showPopup, setShowPopup] = useState(false)
    const [classPop, setClassPop] = useState(false)
    const [subclassPop, setSubclassPop] = useState(false)
    const [racePop, setRacePop] = useState(false)
    const [skillPop, setSkillPop] = useState(false)
    const [skillPopUrl, setSkillPopUrl] = useState()
    const [featurePop, setFeaturePop] = useState(false)
    const [featurePopUrl, setFeaturePopUrl] = useState()
    const [traitPop, setTraitPop] = useState(false)
    const [traitPopUrl, setTraitPopUrl] = useState()
    const [profPop, setProfPop] = useState(false)
    const [profPopUrl, setProfPopUrl] = useState()

    // console.log(character)

    function togglePopup(){
        setShowPopup(!showPopup);
    }
    
    // function handleLevelUpNav(){
    //     navigate(`/characters/${character.name}/level-up`)
    // }
    
    useEffect(() => {
        if(token && token != '' && token != undefined){
            fetch(`http://127.0.0.1:5555/characters/${characterId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                setCharacter(data)
            })
        }
    }, [])
    // character.strength_proficiency ? console.log(character.strength_proficiency) : console.log('nope')
    
    const characterAttrToDisplay = (
        <div>
            <div className="text-white text-5xl font-bold pl-4 pb-10">{character.name}</div>
            <div className="grid grid-cols-2 gap-8">
                <div className="col-span-1">
                    <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                        <div className="flex gap-20 border-b border-gray-300">
                            <div className="text-4xl font-bold text-white px-3 mb-2 pb-2">Character Statistics</div> 
                            {character.user_id == userId ? (
                                <button className='w-1/4 h-1/4 py-2  mt-1 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg' onClick={togglePopup} >Level up</button>
                                // <button className='w-1/4 h-1/4 py-2  mt-1 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg' onClick={handleLevelUpNav} >Level up</button>
                            ):null}
                        </div>   
                        <div className="text-xl p-4 w-60 font-bold border-b text-white border-gray-300 mb-4">Biography</div>
                        <div className="px-3">{character.bio}</div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="col-span-1">
                            <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 p-4">Basic Information</div>
                                <div>
                                    <div className="px-3">
                                        <div>Level: {character.level}</div>
                                        {character.character_classes ? (
                                            <div>
                                                {character.character_classes.map((characterClass, index)=>
                                                    <div className="flex gap-1">
                                                        <div onClick={()=>setClassPop(!classPop)}>Class: {characterClass.name}</div>
                                                    </div>
                                                    )}
                                            </div>
                                        ):('')}
                                        {character.subclasses && character.subclasses.length > 0 ? (
                                            <div>
                                                {character.subclasses.map((subclass, index) => (
                                                    <div key={index} className="flex gap-1">
                                                        <div>Subclass:</div>
                                                        <div onClick={()=>setSubclassPop(!subclassPop)}>{subclass.name}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : ('')}
                                        {character.races && character.races.length > 0 ? (
                                            <div>
                                                {character.races.map((race, index) => (
                                                    <div key={index} className="flex gap-1">
                                                        <div>Race:</div>
                                                        <div onClick={()=>setRacePop(!racePop)}>{race.name}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (<div>Loading...</div>)}
                                        <div>Hit Points: {character.hit_points}</div>
                                        <div>Proficiency bonus: {character.proficiency_bonus}</div>
                                        <div>Passive perception: {character.passive_perception}</div>
                                        <div>Speed: {character.speed}</div>
                                        <div>Armor Class: {character.armor_class}</div>
                                        <div>Hit Die: {character.hit_die}</div>
                                        <div>Hit Die Total: {character.hit_die_total}</div>
                                    </div>
                                    <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 p-4">Ability Scores</div>
                                    <div className="px-3">
                                        <div>Strength: {character.strength}</div>
                                        <div>Dexterity: {character.dexterity}</div>
                                        <div>Constitution: {character.constitution}</div>
                                        <div>Intelligence: {character.intelligence}</div>
                                        <div>Wisdom: {character.wisdom}</div>
                                        <div>Charisma: {character.charisma}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                            <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 p-4">Spellcasting</div>
                                <div className="px-3">
                                    <div>Spellcasting ability: {character.spellcasting_ability}</div>
                                    <div>Spellcasting save: {character.spellcasting_save}</div>
                                    <div>Spellcasting attack: {character.spellcasting_attack}</div>
                                </div>
                                <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 p-4">Ability Proficiencies</div>
                                <div className="px-3">
                                    {character.strength_proficiency ? <div>Strength</div> : null}
                                    {character.dexterity_proficiency ? <div>Dexterity</div> : null}
                                    {character.constitution_proficiency ? <div>Constitution</div> : null}
                                    {character.intelligence_proficiency ? <div>Intelligence</div> : null}
                                    {character.wisdom_proficiency ? <div>Wisdom</div> : null}
                                    {character.charisma_proficiency ? <div>Charisma</div> : null}
                                </div>
                                <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 p-4">Saving Throws</div>
                                <div className="px-3">
                                    <div>Strength saving throw: {character.strength_saving_throw}</div>
                                    <div>Dexterity saving throw: {character.dexterity_saving_throw}</div>
                                    <div>Constitution saving throw: {character.constitution_saving_throw}</div>
                                    <div>Intelligence saving throw: {character.intelligence_saving_throw}</div>
                                    <div>Wisdom saving throw: {character.wisdom_saving_throw}</div>
                                    <div>Charisma saving throw: {character.charisma_saving_throw}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
                        <div className="text-4xl font-bold border-b border-gray-300 text-white px-3 mb-2 pb-2">Character Skills and Features</div>  
                        <div className="grid grid-cols-2 gap-8">
                            <div className="col-span-1">
                                <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 p-4">Skills</div>                 
                                {character.skills && character.skills.length > 0 ? (
                                    <div className="px-3">
                                        {character.skills.map((skill, index) => (
                                            <div key={index} className="flex gap-1">
                                                <div onClick={()=>{
                                                    setSkillPop(!skillPop)
                                                    setSkillPopUrl(skill.url)
                                                }}>
                                                    {skill.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (<div>Loading...</div>)}
                                <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 p-4">Features</div>  
                                {character.features && character.features.length > 0 ? (
                                    <div className="px-3">
                                        {character.features.map((feature, index) => (
                                            // <Feature key={index} name={feature.name} url={feature.url} setFeatureUrl={setFeatureUrl} />
                                            <div key={index} className="flex gap-1">
                                                <div onClick={()=>{
                                                    setFeaturePop(!featurePop)
                                                    setFeaturePopUrl(feature.url)
                                                }}>
                                                    {feature.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (<div>Loading...</div>)}
                                <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 p-4">Traits</div> 
                                {character.traits && character.traits.length > 0 ? (
                                    <div className="px-3">
                                        {character.traits.map((trait, index) => (
                                            // <Trait key={index} name={trait.name} url={trait.url} setTraitUrl={setTraitUrl} />
                                            <div key={index} className="flex gap-1">
                                                <div onClick={()=>{
                                                    setTraitPop(!traitPop)
                                                    setTraitPopUrl(trait.url)
                                                }}>
                                                    {trait.name}
                                                </div>
                                            </div>
                                            ))}
                                    </div>
                                ) : (<div>Loading...</div>)}
                            </div>
                            <div className="col-span-1">
                                <div className="text-xl w-3/4 font-bold border-b text-white border-gray-300 mb-4 p-4">Proficiencies</div> 
                                {character.proficiencies && character.proficiencies.length > 0 ? (
                                    <div>
                                        {character.proficiencies.map((proficiency, index) => (
                                            // <Proficiency key={index} name={proficiency.name} url={proficiency.url} setProficiencyUrl={setProficiencyUrl} />
                                            <div key={index} className="flex gap-1">
                                            <div onClick={()=>{
                                                setProfPop(!profPop)
                                                setProfPopUrl(proficiency.url)
                                            }}>
                                                {proficiency.name}
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                ) : (<div>Loading...</div>)}
                            </div>
                        </div>
                            {/* {character.equipments && character.equipments.length > 0 ? (
                                <div>
                                    {character.equipments.map((equipment, index) => (
                                        <Equipment key={index} name={equipment.name} url={equipment.url} setEquipmentUrl={setEquipmentUrl} />
                                    ))}
                                </div>
                            ) : ('')}
                            {character.spells && character.spells.length > 0 ? (
                                <div>
                                    {character.spells.map((spell, index) => (
                                        <Spell key={index} name={spell.name} url={spell.url} setSpellUrl={setSpellUrl} />
                                    ))}
                                </div>
                            ) : ('')} */}
                        <div className="text-4xl font-bold border-b border-gray-300 text-white px-3 mb-2 pt-4 p-2">Encounters</div>  
                        {character.encounters && character.encounters.length > 0 ? (
                            <div className="px-3">
                                {character.encounters.map((encounter, index) => (
                                    <div key={index}>{encounter.name}</div>
                                ))
                            }</div>
                        ) : ('')}
                    </div>
                </div>
            </div>
        </div>
    )

    return(
        <div>
            {characterAttrToDisplay}
            {showPopup ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 pl-12 max-w-md w-full lg:w-3/4">
                    <LevelUp showPopup={showPopup} setShowPopup={setShowPopup} characterId={characterId} token={token} setFeatureUrl={setFeatureUrl} referenceTable={referenceTable} />
                </div>
            </div> 
            ) : null}
            {classPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="h-2/3 bg-white rounded-lg p-6 max-w-6xl w-full lg:w-3/4 overflow-y-scroll">
                    <ClassPopup classPop={classPop} setClassPop={setClassPop} classUrl={character.character_classes[0].url} setCurrentClass={setCurrentClass} setClassSpellUrl={setClassSpellUrl} />
                </div>
            </div> 
            ) : null}
            {subclassPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full lg:w-3/4 h-3/4 overflow-y-scroll">
                    <SubclassPop subclassPop={subclassPop} setSubclassPop={setSubclassPop} subclassUrl={character.subclasses[0].url} />
                </div>
            </div> 
            ) : null}
            {racePop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-4xl w-full lg:w-3/4 h-3/4 overflow-y-scroll">
                    <RacePopup racePop={racePop} setRacePop={setRacePop} raceUrl={character.races[0].url} />
                </div>
            </div> 
            ) : null}
            {skillPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full lg:w-3/4 overflow-y-scroll">
                    <SkillPopup skillPop={skillPop} setSkillPop={setSkillPop} skillUrl={skillPopUrl} />
                </div>
            </div> 
            ) : null}
            {featurePop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full lg:w-3/4 overflow-y-scroll">
                    <FeaturePopup featurePop={featurePop} setFeaturePop={setFeaturePop} featureUrl={featurePopUrl} />
                </div>
            </div> 
            ) : null}
            {traitPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full lg:w-3/4 overflow-y-scroll">
                    <TraitPopup traitPop={traitPop} setTraitPop={setTraitPop} traitUrl={traitPopUrl} />
                </div>
            </div> 
            ) : null}
            {profPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-xs w-full lg:w-3/4 ">
                    <ProfPopup profPop={profPop} setProfPop={setProfPop} proficiencyUrl={profPopUrl} />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default CharacterView