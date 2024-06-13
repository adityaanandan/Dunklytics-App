import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
    const linkclassName = ({ isActive }) => isActive ? "font-poppins text-black text-xl bg-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2" : "font-poppins text-white text-xl hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
  return (
    <nav className="bg-zinc-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className= {linkclassName}
                  >Home</NavLink
                >
                <NavLink
                  to="/stats"
                  className={linkclassName}
                  >Stats</NavLink
                >
                <NavLink
                  to="/picks"
                  className={linkclassName}
                  >Picks</NavLink
                >

                <NavLink
                  to="/about"
                  className={linkclassName}
                  >About</NavLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    )
}

export default Navbar