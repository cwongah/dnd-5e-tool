import React, { useEffect, useState } from "react";
import Equipment from './Equipment'

function EquipmentsList({setReferenceUrl}){
    const [equipmentsList, setEquipmentsList] = useState([])
    
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/equipment')
        .then(r => r.json())
        .then (data => setEquipmentsList(data.results))
    }, [])

    const equipmentsToDisplay = equipmentsList.map((equipment) => {
        return(
            <div>
                <Equipment key={equipment.index} name={equipment.name} index={equipment.index} url={equipment.url} setReferenceUrl={setReferenceUrl} />
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