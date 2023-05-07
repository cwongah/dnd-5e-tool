import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function Sidebar({toggle, setToggle}) {

  return (
    <div>

        <nav className={toggle ? "md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
        : "md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-[0px] z-20 py-4 px-6"}>
            <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            {/* Toggler */}
                <button className="" onClick={() => setToggle(!toggle)}><AiOutlineArrowLeft size={25}/></button>
                <div className={"md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded "}>
                    {/* Navigation */}
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                        <li className="items-center">
                            <Link className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block" to="/character_creation">
                                <i className="fas fa-tv opacity-75 mr-2 text-sm"></i> Character Creation
                            </Link>
                        </li>

                        <li className="items-center">
                            <Link className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block" to="/characters">
                                <i className="fas fa-tv opacity-75 mr-2 text-sm"></i> Characters
                            </Link>
                        </li>

                        <li className="items-center">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block" to="/encounters">
                                <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i> Encounters
                            </Link>
                        </li>

                        <li className="items-center">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block" to="/">
                                <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i> Profile Page
                            </Link>
                        </li>

                        <li className="items-center">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block" to="/login">
                                <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i> Login
                            </Link>
                        </li>
                    </ul>
                    {/* Divider */}
                    <hr className="my-4 md:min-w-full" />
                    {/* Heading */}
                    <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                    Reference
                    </h6>
                    {/* Navigation */}
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                        <li className="inline-flex">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/skills">
                            <i className="fas fa-paint-brush mr-2 text-blueGray-400 text-base"></i> Skills
                            </Link>
                        </li>

                        <li className="inline-flex">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/features">
                            <i className="fab fa-css3-alt mr-2 text-blueGray-400 text-base"></i> Features
                            </Link>
                        </li>

                        <li className="inline-flex">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/equipment">
                            <i className="fab fa-vuejs mr-2 text-blueGray-400 text-base"></i> Equipment
                            </Link>
                        </li>

                        <li className="inline-flex">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/spells">
                            <i className="fab fa-react mr-2 text-blueGray-400 text-base"></i> Spells
                            </Link>
                        </li>

                        <li className="inline-flex">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/races">
                            <i className="fab fa-angular mr-2 text-blueGray-400 text-base"></i> Races
                            </Link>
                        </li>

                        <li className="inline-flex">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/classes">
                            <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i> Classes
                            </Link>
                        </li>

                        <li className="inline-flex">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/subclasses">
                            <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i> Subclasses
                            </Link>
                        </li>

                        <li className="inline-flex">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/proficiencies">
                            <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i> Proficiencies
                            </Link>
                        </li>

                        <li className="inline-flex">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold" to="/traits">
                            <i className="fab fa-js-square mr-2 text-blueGray-400 text-base"></i> Traits
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
      </nav>
    </div>
  );
}