import React, { useEffect, useState } from "react";
import Spell from "./Spell";
import SpellPopup from "./SpellPopup";

function SpellsList({setSpellUrl}){
    const [spellsList, setSpellsList] = useState([])
    const [spellPop, setSpellPop] = useState(false)
    const [url, setUrl]= useState()
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/spells')
        .then(r => r.json())
        .then (data => setSpellsList(data.results))
    }, [])

    const spellsToDisplay = spellsList.map((spell, index) => {
        return(
            // <div>
            //     <Spell key={index} name={spell.name} index={spell.index} url={spell.url} setSpellUrl={setSpellUrl} />
            // </div>
            <div key={index} className="bg-white rounded-md shadow-md p-4 cursor-pointer">
                <div onClick={()=> {
                    setSpellPop(!spellPop)
                    setUrl(spell.url)
                    }}
                    className="text-sm font-bold"    
                >
                    {spell.name}
                </div>
            </div>
        )
    })

    return(
        // <div>
        //     <div>Spells</div>
        //     {spellsToDisplay}
        // </div>
        <div className="bg-white bg-opacity-50  px-4 py-8 mx-20 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold border-b border-gray-300 mb-4 pb-5 text-white">Spells</h2>
            <div className="grid grid-cols-4 gap-10 px-3">
                {spellsToDisplay}
            </div>
            {spellPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="h-3/4 bg-white rounded-lg p-6 max-w-2xl w-full lg:w-3/4 overflow-y-scroll">
                    <SpellPopup spellPop={spellPop} setSpellPop={setSpellPop} spellUrl={url}  />
                </div>
            </div> 
            ) : null}
        </div>
    )
}

export default SpellsList