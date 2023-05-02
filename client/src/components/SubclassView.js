import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spell from "./Spell";

function SubclassView({subclassUrl, setCurrentSubclass, setSpellUrl, setSubclassLevelUrl}){
    const [subclass, setSubclass] = useState({})
    const navigate = useNavigate()

    function handleSubClassLevelClick(){
        setCurrentSubclass(subclass.name)
        setSubclassLevelUrl(`https://www.dnd5eapi.co${subclass.subclass_levels}`)
        navigate(`/subclasses/${subclass.name}/levels`)
    }

    useEffect(()=>{
        fetch(subclassUrl)
            .then(r => r.json())
            .then(data => setSubclass(data))
    }, [])

    return(
        <div>
            <div>Subclass Page</div>
            <div>{subclass.name}</div>
            {subclass.desc ? (<div>{subclass.desc}</div>):('')}
            {subclass.class ? (<div>{subclass.class.name}</div>):('')}
            {subclass.subclass_flavor ? (<div>{subclass.subclass_flavor}</div>):('')}
            <div onClick={handleSubClassLevelClick}>Subclass Levels</div>
            {subclass.spells ? (
                subclass.spells.map((spell, index)=>
                    <Spell key={index} name={spell.spell.name} url={spell.spell.url} setSpellUrl={setSpellUrl} />
                )
            ):('')}
        </div>
    )
}

export default SubclassView