import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const HorizontalSchoolBar = ({ value }) => {

  const data = [
    {
      value: value,
    }
  ];

  return (
    <ResponsiveContainer width="90%" height={30}>
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        layout="vertical"
      >
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis type="category" dataKey="name" hide />
        <CartesianGrid stroke="#f5f5f5" fill="#f5f5f5" vertical={false} />
        <Bar dataKey="value" fill="#8BC34A" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalSchoolBar;
