import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
    const linkclassName = ({ isActive }) => isActive ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
  return (
    <nav className="bg-zinc-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <a
                  href="/"
                  className="font-poppins text-black text-xl bg-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >Home</a
                >
                <a
                  href="/jobs.html"
                  className="font-poppins text-white text-xl hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >Stats</a
                >
                <a
                  href="/add-job.html"
                  className="font-poppins text-white text-xl hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >Picks</a
                >

                <a
                  href="/add-job.html"
                  className="font-poppins text-white text-xl hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >About</a
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