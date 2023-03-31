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

import CloseIcon from "@mui/icons-material/Close";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
        label: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
        label: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
        label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
        label: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
        label: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
];

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
        }
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

    setExamTypes = (type) => {
        this.setState({
            selectedCategory: type
        })
    }

    handleTab = (_, value) => {
        this.setState(() => ({
            selectedTab: value,
        }));
    };

    render() {
        if (this.state.loaded != true) {
            <Box sx={{
                display: 'flex',
            }}>
                <CircularProgress />
            </Box>
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
                        <Box>
                            <ToggleButtonGroup>
                                <ToggleButton>
                                    English Proficient
                                </ToggleButton>
                                <ToggleButton>
                                    Former ELL
                                </ToggleButton>
                                <ToggleButton>
                                    ELL
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={this.state.examTypes}
                            sx={{ width: 300, pr: 4 }}
                            onChange={(e, newValue) => {
                                this.setExamTypes(newValue)
                            }}
                            onInputChange={(e, newInputValue) => {
                                this.setExamTypes(newInputValue);
                            }}
                            renderInput={(params) =>
                                <TextField {...params} label="Exam type" />
                            }
                        />
                    </Box>

                    <TabPanel
                        value={0}
                        index={this.state.selectedTab}
                        sx={{ p: 2 }}
                    >
                        {
                            this.state.regentsData.map(school => {
                                school.forEach(exam => {
                                    if (exam.regents_exam == this.state.selectedCategory && exam.category == "English Proficient") {
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