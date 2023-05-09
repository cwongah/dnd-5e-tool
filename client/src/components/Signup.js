import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(){
    const [newEmail, setNewEmail] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate()
    function handleLoginClick(){
        navigate('/')
    }
    function handleSignup(){
        console.log(newEmail, newPassword)
        fetch('http://127.0.0.1:5555/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": newUsername,
                "password": newPassword,
                "email": newEmail
            })
        })
            .then(r=>r.json())
            .then(data=> {
                fetch(`http://127.0.0.1:5555/users/${data.id}`,{
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"url": `http://127.0.0.1:5555/users/${data.id}`})
                })
                    .then(r=>r.json())
                    .then(data=> console.log(data))
                fetch('http://127.0.0.1:5555/references', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"name": data.username, "url": `http://127.0.0.1:5555/users/${data.id}`, "class_type": "user", "object_id": data.id})
                })
                .then(r=>r.json())
                .then(data=>console.log(data))
            })
        navigate('/')
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-transparent">
            <div className="w-full max-w-md">
            <div className="bg-gray-100 py-8 px-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-purple-600">Signup</h1>
                <div>
                    <div className="mb-4">
                    <label className="block text-gray-500 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full py-2 px-3 bg-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-500 mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
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
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full py-2 px-3 bg-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    </div>
                    <div className="flex items-center justify-between">
                    <button
                        onClick={handleSignup}
                        className="bg-purple-600 hover:bg-purple-700 text-gray-100 py-2 px-4 rounded-lg"
                    >
                        Signup
                    </button>
                    <div className="mt-4">
                        <label className="text-gray-500">Already have an account?</label>
                        <button
                        onClick={handleLoginClick}
                        className="ml-2 bg-gray-500 hover:bg-gray-600 text-gray-100 py-2 px-4 rounded-lg"
                        >
                        Login
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );


}

export default Signup