import React, {useState} from 'react'
import { Box, Drawer, List, ListItem, ListItemIcon } from "@mui/material";
import Card from '@mui/material/Card'
import CardContent from "@mui/material/CardContent";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from '@mui/material/Divider';

import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    getDoc,
    doc,
    collection,
    getDocs,
    updateDoc,
    arrayUnion,
    onSnapshot,
    deleteDoc,
    FieldValue,
  } from "firebase/firestore";

import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';

import EditModal from "./EditModal";

const SavedSchoolsList = (props) => {
    const [selectedTab, setselectedTab] = React.useState("1");
    const [username, setUsername] = React.useState("");
    const [role, setRole] = React.useState("");
    const [savedSchools, setSavedSchools] = React.useState([]);
    const [reviews, setReviews] = React.useState([]);

    const handleTabChange = (e, newValue) => {
        setselectedTab(newValue);
    }

    const TabPanel = ({ children, value, index }) => {
        return value === index && children;
    };

    const removeReview = () => {
        try {

        }
        catch (error) {

        }
    }

    const editReview = () => {

    }

    const goToSchoolOnMap = async(school) => {
        const location = await fetch(`https://data.cityofnewyork.us/resource/uq7m-95z8.json?school_name=${school}`)
        const data = await location.json();
        props.goToSchool(Number(data[0].longitude), Number(data[0].latitude), data[0])
        props.onClose()
    }

    const removeSavedSchool = async (name) => {
        try {
            if (auth.currentUser) {
                const uid = auth.currentUser.uid;
                const docRef = doc(db, 'users', uid);

                const querySnapshot = await getDoc(docRef);

                if (querySnapshot.exists()) {
                    const savedSchools = querySnapshot.data().saved_schools;
                    const removedSchool = savedSchools.filter(
                        school => school !== name
                    )
                    return updateDoc(docRef, {
                        saved_schools: removedSchool
                    })
                }
            }
            else {
                console.log("error");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = auth.currentUser.uid;
                const docRef = doc(db, "users", uid);

                onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUsername(docSnap.data().username.split("@").at(0));
                        setRole(docSnap.data().role);
                        setSavedSchools(docSnap.data().saved_schools);
                        setReviews(docSnap.data().reviews);
                    } else {
                        console.log("document does not exist");
                    }
                })

            } else {
                console.log("not logged in");
            }
        });
    }, []);

    return (
        <>
        <Card
            sx={{
                maxWidth: { xs: "100vw", sm: 400, md: 400 },
                maxHeight: "100%",
                zIndex: 99999,
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                overflowY: "auto",
            }}
        >
            <CardContent>
                <Box sx={{
                    display: "flex", 
                    justifyContent: "space-between", 
                    flexDirection: "row", 
                    alignItems: "center"
                }}>
                    <Typography variant='h6'>Saved</Typography>
                    <IconButton onClick={props.onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider 
                    sx={{
                        mt: 2,
                        mb: 1,
                    }}
                />

                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs"
                    value={selectedTab}
                    onChange={handleTabChange}
                >
                    <Tab label="Saved Schools" value="1"/>
                    <Tab label="My Reviews" value="2"/>
                </Tabs>

                <TabPanel value={selectedTab} index="1">
                    {savedSchools.length === 0 ? (
                        <Typography sx={{ color: "#222222" }}>
                            You do not have any saved schools.
                        </Typography>
                    ) : (
                        savedSchools.map((name, i) => (
                            <Card key={i} sx={{ display: "flex", m: 2, p: 2, whiteSpace: 'nowrap', }}>
                                <Box sx={{width: 300}}>
                                    <CardContent>
                                        <Typography variant="body2" sx={{textOverflow: 'ellipsis', overflow: "hidden"}}>{name}</Typography>
                                    </CardContent>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <IconButton size="small" onClick={() => goToSchoolOnMap(name)}>
                                            <LocationOnIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => removeSavedSchool(name)}>
                                            <DeleteIcon fontSize="14px"/>
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Card>
                        ))
                    )}
                </TabPanel>

                <TabPanel value={selectedTab} index="2">
                    {reviews.length === 0 ? (
                        <Typography sx={{ color: "#222222" }}>
                            You do not have any reviews.
                        </Typography>
                    ) : (
                        reviews.map((data) => (
                            <Card key={data.school} sx={{ display: "flex", m: 2, p: 2 }}>
                                <Box sx={{width: 300}}>
                                    <CardContent sx={{flex: '1 0 auto'}}>
                                        <Typography variant="body2" sx={{ textOverflow: 'ellipsis', overflow: "hidden" }}>{data.school}</Typography>
                                        
                                        <Typography variant="body1" sx={{textOverflow: 'ellipsis', overflow: "hidden"}}>{data.content}</Typography>  
                                    </CardContent>
                                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Box sx={{width: "100%"}}>
                                            <Typography variant='subtitle2'>{data.datePosted}</Typography>
                                        </Box>
                                        <Box sx={{display: "flex", flexDirection: "row"}}>
                                            <IconButton size="small" onClick={() => editReview}>
                                                <ModeEditIcon fontSize='inherit' />
                                            </IconButton>
                                            <IconButton size="small"  onClick={() => removeReview}>
                                                <DeleteIcon fontSize='inherit' />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>
                        ))
                    )}
                </TabPanel>
            </CardContent>
        </Card>
        {/* <EditModal user={username} name={school} role={role}/> */}
        </>
  )
}

export default SavedSchoolsList;
