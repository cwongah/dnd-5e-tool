import React from "react";
import { useNavigate } from "react-router-dom";

function Login({userId, setUserId, setEmail, setPw, email, pw, token, setToken}){
    // console.log(email, pw, token)
    // console.log(userId)
    const navigate = useNavigate()
    // const token = sessionStorage.getItem("token")
    function handleSignupClick(){
        navigate('/signup')
    }
    function handleLoginClick(){
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
            // console.log(data)
            // document.getElementById('email').value = ""
            // document.getElementById('password').value = ""
            sessionStorage.setItem("token", data.access_token)
            setToken(sessionStorage.getItem("token"))
            setUserId(data.user_id)
            navigate(`/users/${data.user_id}`)
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
                <div>
                    <input id="email" type="text" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                    <input id="password" type="password" placeholder="Password" value={pw} onChange={(e)=> setPw(e.target.value)}></input>
                </div>
                <button onClick={handleLoginClick} >Login</button>
                <div>
                    <label>New User?</label>
                    <button onClick={handleSignupClick}>Signup</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default Login