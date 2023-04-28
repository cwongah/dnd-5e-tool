import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar(){
    const navigate = useNavigate()

    function handleLoginClick(){
        navigate('/login')
    }

    return(
        <div>Hello Cucks
            <div onClick={handleLoginClick}>Login</div>
        </div>
    )
}

export default NavBar