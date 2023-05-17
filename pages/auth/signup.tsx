import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useSWR from 'swr';
import { Prisma } from '@prisma/client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {Card }from '@mui/material';

import Image from 'next/image';
import logo from 'images/logo.png';
import userlogo from 'images/userlogo.jpg';

import { fetcher } from '@/utils/fetcher';
import { userFormSchema, UserFormData } from '../../formSchema/user';
// import Link from 'next/link';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import IconButton from '@mui/material/IconButton';


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

export default function SignUpPage (){

  const router = useRouter();

  const [postError, setPostError] = React.useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseJSON = await response.json();
      router.push('user/profile');
      // router.push('user/');

    } else {
      // /setPostError('server error');
      setPostError('This user is already exist.');
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Image src={logo} 
           width={100}
           height={30} alt="logo"/> */}

        <Card variant="outlined" sx={{ mt: 2 }} >
         
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3,mb:3,mr:5,ml:5 }}>
           <span className='error' style={{color: "#ff0000"}} >{postError}</span>
           
           <Box
              sx={{
                // marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Image src={userlogo} 
              width={100}
              height={30} alt="userlogo"/>
              {/* <AccountCircleOutlinedIcon sx={{ mt: 3,mb:3,mr:5,ml:5 }}/> */}
              <IconButton color="primary" aria-label="upload picture" component="label" sx={{ mt:-4,ml:6}}>
                 <input hidden accept="image/*" type="file" />
                 <ModeEditOutlineOutlinedIcon />
              </IconButton>
          </Box>
           
           <InputLabel >名前</InputLabel>
            <TextField
              margin="normal"
              fullWidth
              required
              id="name"  
              error={'name' in errors}
              helperText={errors.name?.message}
              {...register('name')}
             style={{color: "#ffffff"}}
            />
          <InputLabel >メール</InputLabel>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              required
              error={'email' in errors}
              helperText={errors.email?.message}
              {...register('email')}
            
              style={{color: "#ffffff"}}
            />
            <InputLabel >パスワード</InputLabel>
            <TextField
              margin="normal"
              fullWidth
              type="password"
              id="password"
              required
              error={'password' in errors}
              helperText={errors.password?.message}
            {...register('password')}
            />
           
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}

// export default UserCreate;