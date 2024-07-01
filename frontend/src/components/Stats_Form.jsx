import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Stats_Form = () => {
  const [player_name, setPlayerName] = useState('') 
  const navigate = useNavigate()
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const response = await fetch('http://localhost:8000/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": player_name }), 
    }
    )
    
    const data = await response.json();
    navigate('/player',  {state: data})
    



  }
return (
    <>
      <section className="bg-zinc-800 justify-content-center py-7" >
        <h1 className="font-poppins text-center text-[#FFFF00] text-6xl font-bold mb-4">Visualize</h1>
        <div className="w-4/5 sm:w-3/5 lg:w-2/5 mx-auto">
          <p className="font-poppins text-center text-white text-xl mb-5">Our app allows you to view real-time visualizations and charts of your favorite players. Using classification models and charting technologies, we allow you to have a seamless experience exploring how sports interacts with statistics. Get started by typing in a player name and their corresponding team. </p>
        </div>

        <form className="max-w-sm mx-auto" onSubmit = {handleSubmit}>

    <div>
        <label htmlFor="username-success" className="font-poppins block mb-2 text-sm font-medium text-white">Player Name</label>
        <input onChange = {(e) => setPlayerName(e.target.value)} type="text" id="username-success" className="font-poppins bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" />
    </div>

    <div className="text-center py-3">
    <button type = "submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
      <span className="font-poppins relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Submit
      </span>
    </button>
    </div>
   
    
    </form>
      </section>
    </>
)
}

export default Stats_Form