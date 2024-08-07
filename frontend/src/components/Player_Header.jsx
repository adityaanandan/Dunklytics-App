/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rGhez98xk6f
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"
import { ResponsiveBar } from "@nivo/bar"
import  shot_chart  from "../assets/shot_chart.png"
import { data } from "autoprefixer";

import { useEffect, useState } from "react";



const theme = {
  axis: {
    textColor: '#ffffff',
    fontSize: '14px',
    tickColor: '#ffffff',
  },
  grid: {
    stroke: '#888',
    strokeWidth: 1
  },
};







export default function Component({ data }) {

  const [imageUrl, setImageUrl] = useState('');
  const [makes_misses, setMakesMisses] = useState('');
  const [player_grade, setPlayerGrade] = useState('');


  

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`https://storage.googleapis.com/dunklytics-shotcharts/${data.id}.png`);
        const response_mm = await fetch(`https://storage.googleapis.com/dunklytics-shotcharts/${data.id}_mm.png`);
        if (!response.ok || !response_mm.ok) {
            throw new Error(`Failed to retrieve image from URL, status code: ${response.status}`);
        }
        const base64String = await response.text(); 
        const mimeType = response.headers.get('content-type');
        setImageUrl(`data:${mimeType};base64,${base64String}`);

        const base64String_mm = await response_mm.text(); 
        const mimeType_mm = response_mm.headers.get('content-type');
        setMakesMisses(`data:${mimeType_mm};base64,${base64String_mm}`);


    } catch (error) {
        console.error('Error fetching image:', error);
    }
    };

    fetchImage();
  }, []);



  const map1 = new Map();
  map1.set("Guard", "PG")
  map1.set("Forward", "SF")
  map1.set("Center", "C")
  const position = map1.get(data.pos)
  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 bg-zinc-800 text-white">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 bg-[#55efc4] text-6xl rounded-full w-20 h-20 flex items-center justify-center">
          🏀
        </div>
        <div>
          <h1 className="font-poppins text-2xl font-bold">{data.name}</h1>
          <div className="font-poppins text-gray-300 dark:text-gray-300">{`${position} | ${data.team}`}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Points</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[4/3]" data = {data.pts}/>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rebounds</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[4/3]" data = {data.rebs}/>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assists</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[4/3]" data = {data.asts}/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[4/3]" data = {data.stocks}/>
          </CardContent>
        </Card>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle >Shooting Percentages</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart ft = {data.ft} three = {data.three} fg = {data.fg} className="aspect-square" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shot Chart</CardTitle>
          </CardHeader>
          <CardContent>
          <img src={makes_misses} className="w-full h-auto object-cover block" />    
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
  <CardHeader>
    <CardTitle>Advanced Analytics</CardTitle>
  </CardHeader> 
  <CardContent>
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col items-center gap-2 justify-between h-full">
        <div className="text-6xl font-bold">{data.per}</div>
        <div className="text-gray-300 dark:text-gray-300">PER</div>
      </div>
      <div className="flex flex-col items-center gap-2 justify-between h-full">
        <div className="text-6xl font-bold">{data.ws}</div>
        <div className="text-gray-300 dark:text-gray-300">Win Shares</div>
      </div>
      <div className="flex flex-col items-center gap-2 justify-between h-full">
        <div className="text-6xl font-bold">{data.vorp}</div>
        <div className="text-gray-300 dark:text-gray-300">VORP</div>
      </div>
      <div className="flex flex-col items-center gap-2 justify-between h-full">
        <div className="text-6xl font-bold">{data.obpm}</div>
        <div className="text-gray-300 dark:text-gray-300">OBPM</div>
      </div>
    </div>
  </CardContent>
</Card>

<Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>
          <div className="bg-gray-900 text-white rounded-lg p-6  max-w-md mx-auto">
        <div className="flex items-center justify-between">

        {data.grade === "Superstar" && (
              <div className="text-4xl font-bold">
              <span className="text-[#00b894]">Superstar</span>
            </div>
            )}

        {data.grade === "All-Star" && (
              <div className="text-4xl font-bold">
              <span className="text-[#FFEA00]">All-Star</span>
            </div>
            )}

        {data.grade === "Starter" && (
              <div className="text-4xl font-bold">
              <span className="text-[#F28C28]">Starter</span>
            </div>
            )}

        {data.grade === "Role Player" && (
              <div className="text-4xl font-bold">
              <span className="text-[#D22B2B]">Role-Player</span>
            </div>
            )}

          

          
        {data.grade === "Superstar" && (
              <div className="flex items-center gap-2">
              <TrophyIcon className="w-8 h-8 text-[#00b894]" />
              <span className="text-lg font-medium">Grade</span>
            </div>
            )}

        {data.grade === "All-Star" && (
              <div className="flex items-center gap-2">
              <TrophyIcon className="w-8 h-8 text-[#FFEA00]" />
              <span className="text-lg font-medium">Grade</span>
            </div>
            )}

        {data.grade === "Starter" && (
              <div className="flex items-center gap-2">
              <TrophyIcon className="w-8 h-8 text-[#F28C28]" />
              <span className="text-lg font-medium">Grade</span>
            </div>
            )}

        {data.grade === "Role Player" && (
              <div className="flex items-center gap-2">
              <TrophyIcon className="w-8 h-8 text-[#D22B2B]" />
              <span className="text-lg font-medium">Grade</span>
            </div>
            )}

        
          
          
        </div>

        {data.grade === "Superstar" && (
           <p className="mt-4 text-gray-400 text-sm">
          Our model grades {data.name} as a "Superstar" player, indicating that he is a top-15 player in the league, capable of being a number one option on a championship team.
        </p>

        )}

        {data.grade === "All-Star" && (
           <p className="mt-4 text-gray-400 text-sm">
           Our model grades {data.name} as an "All-Star" player, indicating that he is a top-30 player in the league, capable of being a number two option on a championship team.
        </p>

        )}

        {data.grade === "Starter" && (
           <p className="mt-4 text-gray-400 text-sm">
           Our model grades {data.name} as an "Starter-level" player, indicating that he is a top-100 player in the league, capable of being a starter on a playoff team.
        </p>

        )}

        {data.grade === "Role Player" && (
           <p className="mt-4 text-gray-400 text-sm">
           Our model grades {data.name} as an "Role Player", indicating they might be a rotation player on a playoff team. 
        </p>

        )}
       
      </div>
        <br />
      <div className="bg-gray-900 text-white rounded-lg py-4 p-6 max-w-md mx-auto">
        

      <p className="mt-4 text-gray-400 text-sm">
          Our model works by taking into account player age, advanced stats, recent progression, and similar historical players and uses random forest classification to evaluate the player's grade. 
        </p>

       
       
      </div>
          </CardContent>
        </Card>



       
        <Card>
          <CardHeader>
            <CardTitle>Volume Chart</CardTitle>
          </CardHeader>
          <CardContent>
          <img src={imageUrl} className="w-full h-auto object-cover block" />    
          
          </CardContent>
        </Card>



        
      </div>
    </div>
  )
}

function LineChart(props) {
  const chartData = Object.entries(props.data).slice(-5).map(([key, value]) => ({ x: key, y: value }));
  


  
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: chartData,
          },
         
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        
        data={[
          { name: "FG%", count: props.fg *100},
          { name: "3P%", count: props.three *100},
          { name: "FT%", count: props.ft *100},
          { name: "TS%", count:  60.2},
          
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={({ data }) => {
          switch (data.name) { // Accessing the 'name' property directly from the data object
            case "FG%":
              return "#00b894"; // Green
            case "3P%":
              return "#e17055"; // Orange
            case "FT%":
              return "#6c5ce7"; // Purple
            case "TS%":
              return "#0984e3"; // Blue
            default:
              return "#dfe6e9"; // Light gray for any other potential bars
          }
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          textColor: "#ffffff", // Setting text color to white
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
          textColor: "#ffffff", // Setting text color to white

        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  )
}

function TrophyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}