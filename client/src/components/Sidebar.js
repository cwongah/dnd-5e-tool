import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function Sidebar({token, setToken, toggle, setToggle, userId}) {
    const navigate = useNavigate()

    function handleLogout(){
        sessionStorage.setItem("token", '')
        setToken(sessionStorage.getItem("token"))
        setToggle(false)
        navigate('/')
    }
    function handleLogin(){
        setToggle(false)
        navigate('/')
    }

    return (
        <div >
            <nav
                className={`${
                    toggle
                        ? "md:left-0 w-full"
                        : "md:left-[-300px] w-0"
                } transition-all duration-500 ease-in-out md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 overflow-hidden`}
                style={{ left: toggle ? "0" : "-300px" }}
            >
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto bg-white ">
                {/* Toggler */}
                    <button className="" onClick={() => setToggle(!toggle)}><AiOutlineArrowLeft size={25}/></button>
                    <div className={"md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded bg-white"}>
                        {/* Navigation */}
                        {token && token != '' && token != undefined ? (
                            <div className="bg-white">
                                <ul className="md:flex-col md:min-w-full flex flex-col list-none bg-white">
                                    <li className="items-center">
                                        <Link className="text-teal-500 hover:text-teal-500 text-xs uppercase py-3 font-bold block" to="/character_creation" onClick={()=>setToggle(false)} >
                                            <i className="fas fa-tv opacity-75 mr-2 text-sm"></i> Character Creation
                                        </Link>
                                    </li>

                                    <li className="items-center">
                                        <Link className="text-teal-500 hover:text-teal-500 text-xs uppercase py-3 font-bold block" to="/encounter_creation" onClick={()=>setToggle(false)}>
                                            <i className="fas fa-tv opacity-75 mr-2 text-sm"></i> Encounter Creation
                                        </Link>
                                    </li>

                                    <li className="items-center">
                                        <Link className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block" to="/characters" onClick={()=>setToggle(false)}>
                                            <i className="fas fa-tv opacity-75 mr-2 text-sm"></i> Characters
                                        </Link>
                                    </li>

                                    <li className="items-center">
                                        <Link className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block" to={`/dashboard`} onClick={()=>setToggle(false)}>
                                            <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i> Profile Page
                                        </Link>
                                    </li>
                                </ul>
                                <hr className="my-4 md:min-w-full" />
                            </div>
                        ):null}
                        {/* Divider */}
                        {/* Heading */}
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline bg-white">
                        Reference
                        </h6>
                        {/* Navigation */}
                        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4 bg-white pb-[500px]">
                            <li className="inline-flex">
                                <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/skills" onClick={()=>setToggle(false)}>
                                <i className="fas fa-paint-brush mr-2 text-blueGray-400 text-base"></i> Skills
                                </Link>
                            </li>

                            <li className="inline-flex">
                                <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/features" onClick={()=>setToggle(false)}>
                                <i className="fab fa-css3-alt mr-2 text-blueGray-400 text-base"></i> Features
                                </Link>
                            </li>

                            <li className="inline-flex">
                                <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/equipment" onClick={()=>setToggle(false)}>
                                <i className="fab fa-vuejs mr-2 text-blueGray-400 text-base"></i> Equipment
                                </Link>
                            </li>

                            <li className="inline-flex">
                                <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/spells" onClick={()=>setToggle(false)}>
                                <i className="fab fa-react mr-2 text-blueGray-400 text-base"></i> Spells
                                </Link>
                            </li>

                            <li className="inline-flex">
                                <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/races" onClick={()=>setToggle(false)}>
                                <i className="fab fa-angular mr-2 text-blueGray-400 text-base"></i> Races
                                </Link>
                            </li>

                            <li className="inline-flex">
                                <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/classes" onClick={()=>setToggle(false)}>
                                <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i> Classes
                                </Link>
                            </li>

                            <li className="inline-flex">
                                <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/subclasses" onClick={()=>setToggle(false)}>
                                <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i> Subclasses
                                </Link>
                            </li>

                            <li className="inline-flex">
                                <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/proficiencies" onClick={()=>setToggle(false)}>
                                <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i> Proficiencies
                                </Link>
                            </li>

                            <li className="inline-flex">
                                <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/traits" onClick={()=>setToggle(false)}>
                                <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i> Traits
                                </Link>
                            </li>

                            {token && token != '' && token != undefined ? (
                                <li className="inline-flex bg-white">
                                    <button className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" onClick={handleLogout}>
                                    <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i> Log Out
                                    </button>
                                </li>
                            ):(
                                <li className="inline-flex bg-white">
                                    <button className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold " onClick={handleLogin}>
                                    <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i> Log In
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
     );
}