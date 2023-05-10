import React, { useEffect, useState } from "react";
import CharacterClass from "./CharacterClass";
import ClassPopup from "./ClassPopup";

function ClassesList({setClassUrl, setCurrentClass}){
    const [classesList, setClassesList] = useState([])
    const [classPop, setClassPop] = useState(false)
    const [url, setUrl]= useState()
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/classes')
        .then(r => r.json())
        .then (data => setClassesList(data.results))
    }, [])

    

    const classesToDisplay = classesList.map((characterClass, index) => {
        return(
            <div key={index} className="bg-white rounded-md shadow-md p-4 cursor-pointer">
                <div onClick={()=> {
                    setClassPop(!classPop)
                    setUrl(characterClass.url)
                    }}
                    className="text-lg font-bold"    
                >
                    {characterClass.name}
                </div>
            </div>
        )
    })

    return(
        <div className="bg-white bg-opacity-50  px-4 py-8 mx-20 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold border-b border-gray-300 mb-4 pb-5 text-white">Classes</h2>
            <div className="grid grid-cols-3 gap-10 px-3">
                {classesToDisplay}
            </div>
            {classPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="h-3/4 bg-white rounded-lg p-6 max-w-6xl w-full lg:w-3/4 overflow-y-scroll">
                    <ClassPopup classPop={classPop} setClassPop={setClassPop} classUrl={url} setCurrentClass={setCurrentClass}  />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default ClassesList