'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

const mockUserData = [
  { date: "Jan", users: 400 },
  { date: "Feb", users: 300 },
  { date: "Mar", users: 600 },
  { date: "Apr", users: 800 },
  { date: "May", users: 1000 },
  { date: "Jun", users: 1200 },
  { date: "Jul", users: 1500 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded shadow-lg border">
        <p className="text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-blue-600">
          {payload[0].value} Users
        </p>
      </div>
    );
  }
  return null;
};

export default function OverviewChart() {
  return (
    <div className="h-full w-full">
      {/* <div className="text-lg font-semibold mb-4">User Growth Overview</div> */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockUserData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="date" 
              tickLine={false} 
              fontSize={12}
              tick={{ fill: '#666' }}
              stroke="#666"
            />
            <YAxis 
              tickLine={false} 
              fontSize={12}
              tick={{ fill: '#666' }}
              stroke="#666"
              domain={[0, 'dataMax + 500']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ fill: '#8884d8', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}