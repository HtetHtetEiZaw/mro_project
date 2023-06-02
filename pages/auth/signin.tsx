import * as React from 'react';
import type { NextPage } from 'next';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel } from '@mui/material';
import {Card }from '@mui/material';
import { signIn } from "next-auth/react";

import Image from 'next/image';
import logo from 'images/logo.png';
import Link from '@mui/material/Link';
// import Link from 'next/link';
import { useRouter} from 'next/router';
import { ChangeEvent, useState } from "react";

const theme = createTheme({
  palette: {
    background: {
      paper: '#d4d5ff',
    },
  },
});

const  SignInPage: NextPage = () => {
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

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>

         <Image src={logo}  width={100} height={100} alt="logo"/>

         <Card variant="outlined" sx={{ mt: 2 }}  >
           <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3,mb:3,mr:5,ml:5 }} >
            {error && (
              <p className="text-center bg-red-300 py-3 mb-6 rounded">{error}</p>
            )}
            <InputLabel >メール</InputLabel>
             <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              style={{backgroundColor: "#ffffff"}}
             />
            <InputLabel >パスワード</InputLabel>
             <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
              style={{backgroundColor: "#ffffff"}}
            />
            <Button style={{backgroundColor: "#190e47"}}
              type="submit" 
              fullWidth
              variant="contained" 
              sx={{ mt: 3, mb: 2 }}
            >
             ログイン
            </Button>
           </Box>
         </Card>
         <Box sx={{marginTop: 2}}>
            <Link href='/auth/signup' underline="none">
                  {"アカウント作成する"}
            </Link>
         </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
};
export default SignInPage;
