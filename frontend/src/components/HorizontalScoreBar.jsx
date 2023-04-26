import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TableCell, TableRow } from '@mui/material';
import {
    Box,
    Typography,
  } from "@mui/material";

const HorizontalScoreBar = ({ examName, value }) => {

  const data = [
    {
      examName: examName,
      value: value,
    }
    ];

    return (
        <TableRow>
            <TableCell sx={{ border: 'none' }} width="40%">
                <Typography variant="body1">{examName}</Typography>
            </TableCell>
            <TableCell sx={{ border: 'none' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" fontWeight="600">{Math.round(value)}%</Typography>
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
                            <YAxis type="category" dataKey="examName" hide />
                            <CartesianGrid stroke="#f0f0f0" fill="#f0f0f0" vertical={false} />
                            <Bar dataKey="value" fill="#8BC34A" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default HorizontalScoreBar;
