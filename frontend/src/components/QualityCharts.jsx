import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const QualityCharts = ({ quality }) => {

    const rigorousInstruction = Number(quality[0]?.rigorousInstruction);
    const collaborativeTeachers = Number(quality[0]?.collaborativeTeachers);
    const supportiveEnvironment = Number(quality[0]?.supportiveEnvironment);
    const effectiveLeadership = Number(quality[0]?.effectiveLeadership);
    const strongFamilyTies = Number(quality[0]?.strongFamilyTies);
    const trustPercentage = Number(quality[0]?.trustPercentage);

   

    const data = [
        { category: 'Rigourous Instruction', question: "Do your teachers encourage you to do your best work and explain your thinking in class?", percentage: rigorousInstruction },
        { category: 'Collaborative Teachers', question: "Do the teachers work together to improve their teaching and are they open to feedback and suggestions from colleagues?", percentage: collaborativeTeachers },
        { category: 'Safe Environment', question: "Do you feel safe in your classes, hallways, bathrooms, locker rooms, and cafeteria?", percentage: supportiveEnvironment },
        { category: 'Effective Leadership', question: "Are the school's leaders visible, approachable, and trustworthy?", percentage: effectiveLeadership },
        { category: 'Engaged Families', question: "Does the school provide opportunities for families to learn about their child's progress and volunteer?", percentage: strongFamilyTies },
        { category: 'Trust', question: "Does this school have an atmosphere of trust and respect in its relationships?", percentage: trustPercentage },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#C7B9FF', '#8884d8'];
    return (
        <div>
    {data.map((entry, index) => (
        <ResponsiveContainer width="100%" height={200} key={entry.category}>
            <PieChart>
                <Pie 
                    data={[
                        { name: entry.category, value: entry.percentage }, 
                        { name: ' ', value: 100 - entry.percentage }
                    ]} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={70} 
                    innerRadius={50}
                >
                    {[
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />,
                        <Cell key={`cell-${index}-1`} fill="#F5F5F5" />,
                    ]}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="24px">
                    {entry.percentage}%
                </text>
            </PieChart>
        </ResponsiveContainer>
    ))}
</div>

    );
};

export default QualityCharts;