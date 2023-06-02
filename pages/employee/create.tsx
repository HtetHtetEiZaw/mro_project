
import type { NextPage } from 'next';
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
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


import { fetcher } from '@/utils/fetcher';
import { userFormSchema, UserFormData } from '../../formSchema/user';

const EmployeeCreate: NextPage = () => {
  const router = useRouter();

  const [postError, setPostError] = React.useState<string>();
  const {
    register,
    //setValue,
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
      router.push('/user/');
    } else {
      // TODO: display error message
      setPostError('server error');
    }
  });

  const { data: roles, error: role_error } = useSWR<Prisma.RoleCreateInput[]>('/api/role', fetcher);
  const { data: departments, error: department_error } = useSWR<Prisma.DepartmentCreateInput[]>(
    '/api/department',
    fetcher
  );

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
                     {/* <Grid container spacing={2}>
                        <Grid item xs={4}>
                           <InputLabel >名前</InputLabel>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                            margin="normal"
                            required
                            error={'name' in errors}
                            helperText={errors.name?.message}
                            {...register('name')}
                            style={{backgroundColor: "#ffffff"}}
                            />
                        </Grid>
                        </Grid> */}
                        <span className='error'>{postError}</span>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <TextField
            label='Name'
            variant='standard'
            error={'name' in errors}
            helperText={errors.name?.message}
            {...register('name')}
          />
        </FormControl>
        {/*
            <label>name: </label>
            <Input {...register("name")} />
        */}
        <FormControl fullWidth>
          <TextField
            label='Email'
            variant='standard'
            required
            error={'email' in errors}
            helperText={errors.email?.message}
            {...register('email')}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label='Password'
            variant='standard'
            type='password'
            required
            error={'password' in errors}
            helperText={errors.password?.message}
            {...register('password')}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            label='role'
            required
            defaultValue=''
            error={'roleId' in errors}
            {...register('roleId')}
          >
            {roles?.map((role) => {
              return (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText error={true}>{errors.roleId?.message}</FormHelperText>
        </FormControl>
        {/*
            <label>role: </label>
            <select
            {...register("roleId")}
            defaultValue={roles ? roles[0].id : undefined}
            >
            {roles?.map((role) => {
                return (
                <option key={role.id} value={role.id}>
                    {role.name}
                </option>
                );
            })}
            </select>
            */}
        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Select
            label='department'
            required
            defaultValue=''
            error={'departmentId' in errors}
            {...register('departmentId')}
          >
            {departments?.map((department) => {
              return (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText error={true}>{errors.departmentId?.message}</FormHelperText>
        </FormControl>
        {/*
            <button
            type="button"
            onClick={() => {
                setValue("lastName", "MIYAZATO");
                setValue("firstName", "Shinobu");
            }}
            >
            SetValue
            </button>
            <input type="submit" value="Submit" />
        */}
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>

                  </Box>
            </Paper>
        </Grid>
        </Grid>

 

      
    </>
  );
};

export default EmployeeCreate;