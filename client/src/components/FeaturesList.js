import React, { useEffect, useState } from "react";
import Feature from "./Feature";
import FeaturePopup from "./FeaturePopup";

function FeaturesList({setFeatureUrl}){
    const [featuresList, setFeaturesList] = useState([])
    const [featurePop, setFeaturePop] = useState(false)
    const [url, setUrl] = useState()
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/features')
        .then(r => r.json())
        .then (data => setFeaturesList(data.results))
    }, [])

    const featuresToDisplay = featuresList.map((feature, index) => {
        return(
            // <div>
            //     <Feature key={index} name={feature.name} index={feature.index} url={feature.url} setFeatureUrl={setFeatureUrl} />
            // </div>
            <div key={index} className="bg-white rounded-md shadow-md p-4 cursor-pointer">
                <div onClick={()=> {
                    setFeaturePop(!featurePop)
                    setUrl(feature.url)
                    }}
                    className="text-sm font-bold"    
                >
                    {feature.name}
                </div>
            </div>
        )
    })

    return(
        // <div>
        //     <div>Features</div>
        //     {featuresToDisplay}
        // </div>
        <div className="bg-white bg-opacity-50  px-4 py-8 mx-20 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold border-b border-gray-300 mb-4 pb-5 text-white">Features</h2>
            <div className="grid grid-cols-4 gap-10 px-3">
                {featuresToDisplay}
            </div>
            {featurePop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center overflow-y-auto">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full lg:w-3/4 overflow-y-scroll">
                    <FeaturePopup featurePop={featurePop} setFeaturePop={setFeaturePop} featureUrl={url}  />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default FeaturesList