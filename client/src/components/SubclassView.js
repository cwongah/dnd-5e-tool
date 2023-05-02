import React, { useEffect, useState } from "react";

function SubclassView({referenceUrl}){
    const [subclass, setSubclass] = useState({})

    useEffect(()=>{
        fetch(referenceUrl)
            .then(r => r.json())
            .then(data => setSubclass(data))
    }, [])

    return(
        <div>
            <div>Subclass Page</div>
        </div>
    )
}

export default SubclassView