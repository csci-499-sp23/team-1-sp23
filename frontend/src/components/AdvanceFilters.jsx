import { Box, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from '@mui/material/FormLabel';
import Select from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";

import { useNavigate, createSearchParams, useSearchParams } from "react-router-dom";

import React from "react";
import SchoolsData from "../schoolData";

export default function AdvanceFilters(props) {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams ();
    const Schools = SchoolsData();
    const languageArr = [];
    const boysSportArr = [];
    const girlsSportArr = [];
    const coedSportArr = [];

    const apCourses = [
        "AP Art History",
        "AP Biology",
        "AP Calculus AB",
        "AP Calculus BC",
        "AP Chemistry",
        "AP Chinese Language and Culture",
        "AP Computer Science A",
        "AP Computer Science Principles",
        "AP English Language and Composition",
        "AP English Literature and Composition",
        "AP Environmental Science",
        "AP European History",
        "AP French Language and Culture",
        "AP German Language and Culture",
        "AP Comparative Government and Politics",
        "AP U.S. Government and Politics",
        "AP Human Geography",
        "AP Italian Language and Culture",
        "AP Japanese Language and Culture",
        "AP Latin",
        "AP Macroeconomics",
        "AP Microeconomics",
        "AP Music Theory",
        "AP Physics 1",
        "AP Physics 2",
        "AP Physics C: Electricity and Magnetism",
        "AP Physics C: Mechanics",
        "AP Psychology",
        "AP Spanish Language and Culture",
        "AP Spanish Literature and Culture",
        "AP Statistics",
        "AP United States History",
        "AP World History: Modern",
        "AP Research",
        "AP Seminar",
        "AP 2-D Art and Design",
        "AP 3-D Art and Design",
    ];

    const filteredArr = Schools.reduce((acc, current) => {
        const x = acc.find((item) => (item.language_classes === current.language_classes));
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    const filteredNeighborhoodArr = Schools.reduce((acc, current) => {
        const x = acc.find((item) => (item.neighborhood === current.neighborhood));
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, [])

    filteredArr.forEach(school => {
        if (school.language_classes != undefined) {
            const language = school.language_classes.trim().split(", ")
            language.forEach(language => {
                languageArr.push(language)
            })
        }
        languageArr.sort()
    })

    Schools.forEach(school => {
        if (school.psal_sports_boys != undefined) {
            const sport = school.psal_sports_boys.trim().split(", ")
            sport.forEach(language => {
                boysSportArr.push(language)
            })
        }
        if (school.psal_sports_girls != undefined) {
            const sport = school.psal_sports_girls.trim().split(", ")
            sport.forEach(language => {
                girlsSportArr.push(language)
            })
        }
        if (school.psal_sports_coed != undefined) {
            const sport = school.psal_sports_coed.trim().split(", ")
            sport.forEach(language => {
                coedSportArr.push(language)
            })
        }
        boysSportArr.sort()
        girlsSportArr.sort()
        coedSportArr.sort()
    })

    const filteredLanguageArr = [...new Set(languageArr)]
    const filteredSportsArr = [...new Set(boysSportArr)]
    const filteredGirlsSportsArr = [...new Set(girlsSportArr)]
    const filtredCoedSportsArr = [...new Set(coedSportArr)]

    const [borough, setBorough] = React.useState([]);
    const [neighborhood, setNeighborhood] = React.useState([])
    const [apCourse, setAPcourse] = React.useState([])
    const [language, setLanguage] = React.useState([]);
    const [sports, setSports] = React.useState([])

    const handleChange = (e) => {
        setBorough((e.target.value));
    };

    const handleAPChange = (e) => {
        const {
            target: { value },
        } = e
        setAPcourse(
            typeof value === "string" ? value.split(',') : value
        )
    }

    const handleNeighborhoodChange = (e) => {
        const {
            target: { value },
        } = e
        setNeighborhood(
            typeof value === "string" ? value.split(',') : value
        )
    }

    const handleLanguageChange = (e) => {
        const {
            target: { value },
        } = e
        setLanguage(
            typeof value === "string" ? value.split(',') : value
        )
    }

    const handleSportsChange = (e) => {
        const {
            target: { value },
        } = e
        setSports(
            typeof value === "string" ? value.split(',') : value
        )
    }

    const handleSearch = () => {
        navigate({
            pathname: "map",
            search: `?${createSearchParams({
                borough: [borough],
                neighborhood: [neighborhood],
                apCourse: [apCourse],
                language: [language],
                sports: [sports],
            })}`,
            state: {
                borough: borough,
                neighborhood: neighborhood,
                apCourse: apCourse,
                language: language,
                sports: sports,
            },
        })
    }

    const handleMapSearching = () => {
        props.setFilters(borough, neighborhood, apCourse, language, sports)

        setSearchParams({
            borough: [borough],
            neighborhood: [neighborhood],
            apCourse: [apCourse],
            language: [language],
            sports: [sports],
        })
    }

    const clearFilters = () => {
        setBorough([])
        setAPcourse([])
        setLanguage([])
        setSports([])
        setNeighborhood([])
    }

    return (
        <Dialog disableEscapeKeyDown open={open} onClose={props.handleClose} fullWidth maxWidth="md">
            <DialogTitle>Filter your Search</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column"
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        maxWidth: "100%"
                    }}>
                        <FormControl sx={{ m: 1, width: "100%", maxWidth: "50%" }}>
                            <FormLabel component="legend">Borough</FormLabel>
                            <Select
                                multiple
                                displayEmpty
                                value={borough}
                                onChange={handleChange}
                                labelId="borough-selector"
                            >
                                <MenuItem value={"Q"}>Queens</MenuItem>
                                <MenuItem value={"K"}>Brooklyn</MenuItem>
                                <MenuItem value={"X"}>Bronx</MenuItem>
                                <MenuItem value={"M"}>Manhattan</MenuItem>
                                <MenuItem value={"R"}>Staten Island</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, width: "100%", maxWidth: "50%" }}>
                            <FormLabel component="legend">Neighborhood</FormLabel>
                            <Select
                                multiple
                                displayEmpty
                                value={neighborhood}
                                onChange={handleNeighborhoodChange}
                                labelId="neighborhood-selector"
                                MenuProps={{ sx: { maxHeight: 350 } }}
                            >
                                <ListSubheader sx={{
                                    fontSize: "1rem",
                                    ml: 1,
                                    mr: 1,
                                    borderBottom: "1px solid #222222"
                                }}>Queens</ListSubheader>
                                {filteredNeighborhoodArr.map((school) =>
                                    school.borocode == "Q" ?
                                        <MenuItem
                                            key={school.neighborhood}
                                            value={school.neighborhood}
                                        >
                                            {school.neighborhood}
                                        </MenuItem> : null
                                )}
                                <ListSubheader sx={{
                                    fontSize: "1rem",
                                    ml: 1,
                                    mr: 1,
                                    borderBottom: "1px solid #222222"
                                }}>Manhattan</ListSubheader>
                                {filteredNeighborhoodArr.map((school) =>
                                    school.borocode == "M" ?
                                        <MenuItem
                                            key={school.neighborhood}
                                            value={school.neighborhood}
                                        >
                                            {school.neighborhood}
                                        </MenuItem> : null
                                )}
                                <ListSubheader sx={{
                                    fontSize: "1rem",
                                    ml: 1,
                                    mr: 1,
                                    borderBottom: "1px solid #222222"
                                }}>Brooklyn</ListSubheader>
                                {filteredNeighborhoodArr.map((school) =>
                                    school.borocode == "K" ?
                                        <MenuItem
                                            key={school.neighborhood}
                                            value={school.neighborhood}
                                        >
                                            {school.neighborhood}
                                        </MenuItem> : null
                                )}
                                <ListSubheader sx={{
                                    fontSize: "1rem",
                                    ml: 1,
                                    mr: 1,
                                    borderBottom: "1px solid #222222"
                                }}>Bronx</ListSubheader>
                                {filteredNeighborhoodArr.map((school) =>
                                    school.borocode == "X" ?
                                        <MenuItem
                                            key={school.neighborhood}
                                            value={school.neighborhood}
                                        >
                                            {school.neighborhood}
                                        </MenuItem> : null
                                )}
                                <ListSubheader sx={{
                                    fontSize: "1rem",
                                    ml: 1,
                                    mr: 1,
                                    borderBottom: "1px solid #222222"
                                }}>Staten Island</ListSubheader>
                                {filteredNeighborhoodArr.map((school) =>
                                    school.borocode == "R" ?
                                        <MenuItem
                                            key={school.neighborhood}
                                            value={school.neighborhood}
                                        >
                                            {school.neighborhood}
                                        </MenuItem> : null
                                )}
                            </Select>
                        </FormControl>

                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        maxWidth: "100%"
                    }}>
                        <FormControl sx={{ m: 1, width: "100%", maxWidth: "50%" }}>
                            <FormLabel component="legend">AP Courses</FormLabel>
                            <Select
                                multiple
                                value={apCourse}
                                onChange={handleAPChange}
                                MenuProps={{ sx: { maxHeight: 350 } }}
                            >
                                {apCourses.map(course =>
                                    <MenuItem
                                        key={course}
                                        value={course}
                                    >
                                        {course}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, width: "100%", maxWidth: "50%" }}>
                            <FormLabel component="legend">Language Classes</FormLabel>
                            <Select
                                multiple
                                value={language}
                                onChange={handleLanguageChange}
                                MenuProps={{ sx: { maxHeight: 350 } }}
                            >
                                {filteredLanguageArr.map((language) => (
                                    <MenuItem
                                        key={language}
                                        value={language}
                                    >
                                        {language}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <FormControl sx={{ m: 1 }}>
                            <FormLabel component="legend">Sports</FormLabel>
                            <Select
                                multiple
                                value={sports}
                                onChange={handleSportsChange}
                                MenuProps={{ sx: { maxHeight: 400 } }}
                            >
                                <ListSubheader sx={{
                                    fontSize: "1rem",
                                    mr: 2,
                                    ml: 2,
                                    borderBottom: "1px solid #222222"
                                }}>Girls Sports</ListSubheader>
                                {filteredGirlsSportsArr.map((sport, key) =>
                                    <MenuItem
                                        key={key}
                                        value={sport}>
                                        {sport}
                                    </MenuItem>
                                )}

                                <ListSubheader sx={{
                                    fontSize: "1rem",
                                    m: 2,
                                    borderBottom: "1px solid #222222"
                                }}>Coed Sports</ListSubheader>
                                {filtredCoedSportsArr.map((sport, key) =>
                                    <MenuItem
                                        key={key}
                                        value={sport}>
                                        {sport}
                                    </MenuItem>
                                )}
                                <ListSubheader sx={{
                                    fontSize: "1rem",
                                    m: 2,
                                    borderBottom: "1px solid #222222"
                                }}>Boys Sports</ListSubheader>
                                {filteredSportsArr.map((sport, key) =>
                                    <MenuItem
                                        key={"boy" + key}
                                        value={sport}
                                    >
                                        {sport}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Box>

                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={clearFilters}>Clear Filters</Button>
                <Button onClick={() => props.mapPage ? handleMapSearching() : handleSearch()}>Search</Button>
            </DialogActions>
        </Dialog>
    )
}
