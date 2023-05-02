import React, { useEffect, useState } from "react";

function SubclassLevels({subClassUrl, currentSubclass}){
    const [subclassLevels, setSubclassLevels] = useState([])

    useEffect(()=>{
        fetch(subClassUrl)
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
                            {subclass.features.map((feature)=>
                            <div>
                                {feature.name}
                            </div>
                            )}
                        </div>
                    )}
                </div>
            ):('')}
        </div>
    )
}

export default SubclassLevels