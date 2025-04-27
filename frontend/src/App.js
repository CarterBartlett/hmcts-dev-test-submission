import {useEffect, useState} from 'react';
import axios from 'axios';

import SignInScreen from './Screens/SignInScreen';
import UserDashboardScreen from './Screens/UserDashboardScreen';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [user, setUser] = useState(null);
  const [appState, setAppState] = useState({
    loading: true
  });
  const setAppLoading = (loadState) => {setAppState({...appState, loading: loadState})};

  useEffect(()=>{
    console.info('App mounted');
    fetchUser();
  }, [])

  async function fetchUser() {
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/user`, {withCredentials: true});
      setUser(res.data);
      console.log('User: ', res.data);
      setAppLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      {user ?
        <UserDashboardScreen auth={{user}} onUserLogout={()=>setUser(null)} />
      :
        <SignInScreen onUserLogin={newUser=>setUser(newUser)}/>
      }
    </div>
  );
}

export default App;
