import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Button from "@mui/material/Button";
import useSWR, { mutate } from "swr";
import { Prisma } from "@prisma/client";

/* ライブラリ Material-UI が提供するコンポーネントの import */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SearchComponent from '../component/search';

/* icons */
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { fetcher } from "@/utils/fetcher";



const EmployeeList: NextPage = () => {

const tableStyle={
    backgroundColor:'#ffffff',
    borderRadius: '10px',
}
  /* User の外部キー(role, department)も含んだ型を定義している */
//   type UserPayload = Prisma.UserGetPayload<{
//     include: {
//       role: true;
//       department: true;
//     };
//   }>;
  /* SWR を使用して /api/user からデータを取得し、 users 配列で受け取る */
//   const { data: users, error } = useSWR<UserPayload[]>("/api/user", fetcher);

//   const onDelete = async (id: string) => {
//     const response = await fetch(`/api/user/${id}`, {
//       method: "DELETE",
//     });
//     // mutate を使用して swr がユーザ一覧データを再取得するようにする。つまりユーザ一覧の更新。
//     mutate("/api/user");
//   };

//   if (error) return <div>An error has occurred.</div>;
//   if (!users) return <div>Loading...</div>;

  return (
    <>
      {/* <Link href="/user/create" passHref>
        <Button variant="contained" color="primary">
          <PersonAddIcon /> Create User
        </Button>
      </Link> */}
      <Grid container spacing={1}>
            <Grid item xs={12} md={8} lg={18}>
              <Paper
                  sx={{
                    p:1,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '30px',
                  }}
                >
               <SearchComponent />
                </Paper>
                <Paper
                  sx={{
                    mt:2,
                    p:1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 780,
                  }}
                >
        <Table size="small" style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>name</TableCell>
              <TableCell>Deptment</TableCell>
              <TableCell>PhoneNo</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>EmployeeId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {users?.map((user: UserPayload) => {
              return ( */}
               
                {/* <TableRow key={user.id}> */}
                <TableRow >
                  <TableCell>Image</TableCell>
                  <TableCell>ユーザ名</TableCell>
                  <TableCell>技術部署</TableCell>
                  <TableCell>123456</TableCell>
                  <TableCell>user@gmail.com</TableCell>
                  <TableCell>沖縄</TableCell>
                  <TableCell>MRO-001</TableCell>
                </TableRow>
              {/* );
            })} */}
          </TableBody>
        </Table>

                </Paper>
                
              </Grid>
          </Grid>
    </>
  );
};

export default EmployeeList;
