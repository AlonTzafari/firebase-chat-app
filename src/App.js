import './App.scss';
import Auth from './components/Auth';
import DisplayContainer from './components/DisplayContainer'; 
import firebase from './database';
import {themeContext} from './context';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useState} from 'react';


const auth = firebase.auth();


function App() {

  
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');  
  }
  const [user] = useAuthState(auth);

  return (
    <themeContext.Provider value={{theme, toggleTheme}}>
      <div className={`App ${theme}`}>
        {
          user ?
          <DisplayContainer user={user} /> :
          <Auth />
        }
      </div>
    </themeContext.Provider>
  );
}

export default App;
