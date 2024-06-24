/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rGhez98xk6f
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"
import { ResponsiveBar } from "@nivo/bar"
import  shot_chart  from "../assets/shot_chart.png"



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
            <BarChart theme = {theme} className="aspect-square" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shot Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={shot_chart} alt="" />
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
              <div className="flex flex-col items-center gap-2">
                <div className="text-2xl font-bold">24.2</div>
                <div className="text-gray-300 dark:text-gray-300">PER</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-2xl font-bold">12.4</div>
                <div className="text-gray-300 dark:text-gray-300">Win Shares</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-2xl font-bold">+5.7</div>
                <div className="text-gray-300 dark:text-gray-300">Net Rating</div>
              </div>
              <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-bold">+3.6</div>
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
          <div className="bg-gray-900 text-white rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">
            <span className="text-[#00b894]">Superstar</span>
          </div>
          <div className="flex items-center gap-2">
            <TrophyIcon className="w-8 h-8 text-[#00b894]" />
            <span className="text-lg font-medium">Grade</span>
          </div>
        </div>
        <p className="mt-4 text-gray-400 text-sm">
          Our model grades LeBron James as a "Superstar" player, indicating that he is a top-15 player in the league, capable of being a number one option on a championship team.
        </p>
      </div>
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
          { name: "FG%", count: 54.5 },
          { name: "3P%", count: 37.8},
          { name: "FT%", count: 73.4},
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