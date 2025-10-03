
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { year: 'Year 1', revenue: 60000, expenses: 45000, profit: 15000 },
  { year: 'Year 2', revenue: 180000, expenses: 80000, profit: 100000 },
  { year: 'Year 3', revenue: 400000, expenses: 150000, profit: 250000 },
];

const currencyFormatter = (value: number) => `€${value.toLocaleString()}`;

export function ProposalChart() {
  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={currencyFormatter} />
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
            formatter={(value: number, name: string) => [currencyFormatter(value), name.charAt(0).toUpperCase() + name.slice(1)]}
          />
          <Legend wrapperStyle={{ fontSize: '14px' }} />
          <Bar dataKey="revenue" fill="hsl(var(--chart-2))" name="Revenue" radius={[4, 4, 0, 0]} />
          <Bar dataKey="profit" fill="hsl(var(--primary))" name="Profit" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
