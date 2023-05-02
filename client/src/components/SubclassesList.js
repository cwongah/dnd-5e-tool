import React, { useEffect, useState } from "react";
import Subclass from "./Subclass";

function SubclassesList({setSubclassUrl}){
    const [subclassesList, setSubclassesList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/subclasses')
        .then(r => r.json())
        .then (data => setSubclassesList(data.results))
    }, [])

    const subclassesToDisplay = subclassesList.map((subclass, index) => {
        return(
            <div>
                <Subclass key={index} name={subclass.name} index={subclass.index} url={subclass.url} setSubclassUrl={setSubclassUrl} />
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