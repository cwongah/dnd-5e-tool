import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar'

function NavBar(){
    const navigate = useNavigate()

    function handleLoginClick(){
        navigate('/login')
    }

    return(
        <div>Hello Cucks
            <div onClick={handleLoginClick}>Login</div>
            {/* <SearchBar /> */}
        </div>
    )
}

export default NavBar