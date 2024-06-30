import React from 'react'
import logo from '../assets/title_pic.png'
import { forwardRef } from 'react'

const Logo = () => {
  return (
    <section className = "bg-zinc-800 h-screen">
        <h1 className = "font-poppins py-4 text-4xl text-center md:text-8xl text-white">Dunklytics</h1>
        <p className = "font-poppins pb-3 text-2xl text-center md:text-4xl text-[#FFFF00]">Your home for NBA Analytics</p>
        <div className = "flex justify-center items-center pt-10">
            <img src={logo} alt="logo" className="h-128 w-128" />
        </div>

        <div className="flex justify-center items-center pt-5 md:pt-10">
            <button className="font-poppins text-xl bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded-full">
                See More
            </button>
        </div>
        

        

    </section>
  )
}

export default Logo