import './App.scss';
import Auth from './components/Auth';
import DisplayContainer from './components/DisplayContainer'; 
import firebase from './database';


import {useAuthState} from 'react-firebase-hooks/auth';
import {useState} from 'react';


const auth = firebase.auth();

function App() {

  const [theme, setTheme] = useState('dark');
  const [user] = useAuthState(auth);

  return (
    <div className={`App ${theme}`}>
      {user ? <DisplayContainer user={user} /> : <Auth />}
    </div>
  );
}

export default App;
