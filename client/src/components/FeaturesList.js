import React, { useEffect, useState } from "react";
import Feature from "./Feature";

function FeaturesList({setFeatureUrl}){
    const [featuresList, setFeaturesList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/features')
        .then(r => r.json())
        .then (data => setFeaturesList(data.results))
    }, [])

    const featuresToDisplay = featuresList.map((feature, index) => {
        return(
            <div>
                <Feature key={index} name={feature.name} index={feature.index} url={feature.url} setFeatureUrl={setFeatureUrl} />
            </div>
        )
    })

    return(
        <div>
            <div>Features</div>
            {featuresToDisplay}
        </div>
    )
}

export default FeaturesList