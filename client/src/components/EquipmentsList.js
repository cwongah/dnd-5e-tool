import React, { useEffect, useState } from "react";
import Equipment from './Equipment'
import EquipmentPopup from "./EquipmentPopup";

function EquipmentsList({setEquipmentsUrl}){
    const [equipmentsList, setEquipmentsList] = useState([])
    const [equipPop, setEquipPop] = useState(false)
    const [url, setUrl] = useState()
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/equipment')
        .then(r => r.json())
        .then (data => setEquipmentsList(data.results))
    }, [])

    const equipmentsToDisplay = equipmentsList.map((equipment, index) => {
        return(
            // <div>
            //     <Equipment key={index} name={equipment.name} index={equipment.index} url={equipment.url} setEquipmentsUrl={setEquipmentsUrl} />
            // </div>
            <div key={index} className="bg-white rounded-md shadow-md p-4 cursor-pointer">
            <div onClick={()=> {
                setEquipPop(!equipPop)
                setUrl(equipment.url)
                }}
                className="text-sm font-bold"    
            >
                {equipment.name}
            </div>
        </div>
        )
    })

    return(
        // <div>
        //     <div>Equipments</div>
        //     {equipmentsToDisplay}
        // </div>
        <div className="bg-white bg-opacity-50  px-4 py-8 mx-20 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold border-b border-gray-300 mb-4 pb-5 text-white">Equipment</h2>
            <div className="grid grid-cols-4 gap-10 px-3">
                {equipmentsToDisplay}
            </div>
            {equipPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center ">
                <div className="h-3/4 bg-white rounded-lg p-6 max-w-2xl w-full lg:w-3/4 overflow-y-scroll">
                    <EquipmentPopup equipPop={equipPop} setEquipPop={setEquipPop} equipmentUrl={url}  />
                </div>
            </div> 
            ) : null}
        </div> 
    )
}

export default EquipmentsList