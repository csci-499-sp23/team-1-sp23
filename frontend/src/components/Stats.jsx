import React, { Component, useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from '@mui/material/Typography';
import {
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts'
import IconButton from "@mui/material/IconButton";
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const TabPanel = ({ children, value, index }) => {
    return value === index && children;
};

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: true,
            selectedTab: 0,
            loaded: false,
            regentsData: [],
            filteredData: [],
            satData: [],
            apData: [],
            examTypes: [],
            selectedCategory: "Living Environment",
            category: "English Proficient",
            selected: "",
        }
        this.inputValue = null
    }

    componentDidMount() {
        //GETS REGENTS DATA
        fetch(`https://data.cityofnewyork.us/resource/2h3w-9uj9.json?school_dbn=${this.props.school}`)
            .then((response) => response.json())
            .then((data) => {
                this.state.regentsData.push(data)
                data.map((exam) => {
                    this.state.examTypes.indexOf(exam.regents_exam) === -1 ? this.state.examTypes.push(exam.regents_exam) : console.log("This item already exists");
                })
                this.setState({
                    loaded: true
                })
            })
            .catch((error) => {
                console.log(error)
            })

        //GETS 2012 AP DATA 
        fetch(`https://data.cityofnewyork.us/resource/9ct9-prf9.json?dbn=${this.props.school}`)
            .then((response) => response.json())
            .then((data) => {
                if(!isNaN(data[0].num_of_ap_exams_passed)) {
                    this.state.apData.push(data)
                }
            })
            .catch((error) => {
                console.log(error)
            })

        //GETS 2010 AP DATA 
        fetch(`https://data.cityofnewyork.us/resource/itfs-ms3e.json?dbn=${this.props.school}`)
            .then((response) => response.json())
            .then((data) => {

            })
            .catch((error) => {
                console.log(error)
            })


        //GETS 2012 SAT DATA 
        fetch(`https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=${this.props.school}`)
            .then((response) => response.json())
            .then((data) => {
                this.state.satData.push(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    setExamTypes = (e, type) => {
        this.setState({
            selectedCategory: type
        })
    }
    setInputExamTypes = (e, newValue) => {
        this.setState({
            inputValue: newValue
        })
    }

    handleTab = (_, value) => {
        this.setState(() => ({
            selectedTab: value,
            filteredData: [],
        }));
    };

    handleCategoryChange = (e, value) => {
        this.setState({
            category: value
        })
    }

    handleExamChange = (e) => {
        this.setState({
            filteredData: [],
            selectedCategory: e.target.value,
        })
    }

    render() {
        if (this.state.loaded == false) {
            return (
                <Box>

                </Box>
            )
        }
        else {
            return (
                <Box sx={{
                    zIndex: 100,
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        p: 2
                    }}>
                        <Typography
                            variant="h6"
                            color="text.primary"
                            fontWeight="500"
                        >
                            Past Exam Results for {this.props.schoolName}
                        </Typography>
                        <IconButton sx={{
                            borderRadius: 0,
                        }}
                            onClick={this.props.onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            sm: "row"
                        },
                        justifyContent: "space-between",
                    }}>
                        <Tabs
                            sx={{ alignSelf: "center", mb: 2, pl: 4 }}
                            value={this.state.selectedTab}
                            onChange={this.handleTab}
                        >
                            <Tab sx={{ fontWeight: "500", mr: 2 }} label="Regents Exams Results" />
                            <Tab sx={{ fontWeight: "500", mx: 2 }} label="AP Exams Results" />
                            <Tab sx={{ fontWeight: "500", ml: 2 }} label="SAT Exams Results" />
                        </Tabs>


                        <Box>
                            <ToggleButtonGroup value={this.state.category} onChange={this.handleCategoryChange} exclusive sx={{pr: 4}}>
                                <ToggleButton value="English Proficient">
                                    English Proficient
                                </ToggleButton>
                                <ToggleButton value="Former ELL">
                                    Former ELL
                                </ToggleButton>
                                <ToggleButton value="ELL">
                                    ELL
                                </ToggleButton>
                            </ToggleButtonGroup>

                            <FormControl sx={{ pr: 4 }}>
                            <InputLabel id="simple-select-label">Exam Type</InputLabel>
                            <Select
                                value={this.state.selectedCategory}
                                label="Exam"
                                onChange={this.handleExamChange}
                                sx={{ zIndex: 1000 }}
                            >
                                {this.state.examTypes.map((exam, index) => {
                                    return (
                                        <MenuItem key={index} value={exam}>
                                            {exam}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        </Box>

                    </Box>

                    {/* REGENTS DATA TAB */}
                    <TabPanel
                        value={0}
                        index={this.state.selectedTab}
                        sx={{ p: 2 }}
                    >
                        {
                            this.state.regentsData.map(school => {
                                school.forEach((exam) => {
                                    if (exam.regents_exam == this.state.selectedCategory && exam.category == this.state.category) {
                                        
                                        this.state.filteredData.push(exam)
                                    }
                                })
                            })
                        }

                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={500}
                                    height={100}
                                    data={this.state.filteredData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="mean_score" stroke="#8884d8" activeDot={{ r: 8 }} />

                                </LineChart>
                            </ResponsiveContainer>
                    </TabPanel>

                    {/* AP DATA TAB */}
                    <TabPanel
                        value={1}
                        index={this.state.selectedTab}
                        sx={{ p: 2 }}
                    >
                        {this.state.apData.length !== 0 || "" || undefined ? 
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={100}
                                data={this.state.apData[0]}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="num_of_ap_total_exams_taken" fill="#8884d8" />
                                <Bar dataKey="num_of_ap_exams_passed" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer> :
                            <Box sx= {{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Typography color="text.primary" fontWeight={500}>No data available for this</Typography>
                            </Box>
                        }

                    </TabPanel>

                    {/* SAT DATA TAB */}
                    <TabPanel
                        value={2}
                        index={this.state.selectedTab}
                        sx={{ p: 2 }}
                    >
                        {this.state.apData.length !== 0 || "" || undefined ?
                        <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                                width={500}
                                height={100}
                                data={this.state.satData[0]}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sat_critical_reading_avg_score" fill="#8884d8" />
                                <Bar dataKey="sat_math_avg_score" fill="#82ca9d" />
                                <Bar dataKey="sat_writing_avg_score" fill="#23b5d3" />
                            </BarChart>
                        </ResponsiveContainer>
                        : <Box sx= {{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Typography color="text.primary" fontWeight={500}>No data available for this</Typography>
                        </Box>
                    }
                    </TabPanel>
                </Box>
            )

        }
    }
}

export default Stats