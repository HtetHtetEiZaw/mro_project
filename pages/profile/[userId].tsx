import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Button from "@mui/material/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { Prisma } from "@prisma/client";
import { fetcher } from "@/utils/fetcher";
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
import Paper from "@mui/material/Paper";
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { getSession } from 'next-auth/react';

import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

interface User {
  name: string;
  email: string;
  imageData: string;
}
const ProfilePage : NextPage = () => {

    const cardStyle = {
        height:'65px',
        borderRadius: '15px',
        backgroundColor: 'white',
      };
      const cardContent={
         paddingTop:'0px',
         paddingLeft:'15px',
         paddingRight:'15px',
      }
      const btnStyle={
        marginTop:'15px',
        borderRadius: '15px',
        color: "#190e47",
        backgroundColor: "#d4d5ff",
        width:'300px'
      }

  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await fetch(`/api/user/${userId}`);
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
        };
        if (userId) {
        fetchUserData();
        }
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

  return (
    <>
      <Grid container spacing={1}>
          <Grid item xs={12} md={8} lg={18}>
            <Paper 
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    // height: 800,
                  }}
                > 
              
                    <Box
                    sx={{
                      marginTop: 8,
                      marginBottom: 30,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',

                    }}
                  >
                    <Avatar alt="Avatar"   src={user.imageData} 
                    style={{ width: "10%", height: "15%"}}/>
                    <IconButton color="primary" aria-label="upload picture" component="label" sx={{ mt:-4,ml:10}} style={{backgroundColor: "#e3e3e3"}}>
                      <input hidden accept="image/*" type="file" />
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    <h1>{user.name}</h1>
                    <Card variant="outlined" style={cardStyle} sx={{ mt:-3}}>
                      {/* <p>  メールアドレス    admin@gmail.com</p> */}
                      <CardActions style={cardContent} >
                        <h4>メールアドレス</h4>&nbsp;&nbsp;&nbsp;
                        <h4>{user.email}</h4>
                      </CardActions>
                    </Card>
                      <Button style={btnStyle}
                        onClick={() => signOut()}
                        variant="contained" >
                      ログアウト
                    </Button>
                </Box>
            </Paper>
          </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage ;


