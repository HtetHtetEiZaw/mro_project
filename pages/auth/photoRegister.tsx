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
import userlogo from 'images/user.jpg';

import Avatar from '@mui/material/Avatar';


import { fetcher } from '@/utils/fetcher';
import { userFormSchema, UserFormData } from '../../formSchema/user';
// import Link from 'next/link';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import IconButton from '@mui/material/IconButton';

import Slider from '@mui/material/Slider';
import { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";

const theme = createTheme({
  palette: {
    background: {
      paper: '#dcddfc', // your color
    },
  },
});
export default function SignUpPage (){
 
  const [url, setBlobUrl] = useState<string | null>(null);

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
    console.log(formData)
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseJSON = await response.json();
      // router.push('user/profile');
      // router.push('user/');

    } else {
      // /setPostError('server error');
      setPostError('This user is already exist.');
    }
    
  });

  var editor = "";
  const [picture, setPicture] = useState({
    cropperOpen: false,
    img: null,
    zoom: 2,
    croppedImg:
      "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png"
  });

  const handleSlider = (event:any, value:any) => {
    setPicture({
      ...picture,
      zoom: value
    });
  };

  const handleCancel = () => {
    setPicture({
      ...picture,
      cropperOpen: false
    });
  };

  const setEditorRef = (ed:any) => {
    editor = ed;
  };

  const handleSave = (e:any) => {
    if (setEditorRef) {
      const canvasScaled = editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();

      setPicture({
        ...picture,
        img: null,
        cropperOpen: false,
        croppedImg: croppedImg
      });
    }
  };

  const handleFileChange = (e:any) => {
    const url = URL.createObjectURL(e.target.files[0]);
    console.log(url);
    setPicture({
      ...picture,
      img: url,
      cropperOpen: true
    });
    setBlobUrl(url);
  }

  return (
    <>
    　

      <ThemeProvider theme={theme}  >
      <Container component="main" maxWidth="md" 
      style={{backgroundColor: "#e8e6e6"}}
      sx={{ mt: -1 ,mb:-1}} 
      >

      <Box
          sx={{
            // marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
      >
     
        {/* <Card variant="outlined" sx={{ mt: 2 }} style={{backgroundColor: "#e8e6e6"}} > */}
         
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

            {picture.cropperOpen && (
          <Box display="block">
            <AvatarEditor
              ref={setEditorRef}
              image={picture.img}
              width={200}
              height={200}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              rotate={0}
              scale={picture.zoom}
            />
            <Slider
              aria-label="raceSlider"
              value={picture.zoom}
              min={1}
              max={10}
              step={0.1}
              onChange={handleSlider}
            ></Slider>
            <Box>
              <Button variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </Box>
          </Box>
            )}

              {/* <Image src={userlogo} 
              width={100}
              height={100} alt="user" /> */}
              <Avatar alt="Avatar"   src={picture.croppedImg} 
              style={{ width: "30%", height: "auto", padding: "5" }}/>
              {/* <AccountCircleOutlinedIcon sx={{ mt: 3,mb:3,mr:5,ml:5 }} fontSize="large"/> */}
              <IconButton color="primary" aria-label="upload picture" component="label" sx={{ mt:-4,ml:10}} style={{backgroundColor: "#e3e3e3"}}>
                 {/* <input hidden accept="image/*" type="file" /> */}
                 <input hidden type="file" accept="image/*"  onChange={handleFileChange} name="image" />
                 {/* {blobUrl && <input type="hidden"  value={blobUrl} />} */}
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
             style={{backgroundColor: "#ffffff"}}
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
              style={{backgroundColor: "#ffffff"}}
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
              style={{backgroundColor: "#ffffff"}}
            />
           
            <Button style={{backgroundColor: "#190e47"}}
              type="submit" 
              fullWidth
              variant="contained" color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
             登録する
            </Button>
          
           </Box>
        {/* </Card> */}
      </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}

// export default UserCreate;