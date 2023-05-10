import React, { useEffect, useState } from "react";
import Proficiency from "./Proficiency";
import ProfPopup from "./ProfPopup";

function ProficienciesList({setProficiencyUrl}){
    const [proficienciesList, setProficienciesList] = useState([])
    const [profPop, setProfPop] = useState(false)
    const [url, setUrl] = useState()
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/proficiencies')
        .then(r => r.json())
        .then (data => setProficienciesList(data.results))
    }, [])

    const proficienciesToDisplay = proficienciesList.map((proficiency, index) => {
        return(
            // <div>
            //     <Proficiency key={index} name={proficiency.name} index={proficiency.index} url={proficiency.url} setProficiencyUrl={setProficiencyUrl} />
            // </div>
            <div key={index} className="bg-white rounded-md shadow-md p-4 cursor-pointer">
                <div onClick={()=> {
                    setProfPop(!profPop)
                    setUrl(proficiency.url)
                    }}
                    className="text-lg font-bold"    
                >
                    {proficiency.name}
                </div>
            </div>
        )
    })

    return(
        // <div>
        //     <div>Proficiencies</div>
        //     {proficienciesToDisplay}
        // </div> 
        <div className="bg-white bg-opacity-50  px-4 py-8 mx-20 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold border-b border-gray-300 mb-4 pb-5 text-white">Proficiencies</h2>
            <div className="grid grid-cols-3 gap-10 px-3">
                {proficienciesToDisplay}
            </div>
            {profPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className=" bg-white rounded-lg p-6 max-w-xs w-full lg:w-3/4 ">
                    <ProfPopup profPop={profPop} setProfPop={setProfPop} proficiencyUrl={url}  />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default ProficienciesList