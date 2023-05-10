import React, { useEffect, useState } from "react";
import Trait from "./Trait";
import TraitPopup from "./TraitPopup";

function TraitsList({setTraitUrl}){
    const [traitsList, setTraitsList] = useState([])
    const [traitPop, setTraitPop] = useState(false)
    const [url, setUrl] = useState()
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/traits')
        .then(r => r.json())
        .then (data => setTraitsList(data.results))
    }, [])

    const traitsToDisplay = traitsList.map((trait, index) => {
        return(
            // <div>
            //     <Trait key={index} name={trait.name} index={trait.index} url={trait.url} setTraitUrl={setTraitUrl} />
            // </div>
            <div key={index} className="bg-white rounded-md shadow-md p-4 cursor-pointer">
            <div onClick={()=> {
                setTraitPop(!traitPop)
                setUrl(trait.url)
                }}
                className="text-lg font-bold"    
            >
                {trait.name}
            </div>
        </div>
        )
    })

    return(
        // <div>
        //     <div>Traits</div>
        //     {traitsToDisplay}
        // </div>
        <div className="bg-white bg-opacity-50  px-4 py-8 mx-20 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold border-b border-gray-300 mb-4 pb-5 text-white">Traits</h2>
        <div className="grid grid-cols-3 gap-10 px-3">
            {traitsToDisplay}
        </div>
        {traitPop ? (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
            <div className=" bg-white rounded-lg p-6 max-w-2xl w-full lg:w-3/4 overflow-y-scroll">
                <TraitPopup traitPop={traitPop} setTraitPop={setTraitPop} traitUrl={url}  />
            </div>
        </div> 
        ) : null}
    </div>
    )
}

export default TraitsList