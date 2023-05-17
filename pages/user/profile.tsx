import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

import Button from "@mui/material/Button";
import { getSession } from 'next-auth/react';

import useSWR, { mutate } from "swr";
import { Prisma } from "@prisma/client";

/* ライブラリ Material-UI が提供するコンポーネントの import */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

/* icons */
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { fetcher } from "@/utils/fetcher";
import { signOut } from 'next-auth/react';


const ProfilePage : NextPage = () => {
  return (
    <>
      <h1>Profile Page</h1>
      <div>
      <Button
          onClick={() => signOut()}
          variant="contained"
          color="secondary"
        >
          Sign out
        </Button>
        </div>
    </>
  );
};

export default ProfilePage ;

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });
//   if (session) {
//       return {
//           redirect: {
//               destination: '/user/profile',
//               permanent: false,
//           },
//       };
//   }
//   return {
//       props: { session },
//   };
// }

