import React, { useEffect, useState } from "react";
import Subclass from "./Subclass";

function SubclassesList({setReferenceUrl}){
    const [subclassesList, setSubclassesList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/subclasses')
        .then(r => r.json())
        .then (data => setSubclassesList(data.results))
    }, [])

    const subclassesToDisplay = subclassesList.map((subclass) => {
        return(
            <div>
                <Subclass key={subclass.index} name={subclass.name} index={subclass.index} url={subclass.url} setReferenceUrl={setReferenceUrl} />
            </div>
        )
    })

    return(
        <div>
            <div>Subclasses</div>
            {subclassesToDisplay}
        </div>
    )
}

export default SubclassesList