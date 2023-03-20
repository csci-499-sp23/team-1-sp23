import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  Typography,
} from "@mui/material";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/GoogleIcon";
import React from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../config/firebase";

export default function SignupView() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/");
    } else {
      console.log("Not logged in");
    }
  });

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const loginEmailPassword = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then((cred) => {
        console.log(cred.user);
        document.querySelector("form").reset();
      });
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="school-banner"
      />
      <Grid item xs={12} sm={8} md={5} elevation={6}>
        <Box
          sx={{
            transition: "width 0.4s",
            transitionDelay: "calc(0.4s + 0.1s)",
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(19, 19, 24, 0.95)",
            px: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100dvh",
              width: "clamp(700px, calc((769px-100vw) * 999), 100%)",
              maxWidth: "100%",
            }}
          >
            <Box
              component="header"
              sx={{
                py: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                fontWeight="lg"
                startDecorator={
                  <Box
                    component="span"
                    sx={{
                      width: 24,
                      height: 24,
                    }}
                  />
                }
              >
                SchoolsDB
              </Typography>
            </Box>
            <Box
              component="main"
              sx={{
                my: "auto",
                py: 2,
                pb: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 400,
                maxWidth: "100%",
                mx: "auto",
                borderRadius: "sm",
                "& form": {
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                },
                [`& .${formLabelClasses.asterisk}`]: {
                  visibility: "hidden",
                },
              }}
            >
              <div>
                <Typography component="h2" fontSize="xl2" fontWeight="500">
                  Welcome Back!
                </Typography>
                <Typography
                  level="body2"
                  fontSize="14px"
                  sx={{ my: 1, mb: 3 }}
                  fontWeight="300"
                >
                  Let's get started! Please enter your details.
                </Typography>
              </div>
              <form>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    sx={{
                      color: "#ffffff",
                      backgroundColor: "#000000",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "6px",
                      outline: "1px solid #454545",
                    }}
                    autoComplete="off"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="•••••••"
                    variant="outlined"
                    type="password"
                    name="password"
                    sx={{
                      color: "#ffffff",
                      backgroundColor: "#000000",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "6px",
                      outline: "1px solid #454545",
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      size="sm"
                      label="Remember Me"
                      sx={{ color: "#454545" }}
                      name="persistent"
                    />
                    <Typography>Remember Me</Typography>
                  </Box>
                  <Link fontSize="sm" fontWeight="500" href="#">
                    Forgot Password
                  </Link>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={loginEmailPassword}
                >
                  Sign In
                </Button>
              </form>
              <Button
                variant="outlined"
                startDecorator={<GoogleIcon />}
                fullWidth
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </Button>
              <Box component="footer" sx={{ py: 3 }}>
                <Typography fontWeight="300" textAlign="center" fontSize="14px">
                  <Link href="/signup">
                    Don't have an account? Sign up here.
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
