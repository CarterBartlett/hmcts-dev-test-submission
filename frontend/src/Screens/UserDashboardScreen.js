import React from 'react';
import { Button } from '@mui/material';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function UserDashboardScreen() {
  const handleLogoutAttempt = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        console.log('Logout successful');
        props.onUserLogout();
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Error during logout attempt: ', err);
    }
  }

  return (
    <div>UserDashboardScreen
    <Button variant="contained" color="primary" onClick={handleLogoutAttempt}>Logout</Button>
    </div>
  )
}
