import React from 'react'
import conference from '../assets/conference_impact.png'
import threes from '../assets/three_point_impact.png'
import ts from '../assets/true_shooting_impact.png'
import usg from '../assets/usg_impact.png'
import ft from '../assets/free_throw_impact.png'
import division from '../assets/division_impact.png'
import defense from '../assets/defensive_impact.png'
import per from '../assets/per_impact.png'


const Gallery = () => {
return (
    <>
        <section className="bg-zinc-800">
            <h1 className="font-poppins text-center text-[#FFFF00] text-6xl font-bold mb-4">Gallery</h1>
            <div className="justify-center w-4/5 sm:w-3/5 lg:w-2/5 mx-auto">
                <p className="font-poppins text-center text-white text-xl mb-5">Success in the NBA is predicated on a few key quantifiable variables. View our gallery to see how these variables impact winning. </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={threes} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={ts} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={usg} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={ft} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={defense} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={per} alt="" />
                </div>
                
                
               
            </div>
        </section>
    </>
)
}

export default Gallery