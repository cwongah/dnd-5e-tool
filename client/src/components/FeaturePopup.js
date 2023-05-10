import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";
import Subclass from "./Subclass";

function FeaturePopup({featureUrl, setClassUrl, setSubclassUrl, featurePop, setFeaturePop}){
    const [feature, setFeature] = useState({})

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co${featureUrl}`)
            .then(r => r.json())
            .then(data => setFeature(data))
    }, [])

    return(
        <div>
            <div className="text-lg font-bold mb-4 border-b border-gray-300">{feature.name}</div>
            <div className="p-3">{feature.desc}</div>
            {feature.class ? (
                <div className="p-3">Class: {feature.class.name}</div>
            ) : (<div>Loading...</div>)}
            {feature.subclass ? (
                <div className="p-3">Subclass: {feature.subclass.name}</div>
            ) : ('')}
            <div className="p-3">Level: {feature.level}</div>
            <div className="flex justify-center">
                <button onClick={()=> setFeaturePop(!featurePop)} className='w-1/4 h-1/4 py-2 ml-10  mt-3 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default FeaturePopup