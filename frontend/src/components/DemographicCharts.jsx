import React from 'react';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const colors = ['#ffc658', '#33D391', '#00844E', '#014025', '#B1DDFA', '#338CE4', '#0D63D0', '#00206A'];


const DemographicsChart = ({ demographics }) => {
    const asianPercentage = (demographics[0]?.asianPercentage ?? 0) * 100;
    const blackPercentage = (demographics[0]?.blackPercentage ?? 0) * 100;
    const hispanicPercentage = (demographics[0]?.hispanicPercentage ?? 0) * 100;
    const whitePercentage = (demographics[0]?.whitePercentage ?? 0) * 100;
    const nativeAmericanPercentage = (demographics[0]?.nativeAmericanPercentage ?? 0) * 100;
    const missingRacePercentage = (demographics[0]?.missingRacePercentage ?? 0) * 100;
    const multiRacePercentage = (demographics[0]?.multiRacePercentage ?? 0) * 100;

    const minoritieTotal = asianPercentage + blackPercentage + hispanicPercentage + nativeAmericanPercentage + multiRacePercentage + missingRacePercentage;

    const data = [
        { name: 'Minority Enrollment', value: 0 },
        { name: 'White', value: whitePercentage },
        { name: 'Hispanic', value: hispanicPercentage },
        { name: 'Asian', value: asianPercentage },
        { name: 'Black', value: blackPercentage },
        { name: 'Native American', value: nativeAmericanPercentage },
        { name: 'Two or More Races', value: multiRacePercentage },
        { name: 'Missing Information', value: missingRacePercentage },
    ];


    const femalePercentage = demographics[0]?.femalePercentage * 100;
    const malePercentage = demographics[0]?.malePercentage * 100;

    const genderData = [
        { name: 'Gender Distribution', Female: femalePercentage, Male: malePercentage }
    ];
    return (
        <>
            <div style={{ position: 'relative' }} onClick={(e) => e.preventDefault()}>
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
                        activeShape={null}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                style={{ outline: 'none' }}
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
                            let percentage;
                            if (entry.payload.name === "Minority Enrollment") {
                                percentage = `${minoritieTotal.toFixed(1)}%`;
                            } else {
                                percentage = `${entry.payload.value.toFixed(1)}%`;
                            }
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
                <PieChart onClick={() => { }} width={600} height={400} margin={{ left: -10 }} style={{ position: 'absolute', top: '0px', left: '-120px' }}>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={180}
                        innerRadius={170}
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            entry.name === 'White' ?
                                <Cell style={{ outline: 'none' }} key={`cell-${index}`} fill="none" /> :
                                <Cell style={{ outline: 'none' }} key={`cell-${index}`} fill="#ffc658" />
                        ))}
                    </Pie>
                </PieChart>
                <h4 style={{ marginTop: '25px' }}>
                    Gender Distribution
                </h4>
            </div>
            <div>
                <ResponsiveContainer width="100%" height={120}>
                    <BarChart
                        data={genderData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid stroke="#FFF" fill="#FFF" />
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis type="category" dataKey="name" hide />
                        <Legend
                            iconType="circle"
                            align="left"
                            verticalAlign="bottom"
                            formatter={(value, entry) => {
                                return (
                                    <span style={{ color: '#555'}}>
                                        <span style={{ marginLeft: 6}} >{entry.dataKey}</span>
                                        <span style={{ fontWeight: 'bold' }}>{entry.dataKey === 'Female' ? ` ${femalePercentage.toFixed(1)}%` : ` ${malePercentage.toFixed(1)}%`}</span>
                                    </span>
                                );
                            }}
                        />
                        <Bar dataKey="Female" stackId="a" fill="#014BB4" />
                        <Bar dataKey="Male" stackId="a" fill="#1FBB84" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default DemographicsChart;
