import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar'
import { AiOutlineMenu} from 'react-icons/ai'




function NavBar({toggle, setToggle, referenceTable, setSearchedObject, setUserUrl, setClassUrl, setSkillUrl, setFeatureUrl, setEquipmentUrl, setSpellUrl, setRaceUrl, setSubclassUrl, setProficiencyUrl, setTraitUrl}){
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = React.useState(false)

    function handleLoginClick(){
        navigate('/login')
    }

    return(
    <>
      <div className={!toggle ? "flex flex-wrap py-2" : "flex flex-wrap py-2 ml-[240px]"}>
        <div className="w-full px-4">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 h-15 bg-pink-500 rounded">
            {!toggle && <button className="px-4" onClick={() => setToggle(!toggle)}><AiOutlineMenu size={25} color="white" /></button>}
            <div className={!toggle ? "container px-0 mx-auto flex flex-wrap items-center justify-between" : "px-0 mx-2 flex items-center justify-end"}>
              <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
              <button onClick={()=>navigate('/')} className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white " >
                DND 5E Tool
              </button>
                <button className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
                  <i className="fas fa-bars"></i>
                </button>
              </div>
              <div className="lg:flex flex-grow items-center">
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                  {/* <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="#pablo"
                    >
                      Profile
                    </a>
                  </li> */}
                  <li className="nav-item absolute inline-flex rounded-full h-2 w-auto right-20 top-1/4">
                    <SearchBar referenceTable={referenceTable} setSearchedObject={setSearchedObject} setUserUrl={setUserUrl} setClassUrl={setClassUrl} setSkillUrl={setSkillUrl} setFeatureUrl={setFeatureUrl} setEquipmentUrl={setEquipmentUrl} setSpellUrl={setSpellUrl} setRaceUrl={setRaceUrl} setSubclassUrl={setSubclassUrl} setProficiencyUrl={setProficiencyUrl} setTraitUrl={setTraitUrl} />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
    )
}

export default NavBar