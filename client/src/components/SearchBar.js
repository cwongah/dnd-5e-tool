import React, {useState} from 'react'

function SearchBar(){ 
    const [search, setSearch] = useState('')
    const handleSearchChange = (e)=>{
        setSearch(e.target.value.toLowerCase())
        console.log(search)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch(`https://www.dnd5eapi.co/api/classes/${search}`)
            .then(r => r.json())
            .then(data => console.log(data))
    }

    return(
        <div className='searchBar'>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleSearchChange} placeholder='Search'></input>
            </form>
        </div>
    )
}

export default SearchBar