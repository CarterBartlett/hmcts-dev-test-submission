import React from 'react';
import { Button } from '@mui/material';
import TaskList from '../Components/TaskList';


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const dummyData = [
  {id:1, title: "Title1", description: "Description1", status: "Pending", due: "2023-10-01"},
  {id:2, title: "Title2", description: "Description2", status: "In Progress", due: "2023-10-02"},
  {id:3, title: "Title3", description: "Description3", status: "Completed", due: "2023-10-03"},
]

export default function UserDashboardScreen(props) {
  const handleLogoutAttempt = async (props) => {
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
    <div>Logged in as {props.auth.user.username}
    <Button variant="contained" color="primary" onClick={handleLogoutAttempt}>Logout</Button>
    <TaskList 
      data={dummyData}
    />
    </div>
  )
}
