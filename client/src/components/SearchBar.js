import React, {useState} from 'react'

function SearchBar({referenceTable, setSearchedObject}){ 
    const [search, setSearch] = useState('')
    const handleSearchChange = (e)=>{
        setSearch(e.target.value.toLowerCase())

    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const searchUrl = referenceTable.filter((reference) => reference.name.toLowerCase().includes(search))
        console.log(searchUrl)
        if(searchUrl.length == 0){
            alert('not found')
        }else{
            fetch(`${searchUrl[0].url}`)
                .then(r => r.json())
                .then(data => {
                    console.log(data, searchUrl[0].class_type)
                    setSearchedObject(data)
            })
        }
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