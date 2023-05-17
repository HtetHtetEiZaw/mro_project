import { useState } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const RegisterPage = () => {
    const[name,setName] =useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[director,setDirector] =useState('');
    const [phNumber, setphNumber] = useState('');
    const [current_location, setcurrent_location] = useState('');
    const [employeeID, setemployeeID] = useState('');
    const [departmentId, setdepartmentId] = useState('');
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        await prisma.user.create({
          data: {
            name,
            email,
            password,
            director,
            phNumber, 
            current_location, 
            employeeID,
            departmentId
          },
        });
  
        // Registration successful, redirect to a success page or perform any other actions
      } catch (error) {
        // Handle registration error
        console.error('Error during registration:', error);
      }
    };
  
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} method='POST'>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };
  
  export default RegisterPage;
  