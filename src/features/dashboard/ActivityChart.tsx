import { Typography } from "@mui/material"
import { CartesianGrid, DefaultTooltipContent, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const ActivityChart = ({data}: any) => {
  return data ? 
    <ResponsiveContainer className={"dashboard__chart"}>
        <LineChart data={data} margin={{ top: 16, right: 16, left: 16, bottom: 16 }}>
            <XAxis dataKey="name" fontSize={12}/>
            <DefaultTooltipContent />
            <Tooltip/>
            <CartesianGrid stroke="#bbbbff" />
            <Line type="monotone" dataKey="Completed" stroke="#6062FF" yAxisId={0} />
        </LineChart>
    </ResponsiveContainer> : <Typography>No data available</Typography>
}

export default ActivityChart