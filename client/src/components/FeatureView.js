import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";
import Subclass from "./Subclass";

function FeatureView({featureUrl, setClassUrl, setSubclassUrl}){
    const [feature, setFeature] = useState({})

    useEffect(()=>{
        fetch(featureUrl)
            .then(r => r.json())
            .then(data => setFeature(data))
    }, [])

    return(
        <div>
            <div>Feature Page</div>
            <div>{feature.name}</div>
            <div>{feature.desc}</div>
            {feature.class ? (
                <CharacterClass name={feature.class.name} url={feature.class.url} setClassUrl={setClassUrl} />
            ) : (<div>Loading...</div>)}
            {feature.subclass ? (
                <Subclass name={feature.subclass.name} url={feature.subclass.url} setSubclassUrl={setSubclassUrl} />
            ) : ('')}
            <div>{feature.level}</div>
        </div>
    )
}

export default FeatureView