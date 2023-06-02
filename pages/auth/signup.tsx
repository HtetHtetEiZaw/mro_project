import type { NextPage } from 'next';
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
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import { ChangeEvent, useState, useRef,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarEditor from '../component/avatarEditor';

import { signIn } from "next-auth/react";

const theme = createTheme({
  palette: {
    background: {
      paper: '#dcddfc', 
    },
  },
});
const SignUpPage: NextPage = () => {
  const router = useRouter();
  const [picture, setPicture] = useState({
    cropperOpen: false,
    img: '',
    zoom: 2,
    croppedImg: '',
  });
  const [postError, setPostError] = React.useState<string>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
     resolver: yupResolver(userFormSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
      if (selectedFile !== null) {
          const data = new FormData();
          data.append('selectedFile', selectedFile);
					try {
						const res = await fetch('/api/upload/multer', {
							method: 'POST',
							body: data,
						});
						if (res.ok) {
							const responseJson = await res.json();
							if(responseJson) {
                  formData.imageUrl=  responseJson.filename;
							}
						} else {
							console.error('File upload failed:', res.status);
						}
					} catch (error) {
						console.error('File upload failed:', error);
					}	
   		}
       
        formData.imageData=picture.croppedImg;
     
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const responseJSON= await response.json();
          const userId=responseJSON.id;
          const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
          });
          if (result?.ok) {
            router.push({
              pathname: '/profile/[userId]',
              query: { userId },
            });
          }

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
      sx={{ mt:2}} 
      >
      <Box
          sx={{
            // marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
      >
     
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
                {picture.cropperOpen ? (
                                        <Box display='block'>
                                            <AvatarEditor
                                               picture={picture}
                                               setPicture={setPicture}
                                               image={picture.img}
                                               scale={picture.zoom}
                                            />
                                        </Box>) : (
                                        <>
                                        {picture.croppedImg ? (
                                                <Avatar
                                                    src={picture.croppedImg}
                                                    sx={{
                                                        display: 'block',
                                                        width: '5em',
                                                        height: '5em',
                                                    }}/>
                                            ) : (
                                                <AccountCircleOutlinedIcon
                                                    sx={{
                                                        bgcolor: '#c5cae9',
                                                        color: '#1a237e',
                                                        borderRadius: '50%',
                                                        width: '5em',
                                                        height: '5em',
                                                        fontSize: '1.3em',
                                                    }}/>
                                            )}
                                            <IconButton
                                               color="primary" aria-label="upload picture" 
                                               component="label" sx={{ mt:-4,ml:10}} style={{backgroundColor: "#e3e3e3"}}>
                                                <input hidden type="file" accept="image/*" 
                                                 {...register('imageUrl')}  onChange={handleFileChange}  id="imageUrl" /> 
                                                <ModeEditOutlineOutlinedIcon  /> 
                                            </IconButton>
                                        </>
                  )}

          </Box>

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
              sx={{ mt: 3, mb: 2 }} >
             登録する
            </Button>
          
          </Box>
      </Box>
     </Container>
    </ThemeProvider>
   </>
  );
};

export default SignUpPage;

