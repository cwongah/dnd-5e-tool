import React, { useEffect, useState } from "react";
import Equipment from './Equipment'

function EquipmentsList({setEquipmentsUrl}){
    const [equipmentsList, setEquipmentsList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/equipment')
        .then(r => r.json())
        .then (data => setEquipmentsList(data.results))
    }, [])

    const equipmentsToDisplay = equipmentsList.map((equipment, index) => {
        return(
            <div>
                <Equipment key={index} name={equipment.name} index={equipment.index} url={equipment.url} setEquipmentsUrl={setEquipmentsUrl} />
            </div>
        )
    })

    return(
        <div>
            <div>Equipments</div>
            {equipmentsToDisplay}
        </div>
    )
}

export default EquipmentsList