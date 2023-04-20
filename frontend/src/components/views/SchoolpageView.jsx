import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { LocationOn, Phone, AccessTime, Fax, Email, Language } from '@mui/icons-material';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NavBar from "./NavBar";

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

import Iframe from 'react-iframe';
import { Link } from 'react-router-dom';

function SchoolpageView() {
  const location = useLocation();
  const school = location.state.school;
  const latitude = Number(school?.latitude);
  const longitude = Number(school?.longitude);
  const url = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude},${latitude},${longitude},${latitude}&layer=mapnik&marker=${latitude},${longitude}`;

  const [selectedTab, setSelectedTab] = useState(0)

  const handleChange = (e, newValue) => {
    setSelectedTab(newValue);
  };


  const TabPanel = ({ children, value, index }) => {
    return value === index && children;
  };

  const urlFix = (schoolUrl) => {
    let fixedUrl = schoolUrl
      .split("http://")
      .at(-1)
      .split("https://")
      .at(-1)
      .toLowerCase();
    if (!fixedUrl.startsWith("www.")) {
      fixedUrl = `www.${fixedUrl}`;
    }
    return fixedUrl;
  };

  return (
    <>
      <NavBar />
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Box sx={{ bgcolor: '#194973', py: 3.5 }}>
            <Typography
              variant="h4"
              component="h1"
              color="common.white"
              align="left"
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '1in',
                fontSize: 45,
                fontWeight: '',
              }}
              className="schoolpage-header"
            >
              {school?.school_name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              color="common.white"
              align="left"
              sx={{
                marginLeft: '1in',
                fontFamily: 'Arial',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
              }}
              className="schoolpage-subtitle"
            >
              <Box
                component="span"
                sx={{
                  verticalAlign: 'middle',
                  marginRight: 1,
                  fontSize: 30,
                  color: 'common.white',
                }}
              >
                <LocationOn />
              </Box>
              <span>{school?.location.split('(')[0].trim()}</span>
              <Box
                component="span"
                sx={{
                  verticalAlign: 'middle',
                  marginLeft: '1em',
                  fontFamily: 'Arial',
                  fontSize: 39,
                  color: 'common.white',
                }}
              >
                <Phone />
              </Box>
              <span style={{ marginLeft: '0.4em' }}>Contact Info</span>
            </Typography>
          </Box>

          <Box sx={{ bgcolor: '#255478', py: 1.3 }}>
            <Typography
              variant="subtitle2"
              component="div"
              align="left"
              sx={{
                marginLeft: '1in',
                fontFamily: 'Arial',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
              }}
              className="schoolpage-subtitle"
            >
              <span>
                District: <strong style={{ color: 'white' }}>#{school?.dbn.slice(0, 2)}</strong>
              </span>
              <span style={{ marginLeft: '6em' }}>
                <strong style={{ color: 'white' }}>{school?.total_students}</strong> Students
              </span>
              <span style={{ marginLeft: '6em' }}>
                Grades <strong style={{ color: 'white' }}>{school?.finalgrades.slice(0, 1)}-{school?.finalgrades.slice(2 - 4)}</strong>
              </span>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={2}>
          <Box className="left-container">
            <Typography variant="h6" sx={{ mb: 2 }}>School Profile</Typography>
            <List sx={{ mb: 3 }}>
              <ListItemButton sx={{ pl: 0 }}>
                Overview
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }}>
                Schedule and Contact
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }}>
                Navigation
              </ListItemButton>
            </List>
            <Typography variant="h6" sx={{ mb: 2 }}>Academics</Typography>
            <List>
              <ListItemButton sx={{ pl: 0 }}>
                data 1
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }}>
                data 2
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }}>
                data 3
              </ListItemButton>
            </List>
            <Typography variant="h6" sx={{ mb: 2 }}>Student Support</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>Extracurricular Activities</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>Student Outcomes</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Box className="middle-container-wrapper">
            <Box className="middle-container school-profile">
              <h2>Overview</h2>
              <p>{school?.overview_paragraph}</p>
            </Box>
    
            <Box className="middle-container school-profile">
              <h2>Schedule and Contact Information</h2>
              <h4>Campus Address</h4>
              <ListItem>
                <p>{school?.location.split('(')[0].trim()}</p>
              </ListItem>
              {school?.campus_name && (
                <div>
                  <h4>Located at</h4>
                  <ListItem>
                    <p>{school?.campus_name}</p>
                  </ListItem>
                </div>
              )}
              <h4>Start and End Time</h4>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItem>
                  <AccessTime sx={{ fontSize: '1.5rem', pr: '15px' }} />
                  <p>{school?.start_time} - {school?.end_time}</p>
                </ListItem>
              </Box>
              <h4>Contact Info & School Website</h4>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <ListItem>
                    <a href={`tel:${school?.phone_number}`} style={{ display: 'flex', alignItems: 'center' }}>
                      <Phone sx={{ fontSize: '1.5rem', pr: '15px' }} />
                      <p>{school?.phone_number}</p>
                    </a>
                  </ListItem>
                  <ListItem>
                    <a href={`fax:${school?.fax_number}`} style={{ display: 'flex', alignItems: 'center' }}>
                      <Fax sx={{ fontSize: '1.5rem', pr: '15px' }} />
                      <p>{school?.fax_number}</p>
                    </a>
                  </ListItem>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <ListItem>
                    <a href={`https://${urlFix(school?.website)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                      <Language sx={{ fontSize: '1.5rem', pr: '15px' }} />
                      <p>{urlFix(school?.website)}</p>
                    </a>
                  </ListItem>
                  <ListItem>
                    <a href={`mailto:${school?.school_email}`} style={{ display: 'flex', alignItems: 'center' }}>
                      <Email sx={ { fontSize: '1.5rem', pr: '15px' }} />
                      <p>{school?.school_email}</p>
                    </a>
                  </ListItem>
                </Box>
              </Box>
            </Box>

            <Box className="middle-container school-profile">
              <h2>Navigation</h2>
              <h4>Nearby Transportation</h4>
              <List>
                {school?.subway && school?.subway !== "N/A" && (
                  <ListItem>
                    <Typography variant="p">Subway: {school?.subway}</Typography>
                  </ListItem>
                )}
                {school?.bus && school.bus !== "N/A" && (
                  <ListItem>
                    <Typography variant="p">Bus: {school?.bus}</Typography>
                  </ListItem>
                )}
              </List>
              <Link to={{
                pathname: "/map", 
                state: {lat: latitude, lng: longitude, school_data: school}
              }}>
              <h4>Click here for more map and direction information</h4>
                <div className="map-wrapper">
                  <Iframe
                    url={url}
                    className="map-iframe"
                    width="80%"
                    height="400"
                    frameborder="0"
                    scrolling="no"
                  />
                </div>
              </Link>
            </Box>
            <Box className="middle-container school-profile">
              <h2>Statistics</h2>

              <Box sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "column"
                },
              }}>
                <Tabs
                  sx={{ alignSelf: "center", mb: 2, pl: 4 }}
                  value={selectedTab}
                  onChange={handleChange}
                >
                  <Tab sx={{ fontWeight: "500" }} label="Regents Exams Results" />
                  <Tab sx={{ fontWeight: "500" }} label="AP Exams Results" />
                  <Tab sx={{ fontWeight: "500"}} label="SAT Exams Results" />
                </Tabs>


                <Box>
                  <ToggleButtonGroup 
                    // value={this.state.category} 
                    // onChange={this.handleCategoryChange} 
                    exclusive 
                    sx={{ pr: 4 }}
                  >
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
                      //value={this.state.selectedCategory}
                      label="Exam"
                      //onChange={this.handleExamChange}
                      sx={{ zIndex: 1000 }}
                    >
                      {/* {this.state.examTypes.map((exam, index) => {
                        return (
                          <MenuItem key={index} value={exam}>
                            {exam}
                          </MenuItem>
                        )
                      })} */}
                    </Select>
                  </FormControl>

                </Box>

              </Box>
              <TabPanel
                value={0}
                index={selectedTab}
                sx={{ p: 2 }}
              >
                {/* {
                  this.state.regentsData.map(school => {
                    school.forEach((exam) => {
                      if (exam.regents_exam == this.state.selectedCategory && exam.category == this.state.category) {

                        this.state.filteredData.push(exam)
                      }
                    })
                  })
                } */}

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={100}
                    //data={this.state.filteredData}
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
                index={selectedTab}
                sx={{ p: 2 }}
              >
                {/* {this.state.apData.length !== 0 || "" || undefined ?
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
                  <Box sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Typography color="text.primary" fontWeight={500}>No data available for this</Typography>
                  </Box>
                } */}

              </TabPanel>

              {/* SAT DATA TAB */}
              <TabPanel
                value={2}
                index={selectedTab}
                sx={{ p: 2 }}
              >
                {/* {this.state.apData.length !== 0 || "" || undefined ?
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
                  : <Box sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Typography color="text.primary" fontWeight={500}>No data available for this</Typography>
                  </Box>
                } */}
              </TabPanel>
            </Box>
          </Box>
        </Grid>

      </Grid>
    </>
  );
}

export default SchoolpageView;
