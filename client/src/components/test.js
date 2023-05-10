import React, { useEffect, useState } from "react";

function Test(){
    const [test, setTest] = useState()
    useEffect(()=>{
        setTest("Test")
    },[])
    return(<div>{test}</div>)
}

export default Test