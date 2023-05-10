import React, { useEffect, useState } from "react";

function EquipmentPopup({equipmentUrl, setEquipPop, equipPop}){
    const [equipment, setEquipment] = useState({})

    useEffect(()=>{
        fetch(`https://www.dnd5eapi.co${equipmentUrl}`)
            .then(r => r.json())
            .then(data => setEquipment(data))
    }, [])

    return(
        <div>
            <div className="text-lg font-bold mb-4 border-b border-gray-300">{equipment.name}</div>
            {equipment.desc ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Description</div>
                    </div>
                    <div className="px-3">
                        {equipment.desc}
                    </div>
                </div>
            ) : ('')}
            {equipment.equipment_category ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Equipment Category</div>
                    </div>
                    <div className="px-3">
                        {equipment.equipment_category.name}
                    </div>
                </div>
            ) : ('')}
            {equipment.weapon_category ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Weapon Category</div>
                    </div>
                    <div className="px-3">
                        {equipment.weapon_category}
                    </div>
                </div>
            ) : ('')}
            {equipment.weapon_range ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Weapon Range</div>
                    </div>
                    <div className="px-3">
                        {equipment.weapon_range}
                    </div>
                </div>
            ) : ('')}
            {equipment.category_range ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Category Range</div>
                    </div>
                    <div className="px-3">
                        {equipment.category_range}
                    </div>
                </div>
            ) : ('')}
            {equipment.range ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Range</div>
                    </div>
                    <div className="px-3">
                        Normal Range: {equipment.range.normal}
                    </div>
                    <div className="px-3">
                        Long Range: {equipment.range.long}
                    </div>
                </div>
            ) : ('')}
            {equipment.damage ? (
                <div>
                     <div>
                        <div className="text-md font-bold py-2">Damage</div>
                    </div>
                     <div className="px-3">
                        Damage Die: {equipment.damage.damage_dice}
                    </div>
                     <div className="px-3">
                        Damage Type: {equipment.damage.damage_type.name}
                    </div>
                </div>
            ) : ('')}
            {equipment.two_handed_damage ? (
                <div>
                     <div>
                        <div className="text-md font-bold py-2">Two Handed Damage</div>
                    </div>
                     <div className="px-3">
                        Damage Die: {equipment.two_handed_damage.damage_dice}
                    </div>
                     <div className="px-3">
                        Damage Type: {equipment.two_handed_damage.damage_type.name}
                    </div>
                </div>
            ) : ('')}
            {equipment.armor_category ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Armor Category</div>
                    </div>
                    <div className="px-3">
                        Armor Category: {equipment.armor_category}
                    </div>
                </div>
            ) : ('')}
            {equipment.armor_class ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Armor Class</div>
                    </div>
                    <div className="px-3">
                        Base Armor Class{equipment.armor_class.base}
                    </div>
                    <div className="px-3">
                        Dexterity Bonus{equipment.armor_class.dex_bonus.toString()}
                    </div>
                </div>
            ) : ('')}
            {equipment.str_minimum ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Strength Minimum</div>
                    </div>
                    <div className="px-3">
                        {equipment.str_minimum}
                    </div>
                </div>
            ) : ('')}
            {equipment.stealth_disadvantage ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Stealth Disadvantage</div>
                    </div>
                    <div className="px-3">
                        {equipment.stealth_disadvantage.toString()}
                    </div>
                </div>
            ) : ('')}
            {equipment.properties && equipment.properties.length > 0 ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Equipment Properties</div>
                    </div>
                    {equipment.properties.map((property, index) => (
                        <div key={index} className="px-3">
                            {property.name}
                        </div>
                    ))}
                </div>
            ) : ('')}
            {equipment.gear_category ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Gear Category</div>
                    </div>
                    <div className="px-3">
                        {equipment.gear_category.name}
                    </div>
                </div>
            ) : ('')}
            {equipment.tool_category ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Tool Category</div>
                    </div>
                    <div className="px-3">
                        {equipment.tool_category}
                    </div>
                </div>
            ) : ('')}
            {equipment.cost ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Cost</div>
                    </div>
                    <div className="px-3">
                        {equipment.cost.quantity} {equipment.cost.unit}
                    </div>
                </div>
            ) : ('')}
            {equipment.weight ? (
                <div>
                    <div>
                        <div className="text-md font-bold py-2">Weight</div>
                    </div>
                    <div className="px-3">
                        {equipment.weight}
                    </div>
                </div>
            ) : ('')}
            <div className="flex justify-center">
                <button onClick={()=> setEquipPop(!equipPop)} className='w-1/4 h-1/4 py-2 ml-10  mt-3 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white text-xs font-semibold rounded-lg'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default EquipmentPopup