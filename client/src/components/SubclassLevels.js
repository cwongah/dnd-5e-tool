import React, { useEffect, useState } from "react";
import Feature from "./Feature";

function SubclassLevels({subclassLevelUrl, currentSubclass, setFeatureUrl}){
    const [subclassLevels, setSubclassLevels] = useState([])

    useEffect(()=>{
        fetch(subclassLevelUrl)
            .then(r=>r.json())
            .then(data=>setSubclassLevels(data))
    },[])

    return(
        <div>
            <div>{currentSubclass} Levels</div>
            {subclassLevels ? (
                <div>
                    {subclassLevels.map((subclass) => 
                        <div>
                            {subclass.level}
                            {subclass.features.map((feature, index)=>
                                <Feature key={index} name={feature.name} url={feature.url} setFeatureUrl={setFeatureUrl} />
                            )}
                        </div>
                    )}
                </div>
            ):('')}
        </div>
    )
}

export default SubclassLevels