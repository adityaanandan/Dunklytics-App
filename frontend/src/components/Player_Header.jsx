/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rGhez98xk6f
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"

export default function Component() {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 bg-zinc-800 text-white">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 bg-[#55efc4] text-6xl rounded-full w-20 h-20 flex items-center justify-center">
          🏀
        </div>
        <div>
          <h1 className="font-poppins text-2xl font-bold">LeBron James</h1>
          <div className="font-poppins text-gray-300 dark:text-gray-300">PF | Los Angeles Lakers</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Points</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rebounds</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assists</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Steals</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle >Shooting Percentages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#00b894]" />
                <div>FG%</div>
                <div className="font-bold">54.2%</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#e17055]" />
                <div>3P%</div>
                <div className="font-bold">37.8%</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#6c5ce7]" />
                <div>FT%</div>
                <div className="font-bold">73.4%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shot Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-square" />
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
                <LineChart className="w-full aspect-[4/1]" />
                <div className="text-gray-300 dark:text-gray-300">Efficiency</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
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