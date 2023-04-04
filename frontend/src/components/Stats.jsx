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
    ResponsiveContainer
} from 'recharts'
import IconButton from "@mui/material/IconButton";
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

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
        }
        this.inputValue = null
    }

    componentDidMount() {
        fetch(`https://data.cityofnewyork.us/resource/2h3w-9uj9.json?school_dbn=${this.props.school}`)
            .then((response) => response.json())
            .then((data) => {
                this.state.regentsData.push(data)
                console.log(data)
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
    }

    setExamTypes = (e, type) => {
        this.setState({
            selectedCategory: type
        })
        console.log(this.state.selectedCategory)
    }
    setInputExamTypes = (e, newValue) => {
        this.setState({
            inputValue: newValue
        })
        console.log(this.state.selectedCategory)

    }

    handleTab = (_, value) => {
        this.setState(() => ({
            selectedTab: value,
        }));
    };

    handleCategoryChange = (e, value) => {
        this.setState({
            category: value
        })
    }

    handleExamChange = (e) => {
        console.log(e.target.value)
        this.setState({
            selectedCategory: e.target.value
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
                    zIndex: 100000,
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
                        flexDirection: "row",
                        justifyContent: "space-between"
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
                        <Box sx={{pr: 4}}>
                            <ToggleButtonGroup value={this.state.category} onChange={this.handleCategoryChange} exclusive>
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
                        </Box>

                        <FormControl sx={{pr: 4}}>
                            <InputLabel id="demo-simple-select-label">Exam Type</InputLabel>
                            <Select
                                value={this.state.selectedCategory}
                                label="Exam"
                                onChange={this.handleExamChange}
                            >
                                {this.state.examTypes.map((exam, index) => (
                                    <MenuItem key={index} value={exam} sx={{color: "red", p: 5}}>
                                        {exam}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* <Autocomplete
                            disablePortal
                            value={this.state.selectedCategory || null}
                            onChange={(e, newValue) => {
                                this.setExamTypes(newValue);
                            }}
                            inputValue={this.state.inputValue}
                            onInputChange={(e, newInputValue) => {
                                console.log(newInputValue)
                                this.setInputExamTypes(newInputValue);
                            }}
                            sx={{ width: 300, pr: 4 }}
                            options={this.state.examTypes}
                            renderInput={(params) =>
                                <TextField {...params} label="Exam type" />
                            }
                        /> */}
                    </Box>

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

                    <TabPanel
                        value={1}
                        index={this.state.selectedTab}
                        sx={{ p: 2 }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={100}
                                data={this.state.apData}
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

                    <TabPanel
                        value={2}
                        index={this.state.selectedTab}
                        sx={{ p: 2 }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={100}
                                data={this.state.satData}
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
                </Box>
            )

        }
    }
}

export default Stats