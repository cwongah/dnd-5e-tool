import React, { useEffect, useState } from "react";

function EquipmentView({equipmentUrl}){
    const [equipment, setEquipment] = useState({})

    useEffect(()=>{
        fetch(equipmentUrl)
            .then(r => r.json())
            .then(data => setEquipment(data))
    }, [])

    return(
        <div>
            <div>Equipment Page</div>
            <div>{equipment.name}</div>
            {equipment.desc ? (<div>{equipment.desc}</div>) : ('')}
            {equipment.equipment_category ? (<div>{equipment.equipment_category.name}</div>) : ('')}
            {equipment.weapon_category ? (<div>{equipment.weapon_category}</div>) : ('')}
            {equipment.weapon_range ? (<div>{equipment.weapon_range}</div>) : ('')}
            {equipment.category_range ? (<div>{equipment.category_range}</div>) : ('')}
            {equipment.range ? (<div>{equipment.range.normal}/{equipment.range.long}</div>) : ('')}
            {equipment.damage ? (<div>{equipment.damage.damage_dice}/{equipment.damage.damage_type.name}</div>) : ('')}
            {equipment.two_handed_damage ? (<div>{equipment.two_handed_damage.damage_dice}/{equipment.two_handed_damage.damage_type.name}</div>) : ('')}
            {equipment.armor_category ? (<div>{equipment.armor_category}</div>) : ('')}
            {equipment.armor_class ? (<div>{equipment.armor_class.base}/{equipment.armor_class.dex_bonus.toString()}</div>) : ('')}
            {equipment.str_minimum ? (<div>{equipment.str_minimum}</div>) : ('')}
            {equipment.stealth_disadvantage ? (<div>{equipment.stealth_disadvantage.toString()}</div>) : ('')}
            {equipment.properties && equipment.properties.length > 0 ? (<div>{equipment.properties.map((property, index) => (<div key={index}>{property.name}</div>))}</div>) : ('')}
            {equipment.gear_category ? (<div>{equipment.gear_category.name}</div>) : ('')}
            {equipment.tool_category ? (<div>{equipment.tool_category}</div>) : ('')}
            {equipment.cost ? (<div>{equipment.cost.quantity} {equipment.cost.unit}</div>) : ('')}
            {equipment.weight ? (<div>{equipment.weight}</div>) : ('')}
        </div>
    )
}

export default EquipmentView