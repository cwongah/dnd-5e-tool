import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";
import Subclass from "./Subclass";
import ClassPopup from "./ClassPopup";
import SubclassPop from "./SubclassPopup";

function FeatureView({featureUrl, setClassUrl, setSubclassUrl}){
    const [feature, setFeature] = useState({})
    const [classPop, setClassPop] = useState(false)
    const [subclassPop, setSubclassPop] = useState(false)

    useEffect(()=>{
        fetch(featureUrl)
            .then(r => r.json())
            .then(data => setFeature(data))
    }, [featureUrl])

    return(
        <div>
            <div className="text-white text-5xl font-bold pl-4 pb-10">{feature.name}</div>
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-4"> 
            <div className="text-4xl font-bold text-white px-3 mb-2 pb-2 border-b border-gray-300">Description</div>    
                <div className="px-10 py-2">{feature.desc}</div>
                {feature.class ? (
                    <div onClick={()=>setClassPop(!classPop)} className="px-10 py-2">Class: {feature.class.name}</div>
                ) : null}
                {feature.subclass ? (
                    <div onClick={()=>setSubclassPop(!subclassPop)} className="px-10 py-2">Subclass: {feature.subclass.name}</div>
                ) : null}
                <div className="px-10 py-2">Level: {feature.level}</div>
            </div>
            {classPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="h-2/3 bg-white rounded-lg p-6 max-w-6xl w-full lg:w-3/4 overflow-y-scroll">
                    <ClassPopup classPop={classPop} setClassPop={setClassPop} classUrl={feature.class.url} />
                </div>
            </div> 
            ) : null}
            {subclassPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full lg:w-3/4 h-3/4 overflow-y-scroll">
                    <SubclassPop subclassPop={subclassPop} setSubclassPop={setSubclassPop} subclassUrl={feature.subclass.url} />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default FeatureView