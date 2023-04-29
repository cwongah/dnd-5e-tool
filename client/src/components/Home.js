import React, {useState} from 'react'
import SearchBar from './SearchBar'

function Home({referenceTable, setSearchedObject}){
    // console.log(referenceTable.length)
    return(
        <div>
            <div>Hello! This is my home page</div>
            <SearchBar referenceTable={referenceTable} setSearchedObject={setSearchedObject} />
        </div>
    )
}

export default Home;