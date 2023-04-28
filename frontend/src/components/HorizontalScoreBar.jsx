import React, { useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { TableCell, TableRow } from '@mui/material';
import {
    Box,
    Typography,
} from "@mui/material";

const HorizontalScoreBar = ({ examName, value, stateAverage }) => {
    const data = [
        {
            examName: examName,
            value: value,
            stateAverage: stateAverage
        }
    ];


     const getBarColor = ( value, stateAverage) => {
        const difference = value - stateAverage;
        if(difference <= -15){
            return "#FF0000"; //red
        } else if(difference < 0){
            return "#FFC107"; //yellow
        } else if(difference <= 15){
            return "#8BC34A"; //light green
        } else {
            return "#388E3C"; //darker green
        }
    };

    const CustomTooltip = () => {
        return (
            <div className="custom-tooltip">
                <p>{`State Average: ${stateAverage}%`}</p>
                <div className="tooltip-pointer"></div>
            </div>
        );
    };

    return (
        <TableRow>
            <TableCell sx={{ border: 'none' }} width="40%">
                <Typography variant="body1">{examName}</Typography>
            </TableCell>
            <TableCell sx={{ border: 'none' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" fontWeight="600">{Math.round(value)}%</Typography>
                    <ResponsiveContainer width="90%" height={30} >
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
                            {stateAverage && (
                                <Tooltip
                                    wrapperStyle={{ outline: "none" }}
                                    content={<CustomTooltip />}
                                    position={{ x: stateAverage * 3, y: -38 }}
                                />
                            )}
                            <Bar dataKey="value" fill={getBarColor(value, stateAverage)} />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default HorizontalScoreBar;
