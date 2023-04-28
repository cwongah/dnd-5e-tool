import React, { useEffect, useState } from "react";
import { Switch, Route, Routes, BrowserRouter} from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Users from "./Users";
import Login from "./Login";
import Characters from "./Characters";

function App() {
  const [currentUser, setCurrentUser] = useState('')
  const [userPW, setUserPW] = useState('')

  return(
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} userPW={userPW} setUserPW={setUserPW} />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App;
