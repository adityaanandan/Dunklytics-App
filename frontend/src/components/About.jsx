import React from 'react'
import darsh from '../assets/darsh_pic.jpg'
import aditya from '../assets/aditya_pic.JPG'


const About = () => {
return (
    <section className="w-full py-12 md:py-24 lg:py-12 bg-zinc-800 flex justify-center">
    <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center">
            <h2 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-[#FFFF00] font-poppins">Meet the Founders</h2>
            <p className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-poppins">
                A couple of coders who are ball-knowers.
            </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col items-center justify-center space-y-4">
                <img
                    src={aditya}
                    width="400"
                    height="400"
                    alt="John Doe"
                    className="h-[400px] w-[400px] rounded-full object-cover"
                />
                <div className="space-y-1 text-center">
                    <h3 className="text-2xl font-bold text-red-600 font-poppins">Aditya Anandan</h3>
                    <p className="text-white font-poppins">
                        Aditya is a founding developer for Dunklytics and a rising Junior at UW-Madison. He is responsible for maintaining and improving Dunklytics. Check out his work at @adityaanandan on Github. 
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
                <img
                    src={darsh}
                    width="400"
                    height="400"
                    alt="Jane Smith"
                    className="h-[400px] w-[400px] rounded-full object-cover"
                />
                <div className="space-y-1 text-center">
                    <h3 className="text-2xl text-red-600 font-bold font-poppins">Daryush Ghadiali</h3>
                    <p className="text-white font-poppins">
                        Daryush is a founding engineer for Dunklytics and a rising junior at UW-Madison. He is responsible for frontend design and the original structure behind this app. Check out his work at @darshius on Github.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
)
}

export default About