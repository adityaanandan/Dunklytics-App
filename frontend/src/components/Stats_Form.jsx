import React from 'react'

const Stats_Form = () => {
return (
    <>
      <section className="bg-zinc-800 justify-content-center py-7" >
        <h1 className="font-poppins text-center text-[#FFFF00] text-6xl font-bold mb-4">Visualize</h1>
        <div className="w-4/5 sm:w-3/5 lg:w-2/5 mx-auto">
          <p className="font-poppins text-center text-white text-xl mb-5">Our app allows you to view real-time visualizations and charts of your favorite players. Using classification models and charting technologies, we allow you to have a seamless experience exploring how sports interacts with statistics. Get started by typing in a player name and their corresponding team. </p>
        </div>

        <form className="max-w-sm mx-auto">
    <div className="mb-5">
        <label for="username-success" className="font-poppins block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Player Name</label>
        <input type="text" id="username-success" className="font-poppins bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"  />
        <p className="font-poppins mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Alright!</span> Valid Player</p>
    </div>

    <div>
        <label for="username-success" className="font-poppins block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Player Team</label>
        <input type="text" id="username-success" className="font-poppins bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" />
        <p className="font-poppins mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Alright!</span> Valid Team</p>
    </div>
    
    </form>
      </section>
    </>
)
}

export default Stats_Form