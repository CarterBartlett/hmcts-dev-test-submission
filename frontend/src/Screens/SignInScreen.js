import React, { useState } from 'react'
import {TextField, Box, ButtonGroup, Button } from '@mui/material';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function SignInScreen(props) {
  const [candidateUsername, setCandidateUsername] = useState('');
  const [candidatePassword, setCandidatePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearFields = () => {
    //setCandidateUsername('');
    setCandidatePassword('');
    setErrorMessage('');
  }

  const handleLoginAttempt = async () => {
    try{
      const res = await axios.post(`${BACKEND_URL}/auth/login`, {username: candidateUsername, password: candidatePassword});
      if (res.status === 200 && res.data) {
        clearFields();
        props.onUserLogin(res.data);
      } else {
        console.error('Login failed');
      }
    } catch(err) {
      console.error('Error during login attempt: ', err);
      if (err.response && err.response.status === 401) {
        setErrorMessage('Invalid username or password');
      } else {
        setErrorMessage('An error occurred during login. Please try again later.');
      }
    }
  }

  const handleRegisterAttempt = async () => {
    try{
      const res = await axios.post(`${BACKEND_URL}/auth/register`, {username: candidateUsername, password: candidatePassword});
      if (res.status === 200 && res.data) {
        handleLoginAttempt();
      } else {
        console.error('Registration failed');
      }
    } catch(err) {
      console.error('Error during registration attempt: ', err);
    }
  }

  return (
    <Box component="form" sx={{bgcolor: 'darkgrey', padding: 2, borderRadius: 1, width: '300px', margin: 'auto', marginTop: '100px', textAlign: 'center'}}>
      <h1>Sign In</h1>
      <div>
        <TextField id="username" label="Username" variant="outlined" sx={{margin: 1}} value={candidateUsername} onChange={e=>setCandidateUsername(e.target.value)}/>
        <TextField id="password" label="Password" variant="outlined" sx={{margin: 1}} value={candidatePassword} onChange={e=>setCandidatePassword(e.target.value)} type="password" />
      </div>
      <p>{errorMessage}</p>
      <ButtonGroup variant="contained">
        <Button disabled={!candidateUsername || !candidatePassword} onClick={handleLoginAttempt}>Log In</Button>
        <Button disabled={!candidateUsername || !candidatePassword} onClick={handleRegisterAttempt}>Sign Up</Button>
      </ButtonGroup>
    </Box>
  )
}