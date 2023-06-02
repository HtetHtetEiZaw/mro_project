import React from "react";
import Button from "@mui/material/Button";

import { useSession, signIn, signOut } from "next-auth/react";
import PersonIcon from "@mui/icons-material/Person";
// import { getSession } from 'next-auth/react';
import Avatar from '@mui/material/Avatar';


// export async function getServerSideProps({ req }) {
//   const sessionUser = await getSession({ req });
//   console.log(sessionUser)
//  }

const AccountInfo = () => {
  const { data: session, status } = useSession();
  //  console.log(session);
   
  return (
    <>
      {status === "authenticated" && (
        <>
          {/* <PersonIcon /> */}
          {/* <span>Signed in as {session?.user?.name}</span> */}
          {/* <Avatar alt="Avatar"   src={session?.user?.imageData} 
                    style={{ width: "10%", height: "15%"}}/> */}
          <Button
            onClick={() => signOut()}
            variant="contained"
            color="secondary"
          >
            Sign out
          </Button>
        </>
      )}
      {status !== "authenticated" && (
        <Button onClick={() => signIn()} variant="contained" color="secondary">
          Sign in
        </Button>
      )}
    </>
  );
};

export default AccountInfo;