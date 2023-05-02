import React, { useEffect, useState } from "react";

function FeatureView({featureUrl}){
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
            {feature.class ? (<div>Class: {feature.class.name}</div>) : (<div>Loading...</div>)}
            {feature.subclass ? (<div>Subclass: {feature.subclass.name}</div>) : ('')}
            <div>{feature.level}</div>
        </div>
    )
}

export default FeatureView