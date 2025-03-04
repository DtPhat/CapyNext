'use client';

import { chartData } from '@/lib/placeholders';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';


export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={360} className=''>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} 2024`}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={104}
          tickFormatter={(value) => `${value} VND`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}