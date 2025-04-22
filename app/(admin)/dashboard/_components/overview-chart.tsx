'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

export default function OverviewChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockUserData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 