import React, { useEffect, useState, useMemo } from 'react';
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

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const tooltipScalingFactor = useMemo(() => {
        if (screenWidth >= 1170) {
            return 3.1;
        } else if (screenWidth >= 1124) {
            return 3;
        } else if (screenWidth >= 1040) {
            return 2.5;
        } else if (screenWidth >= 1000) {
            return 2.3;
        } else if (screenWidth >= 900) {
            return 2;
        } else if (screenWidth >= 850) {
            return 3.5;
        } else if (screenWidth >= 800) {
            return 3;
        } else if (screenWidth >= 750) {
            return 2.8;
        } else if (screenWidth >= 700) {
            return 2.5;
        } else if (screenWidth >= 650) {
            return 2.3;
        } else if (screenWidth >= 600) {
            return 2.2;
        } else if (screenWidth >= 500) {
            return 2.2;
        } else {
            return 2;
        }
    }, [screenWidth]);
    const getBarColor = (examName, value, stateAverage) => {
        if (examName == "4-year high school graduation" ||
            examName == "Regents Diploma" ||
            examName == "Advanced Regents Diploma" ||
            examName == "Local Diploma" ||
            examName == "% Still Enrolled" ||
            examName == "Post-Secondary Enrollment" ||
            examName == "% Drop Out") {
            return "#00946A"; //pastel green
        } else {
            const difference = value - stateAverage;
            if (difference <= -15) {
                return "#FF0000"; //red
            } else if (difference < 0) {
                return "#FFC107"; //yellow
            } else if (difference <= 15) {
                return "#8BC34A"; //light green
            } else {
                return "#388E3C"; //darker green
            }
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
                <Typography variant="body1" align="left">{examName}</Typography>
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
                                    position={{ x: stateAverage * tooltipScalingFactor, y: -38 }}
                                />
                            )}
                            <Bar dataKey="value" fill={getBarColor(examName, value, stateAverage)} />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default HorizontalScoreBar;
