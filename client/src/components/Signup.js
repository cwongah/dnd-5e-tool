import React, { useState } from "react";

function Signup(){
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    function handleSignup(){
        console.log(newEmail, newPassword)
    }
    return(
        <div>
            <div>Sign up</div>
            <div>
                <input type="text" placeholder="Email" value={newEmail} onChange={(e)=> setNewEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} />
            </div>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    )
}

export default Signup