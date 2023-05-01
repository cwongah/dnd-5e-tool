import React, { useEffect, useState } from "react";
import Feature from "./Feature";

function FeaturesList({setReferenceUrl}){
    const [featuresList, setFeaturesList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/features')
        .then(r => r.json())
        .then (data => setFeaturesList(data.results))
    }, [])

    const featuresToDisplay = featuresList.map((feature) => {
        return(
            <div>
                <Feature key={feature.index} name={feature.name} index={feature.index} url={feature.url} setReferenceUrl={setReferenceUrl} />
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