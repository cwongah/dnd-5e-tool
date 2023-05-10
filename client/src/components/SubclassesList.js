import React, { useEffect, useState } from "react";
import Subclass from "./Subclass";
import SubclassPop from "./SubclassPopup";

function SubclassesList({setSubclassUrl}){
    const [subclassesList, setSubclassesList] = useState([])
    const [subclassPop, setSubclassPop] = useState(false)
    const [url, setUrl]= useState()
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/subclasses')
        .then(r => r.json())
        .then (data => setSubclassesList(data.results))
    }, [])

    const subclassesToDisplay = subclassesList.map((subclass, index) => {
        return(
            // <div>
            //     <Subclass key={index} name={subclass.name} index={subclass.index} url={subclass.url} setSubclassUrl={setSubclassUrl} />
            // </div>
            <div key={index} className="bg-white rounded-md shadow-md p-4 cursor-pointer">
                <div onClick={()=> {
                    setSubclassPop(!subclassPop)
                    setUrl(subclass.url)
                    }}
                    className="text-lg font-bold"    
                >
                    {subclass.name}
                </div>
            </div>
        )
    })

    return(
        // <div>
        //     <div>Subclasses</div>
        //     {subclassesToDisplay}
        // </div>
        <div className="bg-white bg-opacity-50  px-4 py-8 mx-20 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold border-b border-gray-300 mb-4 pb-5 text-white">Subclasses</h2>
            <div className="grid grid-cols-3 gap-10 px-3">
                {subclassesToDisplay}
            </div>
            {subclassPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 max-w-xl w-full lg:w-3/4 h-1/2 overflow-y-scroll">
                    <SubclassPop subclassPop={subclassPop} setSubclassPop={setSubclassPop} subclassUrl={url} />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default SubclassesList