import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Table, TableRow, TableCell } from '@mui/material';

const QualityCharts = ({ quality }) => {
    const rigorousInstruction = formatValue(Math.round(quality[0]?.rigorousInstruction));
    const collaborativeTeachers = formatValue(Math.round(quality[0]?.collaborativeTeachers));
    const supportiveEnvironment = formatValue(Math.round(quality[0]?.supportiveEnvironment));
    const effectiveLeadership = formatValue(Math.round(quality[0]?.effectiveLeadership));
    const strongFamilyTies = formatValue(Math.round(quality[0]?.strongFamilyTies));
    const trustPercentage = formatValue(Math.round(quality[0]?.trustPercentage));

    const data = [
        { category: 'Rigorous Instruction', question: "Do teachers promote excellence and active participation in class?", percentage: rigorousInstruction },
        { category: 'Collaborative Teachers', question: "Do teachers collaborate and value feedback from colleagues?", percentage: collaborativeTeachers },
        { category: 'Safe Environment', question: "Do students feel safe, supported, and intellectually stimulated?", percentage: supportiveEnvironment },
        { category: 'Effective Leadership', question: "Are the school's leaders visible, approachable, and trustworthy?", percentage: effectiveLeadership },
        { category: 'Engaged Families', question: "Does the school involve families in progress updates and volunteering?", percentage: strongFamilyTies },
        { category: 'Trust', question: "Does this school have an atmosphere of trust and respect in its relationships?", percentage: trustPercentage },
    ];

    const GRAY_COLOR = '#DBDEED';

    const getBarColor = (percentage) => {
        if (percentage >= 75) {
            return '#00946a'; //Green
        } else if (percentage >= 50) {
            return '#FFBF2A'; //yellow
        } else {
            return 'red'; //red
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Table>
                <tbody>
                    {data.map((entry, index) => {
                        const value = entry.percentage;
                        const grayValue = 100 - value;

                        const pieData = [
                            { name: entry.category, value },
                            { name: '', value: grayValue },
                        ];

                        return (
                            <TableRow key={entry.category}>
                                <TableCell style={{ width: '25%'}}>
                                    <ResponsiveContainer width="100%" height={90}>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={45}
                                                innerRadius={30}
                                                startAngle={90}
                                                endAngle={-270}

                                            >
                                                <Cell key={`cell-${index}`} fill={getBarColor(entry.percentage)} />
                                                <Cell key={`cell-${index}-1`} fill={GRAY_COLOR} />
                                            </Pie>
                                            <text x="51%" y="46%" textAnchor="middle" dominantBaseline="middle" fontSize="20px">
                                                {value}%
                                            </text>
                                            <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle" fontSize="14px" fill="#555">
                                                agree
                                            </text>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </TableCell>
                                <TableCell style={{ width: '75%', textAlign: 'left' }}>
                                    <div style={{ fontSize: '16px', fontWeight: '500' }}>{entry.category}</div>
                                    <div style={{ fontSize: '14px', color: 'gray' }}>{entry.question}</div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

function formatValue(value) {
    if (isNaN(value)) {
      return "Data unavailable";
    } else {
      return value;
    }
  }

export default QualityCharts;
