import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetcher } from '@/utils/fetcher';
import { userFormSchema, UserFormData } from '../../formSchema/user';
// import Link from 'next/link';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import IconButton from '@mui/material/IconButton';
// import Slider from '@mui/material/Slider';
// import { useState, useEffect } from "react";
// import AvatarEditor from "react-avatar-editor";

// import { ChangeEvent } from 'react';

import { ChangeEvent, useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Slider from '@mui/material/Slider';
import AvatarEditor from 'react-avatar-editor';

interface PictureState {
  cropperOpen: boolean;
  img: string | null;
  zoom: number;
  croppedImg: string;
}

const theme = createTheme({
  palette: {
    background: {
      paper: '#dcddfc', // your color
    },
  },
});

export default function SignUpPage (){
  const router = useRouter();
  const [postError, setPostError] = React.useState<string>();
//   const [selectedFile, setSelectedFile] = useState<File |  Blob>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const editorRef = useRef<AvatarEditor | null>(null);
  const [picture, setPicture] = useState<PictureState>({
    cropperOpen: false,
    img: null,
    zoom: 2,
    croppedImg:
      'https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png',
  });

  const handleSlider = (event: Event, value: number | number[]) => {
    setPicture({
      ...picture,
      zoom: value as number,
    });
  };

  const handleCancel = () => {
    setPicture({
      ...picture,
      cropperOpen: false,
    });
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();

      setPicture({
        ...picture,
        img: null,
        cropperOpen: false,
        croppedImg,
      });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files.length>0){
      const url = URL.createObjectURL(event.target.files[0]);
      setPicture({
        ...picture,
        img: url,
        cropperOpen: true,
      });
      setSelectedFile(event.target.files[0]);
    } 
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
     resolver: yupResolver(userFormSchema),
  });

  
  const onSubmit = handleSubmit(async (formData) => {
    const data = new FormData();
	data.append('selectedFile', selectedFile);

    let filename = null;
				if(selectedFile) {
					try {
						const res = await fetch('/api/upload/multer', {
							method: 'POST',
							body: data,
						});
			
						if (res.ok) {
							const responseJson = await res.json();
							if(responseJson) {
								// setFileName(responseJson.filename);
								 filename =  responseJson.filename;
							}
						} else {
							console.error('File upload failed:', res.status);
						}
					} catch (error) {
						console.error('File upload failed:', error);
					}	
   			}

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // headers: { 'Content-Type': ' multipart/form-data' },
      body: JSON.stringify(formData),
     // body:newformData,
    });
    //  console.log(response);
    if (response.ok) {
      const responseJSON = await response.json();
      console.log(responseJSON);
      router.push('user/profile');
      // router.push('user/');

    } else {
      // /setPostError('server error');
      setPostError('This user is already exist.');
    }
    
  });

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
         
          <Box component="form" onSubmit={onSubmit}  noValidate sx={{ mt: 3,mb:3,mr:5,ml:5 }} >
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
              ref={editorRef}
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
                 <input hidden type="file" accept="image/*" {...register('imageUrl')}  onChange={handleFileChange}  id="imageUrl"
              /> 
                 <ModeEditOutlineOutlinedIcon /> 
              </IconButton>
          

          </Box>

          {/* <input type="file" accept="image/*" {...register('imageUrl')}  onChange={handleFileChange} id="imageUrl"   name="imageUrl"/> */}
          {/* <input accept="image/*" type="file" id="select-image"
          style={{ display: "none" }} onChange={handleFileChange}/> */}

          {/* {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div> */}
          {/* <img src={imageUrl} alt={selectedImage.name} height="100px" /> */}
          {/* <Avatar alt="Avatar"   src={imageUrl} 
              style={{ width: "30%", height: "auto", padding: "5" }}/>
        </Box>
      )} */}
      

           <InputLabel >名前</InputLabel>
            <TextField
              margin="normal"
              fullWidth
              required
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

