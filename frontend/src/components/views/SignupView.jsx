import { CssVarsProvider, useColorScheme } from '@mui/joy/styles'
import { Box, Button, Checkbox, CssBaseline, FormControl, FormControlLabel, Input, Typography } from '@mui/material'
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Link from '@mui/joy/Link';
import Grid from '@mui/material/Grid'
import { useNavigate } from "react-router-dom"

import GoogleIcon from '../../assets/GoogleIcon'

import React, { Component } from 'react'

import {initializeApp} from 'firebase/app'
import { 
  getAuth,  
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { getFirestore, collection, doc, setDoc, addDoc } from 'firebase/firestore'

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBlzvLIfshBsJsg97DoGkFO9olqi94AMEI",
  authDomain: "schoolsdb-be6ea.firebaseapp.com",
  projectId: "schoolsdb-be6ea",
  storageBucket: "schoolsdb-be6ea.appspot.com",
  messagingSenderId: "214316542823",
  appId: "1:214316542823:web:2e1ac5bcb5b0fe64465dc2",
  measurementId: "G-EQQ5QDVJWG"
});

// initialize authentication and database
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default function SignupView() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('');

  const navigate = useNavigate();

  onAuthStateChanged(auth, user => {
    if(user) {
      navigate("/")
    }
    else {
      console.log("Failed to make an account");
    }
  })
  
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  }

  const createAccount = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password).then(cred => {
      return setDoc(doc(db, "users", cred.user.uid), {
        username: email,
        role: role,
        saved_schools: null
      })
    })

  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} className="school-banner" />
      <Grid item xs={12} sm={8} md={5} elevation={6}>
        <Box sx={{
          transition: 'width 0.4s',
          transitionDelay: 'calc(0.4s + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(19, 19, 24, 0.95)',
          px: 3,
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: 'clamp(700px, (769px-100vw) * 999, 100%)',
            maxWidth: '100%',
          }}>
            <Box component="header" sx={{
              py: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Typography
                fontWeight="lg">
                SchoolsDB
              </Typography>
            </Box>
            <Box component="main" sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: 'hidden',
              },
            }}>
              <div>
                <Typography component="h2" fontSize="xl2" fontWeight="500">
                  Hello! Let's make an account.
                </Typography>
                <Typography level="body2" fontSize="14px" sx={{ my: 1, mb: 3 }} fontWeight="300">
                  Let&apos;s get started! Please enter your details.
                </Typography>
              </div>
              <form>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder='Enter your email'
                    type='email'
                    name='email'
                    sx={{
                      color: '#ffffff',
                      backgroundColor: "#000000",
                      px: 1.5,
                      py: .5,
                      borderRadius: '6px',
                      outline: '1px solid #454545',

                    }}
                    autoComplete="off"
                    onChange={(e) => {setEmail(e.target.value)}}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder='•••••••'
                    variant="outlined"
                    type='password'
                    name='password'
                    sx={{
                      color: '#ffffff',
                      backgroundColor: "#000000",
                      px: 1.5,
                      py: .5,
                      borderRadius: '6px',
                      outline: '1px solid #454545'
                    }}
                    onChange={(e) => {setPassword(e.target.value)}}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">I am a: </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    type="role"
                    onChange={(e) => {setRole(e.target.value)}}
                  >
                    <FormControlLabel value="student" control={<Radio />} label="Student" />
                    <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                    <FormControlLabel value="parent" control={<Radio />} label="Parent" />
                    <FormControlLabel value="alumni" control={<Radio />} label="Alumni" />
                  </RadioGroup>
                </FormControl>
                <Button type="submit" fullWidth variant="contained" onClick={createAccount}>
                  Sign Up
                </Button>
              </form>
              <Button
                variant="outlined"
                startDecorator={<GoogleIcon />}
                fullWidth
                onClick={signInWithGoogle}
              >
                Sign Up with Google
              </Button>
              <Box component="footer" sx={{ py: 3 }}>
                <Typography fontWeight="300" textAlign="center" fontSize='14px'>
                  <Link href="/login">Have an account already? Sign in here.</Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}