import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel } from '@mui/material';
import {Card }from '@mui/material';
import { signIn } from "next-auth/react";

import Image from 'next/image';
import logo from 'images/logo.png';

import Link from 'next/link';

import { useRouter} from 'next/router';
import { ChangeEvent, useState } from "react";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const callbackUrl= "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl: "/",
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("Invalid email or password!!!");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    // const result = await signIn("credentials", {
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   redirect: true,
    //   callbackUrl: "/",
    // });
    // console.log(result);
  // };

  return (
    <>
     <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> 
            <LockOutlinedIcon /> 
          </Avatar> */}
          
          {/* <Typography component="h1" variant="h5">
            Sign in
          </Typography> style={{backgroundColor: "#CFECEC"}}*/}
          <Image src={logo} 
           width={100}
           height={30} alt="logo"/>

        <Card variant="outlined" sx={{ mt: 2 }} >
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3,mb:3,mr:5,ml:5 }}>
          {error && (
            <p className="text-center bg-red-300 py-3 mb-6 rounded">{error}</p>
          )}
          <InputLabel >メール</InputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              // label="Email Address"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              style={{color: "#ffffff"}}
            />
            <InputLabel >パスワード</InputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              // label="Password"
              type="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button style={{backgroundColor: "#0000ff"}}
              type="submit" 
              fullWidth
              variant="contained" color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
             ログイン
            </Button>
          
           </Box>
        </Card>
      </Box>
 
      <Grid container sx={{ mt:1, ml: 15 }}>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>/api/auth/RegisterForm/{{
                 pathname: '/register/SignUp',
                 query: { callbackUrl }
                 }}
              </Grid> */}
              <Grid item >
                <Link href='/auth/signup'>
                  {"アカウント作成する"}
                </Link>
              </Grid>
      </Grid>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  

    
  );
}
