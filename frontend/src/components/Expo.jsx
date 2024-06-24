import React from 'react'

const Expo = () => {
  return (
    <section className = "bg-zinc-800">
      <section className="bg-zinc-800">
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
                <h2 className=" font-poppins text-4xl md:text-6xl font-extrabold text-[#FFFF00] sm:text-4xl">Stats, made Simple</h2>
                <p className="font-poppins mt-4 text-white text-lg">Dunklytics is a passion project that revolves around the intersection of sports and data. This web-app allows for users to engage with NBA statistics in a unqiue manner, bringing together both visualization and modeling. Predict and visualize your favorite players' data or use our betting tool to maximize your parleys!</p>
                <div className="mt-8">
                    <a href="/about" className="font-poppins text-blue-500 hover:text-blue-600 font-medium">Learn more about us
                        <span className="ml-2">&#8594;</span></a>
                </div>
            </div>
            <div className="mt-12 md:mt-0">
                <img src="https://www.datanami.com/wp-content/uploads/2019/03/basketball_analytics_1.png" alt="About Us Image" className="object-cover rounded-lg shadow-md" />
            </div>
        </div>
    </div>
</section>
      

    </section>
    
  )
}

export default Expo