import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar'
import { AiOutlineMenu} from 'react-icons/ai'
import { FaDiceD20} from 'react-icons/fa'




function NavBar({toggle, setToggle, referenceTable, setSearchedObject, setUserUrl, setClassUrl, setCharacterId, setSkillUrl, setFeatureUrl, setEquipmentUrl, setSpellUrl, setRaceUrl, setSubclassUrl, setProficiencyUrl, setTraitUrl, userId}){
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = React.useState(false)

    // function handleLoginClick(){
    //     navigate('/login')
    // }

    return (
      <>
        <div className=" flex flex-wrap py-2 pb-10">
          <div className="w-full">
            <nav className="relative flex flex-wrap items-center justify-between py-3 h-15 bg-transparent border-b border-gray-500">
              <button className="pl-8" onClick={() => setToggle(!toggle)}><AiOutlineMenu size={35} color="white" /></button>
              <div className="container px-0 flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between px-4 lg:static lg:block lg:justify-start">
                  <div className="flex mr-20 pr-[150px] justify-center items-center">
                    <div className="mr-3"><FaDiceD20 size={28} color="white"/></div>
                    <button onClick={()=>{
                        setToggle(false)
                        navigate(`/dashboard`)
                      }} className="text-xl font-bold leading-relaxed inline-block mr-4 ml-2 py-2 whitespace-nowrap text-white" >
                      QuestKeeper
                    </button>
                  </div>
                </div>
                <div className="lg:flex flex-grow items-center">
                  <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <li className="nav-item absolute inline-flex rounded-full h-2 w-auto right-20 top-1/4">
                      <SearchBar setToggle={setToggle} setCharacterId={setCharacterId} referenceTable={referenceTable} setSearchedObject={setSearchedObject} setUserUrl={setUserUrl} setClassUrl={setClassUrl} setSkillUrl={setSkillUrl} setFeatureUrl={setFeatureUrl} setEquipmentUrl={setEquipmentUrl} setSpellUrl={setSpellUrl} setRaceUrl={setRaceUrl} setSubclassUrl={setSubclassUrl} setProficiencyUrl={setProficiencyUrl} setTraitUrl={setTraitUrl} />
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </>
    );




    
}

export default NavBar