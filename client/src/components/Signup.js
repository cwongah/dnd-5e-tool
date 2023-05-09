import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(){
    const [newEmail, setNewEmail] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate()
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
    return(
        <div>
            <div>Sign up</div>
            <div>
                <input type="text" placeholder="Email" value={newEmail} onChange={(e)=> setNewEmail(e.target.value)} />
                <input type="text" placeholder="Username" value={newUsername} onChange={(e)=> setNewUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} />
            </div>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    )
}

export default Signup