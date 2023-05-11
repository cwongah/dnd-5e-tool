import React from "react";
import { useNavigate } from "react-router-dom";

function Login({userId, setUserId, setEmail, setPw, email, pw, token, setToken, setToggle}){
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
            setToggle(false)
            navigate(`/dashboard`)
        })
        .catch(error=>{
            console.error("There was an error", error)
        })
    }

    return(
        <div className="flex justify-center items-center h-screen bg-transparent">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-purple-600">Login</h1>
        {token && token !== "" && token !== undefined ? (
            <p>You are logged in with this token: {token}</p>
        ) : (
            <div>
            <div className="mb-4">
                <label className="block text-gray-500 mb-2" htmlFor="email">
                Email
                </label>
                <input
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-3 bg-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-500 mb-2" htmlFor="password">
                Password
                </label>
                <input
                id="password"
                type="password"
                placeholder="Password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full py-2 px-3 bg-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                onClick={handleLoginClick}
                className="bg-purple-600 hover:bg-purple-700 text-gray-100 py-2 mt-4 px-4 rounded-lg"
                >
                Login
                </button>
                <div className="mt-4">
                <label className="text-gray-500">New User?</label>
                <button
                    onClick={handleSignupClick}
                    className="ml-2 bg-gray-500 hover:bg-gray-600 text-gray-100 py-2 px-4 rounded-lg"
                >
                    Signup
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    </div>
    )
}

export default Login