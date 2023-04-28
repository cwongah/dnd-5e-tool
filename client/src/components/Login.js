import React from "react";

function Login({currentUser, setCurrentUser, userPW, setUserPW}){

    return(
        <div>
            <div>Login</div>
            <form>
                <input type="text" placeholder="Email"></input>
                <input type="password" placeholder="Password"></input>
            </form>
        </div>
    )
}

export default Login