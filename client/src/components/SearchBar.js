import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar({referenceTable, setSearchedObject, setUserUrl, setClassUrl, setSkillUrl, setFeatureUrl, setEquipmentUrl, setSpellUrl, setRaceUrl, setSubclassUrl, setProficiencyUrl, setTraitUrl }){ 
    const [search, setSearch] = useState('')

    const navigate = useNavigate()

    const handleSearchChange = (e)=>{
        setSearch(e.target.value.toLowerCase())

    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        let searchObject = referenceTable.filter((reference) => reference.name.toLowerCase().includes(search))
        if(searchObject.length == 0){
            alert('Not Found')
        }else{
            // console.log(searchObject)
            switch(searchObject[0].class_type){
                case 'user':
                    setUserUrl(searchObject[0].url)
                    navigate(`/users/${searchObject[0].name}`)
                    break
                case 'class':
                    setClassUrl(searchObject[0].url)
                    navigate(`/classes/${searchObject[0].name}`)
                    break
                case 'skill':
                    setSkillUrl(searchObject[0].url)
                    navigate(`/skills/${searchObject[0].name}`)
                    break
                case 'feature':
                    setFeatureUrl(searchObject[0].url)
                    navigate(`/features/${searchObject[0].name}`)
                    break
                case 'equipment':
                    setEquipmentUrl(searchObject[0].url)
                    navigate(`/equipment/${searchObject[0].name}`)
                    break
                case 'spell':
                    setSpellUrl(searchObject[0].url)
                    navigate(`/spells/${searchObject[0].name}`)
                    break
                case 'race':
                    setRaceUrl(searchObject[0].url)
                    navigate(`/races/${searchObject[0].name}`)
                    break
                case 'subclass':
                    setSubclassUrl(searchObject[0].url)
                    navigate(`/subclasses/${searchObject[0].name}`)
                    break
                case 'proficiency':
                    setProficiencyUrl(searchObject[0].url)
                    navigate(`/proficiencies/${searchObject[0].name}`)
                    break
                case 'trait':
                    setTraitUrl(searchObject[0].url)
                    navigate(`/traits/${searchObject[0].name}`)
                    break
            }
        }
    }

    return(
        <div className='searchBar'>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    onChange={handleSearchChange} 
                    placeholder='Search'
                    className="block w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                </input>
            </form>
        </div>
    )
}

export default SearchBar