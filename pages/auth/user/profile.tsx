import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Button from "@mui/material/Button";
import { getSession } from 'next-auth/react';
import useSWR, { mutate } from "swr";
import { Prisma } from "@prisma/client";
import { fetcher } from "@/utils/fetcher";
import { signOut } from 'next-auth/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {Card }from '@mui/material';
import Image from 'next/image';
import userlogo from 'images/user.jpg';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
// import Item  from '@material-ui/core';
import CardActions from '@mui/material/CardActions';



const ProfilePage : NextPage = () => {
  return (
    <>
    <Container component="main" maxWidth="md" >
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
              height={100} alt="user" />
              {/* <Avatar alt="Avatar" src={imageUrl} /> */}
              {/* <AccountCircleOutlinedIcon sx={{ mt: 3,mb:3,mr:5,ml:5 }} fontSize="large"/> */}
              <IconButton color="primary" aria-label="upload picture" component="label" sx={{ mt:-4,ml:10}} style={{backgroundColor: "#e3e3e3"}}>
                 <input hidden accept="image/*" type="file" />
                 <ModeEditOutlineOutlinedIcon />
              </IconButton>
              <h3>User Name</h3>
              <Card variant="outlined" >
                {/* <p>  メールアドレス    admin@gmail.com</p> */}
                <CardActions sx={{ pt:-1,pb:-1}}>
                  <h4>メールアドレス</h4>
                  <h4> admin@gmail.com</h4>
                </CardActions>
              </Card>
                <Button
                sx={{mt:2}}
                  onClick={() => signOut()}
                  // variant="contained"
                  style={{backgroundColor: "#dcddfc"}}>
                 ログアウト
               </Button>
          </Box>
     
    </Container>
     
      <div>
      {/* <Button
          onClick={() => signOut()}
          variant="contained"
          color="secondary"
        >
          Sign out
        </Button> */}
        </div>
    </>
  );
};

export default ProfilePage ;

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });
//   console.log(session);
//   if (session) {
//       return {
//           redirect: {
//               destination: 'auth/user/profile',
//               permanent: false,
//           },
//       };
//   }
//   return {
//       props: { session },
//   };
// }

