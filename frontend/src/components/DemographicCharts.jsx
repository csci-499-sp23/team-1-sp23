import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const colors = ['#33D391', '#00844E', '#014025', '#B1DDFA', '#338CE4', '#0D63D0', '#00206A'];


const DemographicsChart = ({ demographics }) => {
    const asianPercentage = demographics[0]?.asianPercentage * 100;
    const blackPercentage = demographics[0]?.blackPercentage * 100;
    const hispanicPercentage = demographics[0]?.hispanicPercentage * 100;
    const whitePercentage = demographics[0]?.whitePercentage * 100;
    const nativeAmericanPercentage = demographics[0]?.nativeAmericanPercentage * 100;
    const missingRacePercentage = demographics[0]?.missingRacePercentage * 100;
    const multiRacePercentage = demographics[0]?.multiRacePercentage * 100;

    const minoritieTotal = asianPercentage + blackPercentage + hispanicPercentage + nativeAmericanPercentage + multiRacePercentage + missingRacePercentage;

    const data = [
        { name: 'White', value: whitePercentage },
        { name: 'Hispanic', value: hispanicPercentage },
        { name: 'Asian', value: asianPercentage },
        { name: 'Black', value: blackPercentage },
        { name: 'Native American', value: nativeAmericanPercentage },
        { name: 'Two or More Races', value: multiRacePercentage },
        { name: 'Missing Information', value: missingRacePercentage },
    ];
    return (
        <div style={{ position: 'relative' }}>
            <PieChart width={600} height={400} margin={{ left: -10 }} style={{ top: '0px', left: '-1.2px' }}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={160}
                    innerRadius={135}
                    fill="#8884d8"
                    isAnimationActive={false}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Pie>
                <Legend
                    className="legend legend-text"
                    align="right"
                    verticalAlign="middle"
                    layout="vertical"
                    iconType="circle"
                    iconSize={12}
                    formatter={(value, entry) => {
                        const percentage = `${entry.payload.value.toFixed(1)}%`;
                        const formattedPercentage = percentage.length == 4 ? `  ${percentage}` : percentage;
                        return (
                            <span style={{ color: 'black', marginLeft: '15px' }}>
                                <span style={{ fontWeight: 'bold', color: 'black', marginRight: '15px' }}>{formattedPercentage}</span>
                                <span>{value}</span>
                            </span>
                        );
                    }}
                />
                <text
                    x="20%"
                    y="45%"
                    dominantBaseline="middle"
                    textAnchor=""
                    fontSize="3em"
                    fontWeight="lighter"

                >
                    {`${minoritieTotal.toFixed(1)}%`}
                </text>
                <text
                    x="17%"
                    y="55%"
                    dominantBaseline="middle"
                    textAnchor=""
                    fontSize="18"
                    fontWeight="bold"
                    fill="#555"
                    fontFamily="Roboto, sans-serif"
                >
                    Minority Enrollment
                </text>
            </PieChart>
            <PieChart width={600} height={400} margin={{ left: -10  }} style={{ position: 'absolute', top: '0px', left: '-120px' }}>
                <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={180}
                    innerRadius={170}
                    stroke="none"
                    
                    isAnimationActive={false}

                >
                    {data.map((entry, index) => (
                        entry.name === 'White' ?
                            <Cell key={`cell-${index}`} fill="none" /> :
                            <Cell key={`cell-${index}`} fill="#ffc658" />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
};

export default DemographicsChart;
