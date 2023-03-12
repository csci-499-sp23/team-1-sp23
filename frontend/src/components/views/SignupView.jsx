import { CssVarsProvider, useColorScheme } from '@mui/joy/styles'
import {Box, Button, Checkbox, CssBaseline, FormControl, FormControlLabel, Input, Typography} from '@mui/material'
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Link from '@mui/joy/Link';
import Grid from '@mui/material/Grid'

import GoogleIcon from '../../assets/GoogleIcon'

import React from 'react'

// interface FormElements extends HTMLFormControlsCollection {
//   email: HTMLInputElement;
//   password: HTMLInputElement;
//   persistent: HTMLInputElement;
// }

// interface SignInFormElement extends HTMLFormElement {
//   readonly elements: formElements
// }

export default function SignupView() {

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }

  return (
    <Grid container component = "main" sx ={{height: "100vh"}}>
      <Grid item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_12/2793201/190320-stuyvesant-high-school-ew-304p.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
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
              fontWeight="lg"
              startDecorator={
                <Box component="span" sx={{
                  width: 24,
                  height: 24,
                }}
                />
              }>
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
            <form onSubmit={(event) => {
              event.preventDefault();
              const formElements = event.currentTarget.elements;
              const data = {
                email: formElements.email.value,
                password: formElements.password.value,
                role: formElements.role.value
              };
              alert(JSON.stringify(data, null, 2));
            }}>
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
                />
              </FormControl>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">I am a: </FormLabel>
                <RadioGroup row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group" type="role">
                  <FormControlLabel value="student" control={<Radio />} label="Student" />
                  <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                  <FormControlLabel value="parent" control={<Radio />} label="Parent" />
                  <FormControlLabel value="alumni" control={<Radio />} label="Alumni" />
                </RadioGroup>
              </FormControl>
              <Button type="submit" fullWidth variant="contained">
                Sign Up
              </Button>
            </form>
            <Button
              variant="outlined"
              startdecorator={<GoogleIcon />}
              fullWidth>
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