import React from "react";
import { useNavigate } from "react-router-dom";

function Character({name, level, url}){
    const navigate = useNavigate()
    function handleClick(){
        navigate('/characters/:id')
    }

    return(
        <div onClick={handleClick}>
            <div>{name}</div><div>{level}</div>
        </div>
    )
}
export default Character