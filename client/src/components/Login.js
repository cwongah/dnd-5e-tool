import React from "react";
import { useNavigate } from "react-router-dom";

function Login({setEmail, setPw, email, pw, token, setToken}){
    console.log(email, pw, token)
    const navigate = useNavigate()
    // const token = sessionStorage.getItem("token")
    function handleClick(){
        fetch('http://127.0.0.1:5555/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": pw})
        })
        .then(r=>{
            if(r.status === 200){
                return r.json()
            }
            else{
                alert("Bad Login")
            }
        })
        .then(data=>{
            console.log(data)
            sessionStorage.setItem("token", data.access_token)
            setToken(sessionStorage.getItem("token"))
            navigate('/')
        })
        .catch(error=>{
            console.error("There was an error", error)
        })
    }

    return(
        <div>
            <div>Login</div>
            {token && token != '' && token != undefined ? (
               "You are logged in with this token" + token 
            ):(
            <div>
                <input type="text" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                <input type="password" placeholder="Password" value={pw} onChange={(e)=> setPw(e.target.value)}></input>
                <button onClick={handleClick} >Login</button>
            </div>
            )}
        </div>
    )
}

export default Login