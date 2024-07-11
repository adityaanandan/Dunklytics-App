import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import teams from '../assets/teams.json'


const Picks = () => {
    const teamID = teams.find(team => team.teamName === 'Golden State Warriors').teamId;
    const teamID2 = teams.find(team => team.teamName === 'Los Angeles Lakers').teamId; 
return (
    <section className="bg-zinc-800 text-white">
        <h1 className="font-poppins text-center text-[#FFFF00] text-6xl font-bold mb-4">Our Picks</h1>
        <div className="justify-center w-4/5 sm:w-3/5 lg:w-2/5 mx-auto">
                <p className="font-poppins text-center text-white text-xl mb-5">Here's a sneak peak of our new picks function, which predicts NBA games on a daily basis, we will be rolling out this feature next October when the NBA season begins. To learn more about the modeling used to generate these predictions, check out our github repo.</p>
        </div>
        <div className="flex flex-col justify-center items-center mx-20">
            <Card className="[calc(100%-10px)] md:w-[calc(100%-40px)] mx-4">
                <CardContent>
                <div className="md:flex items-center justify-between mb-4"> 
                    
                    <div className="flex items-center  sm:order-none justify-between my-4">
                        <p className="text-lg font-poppins text-white">Golden State Warriors vs Los Angeles Lakers</p>
                    </div>

                    <div className="flex items-center gap-4 order-first">
                        <img src={`https://cdn.nba.com/logos/nba/${teamID}/primary/L/logo.svg`} width="40" height="40" alt="Team A Logo" className="rounded-full" />
                        <h2 className="text-lg font-poppins text-white font-semibold">GSW</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg  font-poppins text-white font-semibold">LAL</h2>
                        <img src={`https://cdn.nba.com/logos/nba/${teamID2}/primary/L/logo.svg`} width="40" height="40" alt="Team B Logo" className="rounded-full" />
                    </div>
                </div>

                <div className="flex items-center justify-between my-4">
                    <p className="text-lg font-poppins text-white">Current Betting Lines: <span className = "text-lg font-poppins text-red-500">-5.5 GSW</span></p>
                    
                </div>
                <div className="flex items-center justify-between my-4">
                    <p className="text-lg font-poppins text-white">Model Accuracy: <span className="text-lg font-poppins text-yellow-500">85%</span></p>
                </div>
                <div className="flex items-center justify-between my-4">
                    <p className="text-lg font-poppins text-white">Predictions: <span className = "text-lg font-poppins text-green-500" >Golden State Warriors </span></p>
                    
                </div>

                <div className="flex justify-center mt-4">
                    <Button className="bg-[#FFFF00]">
                        <p className="text-lg font-poppins">See More</p>
                    </Button>
                </div>
                
                </CardContent>
            </Card>
            
        </div>
    </section>
)
}

export default Picks