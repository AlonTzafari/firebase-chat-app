import './App.scss';
import Auth from './components/Auth';
import DisplayContainer from './components/DisplayContainer'; 
import firebase from './database';
import {themeContext} from './context';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useState} from 'react';
import {Switch, Redirect, Route, useHistory} from 'react-router-dom';


const auth = firebase.auth();


function App() {

  
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');  
  }
  const [user] = useAuthState(auth);
  const history = useHistory();

  return (
    <themeContext.Provider value={{theme, toggleTheme}}>
      <div className={`App ${theme}`}>
        {
          user ?
          null :
          history.push('/login')
          // <Redirect to="/login" />
        }
          <Switch>
              <Route exact path="/login">
                <Auth destination={history.location} />
              </Route>
              <Route path="/">
                <div>
                  {user && <DisplayContainer user={user} />}
                </div>
              </Route> 
          </Switch>
      </div>
    </themeContext.Provider>
  );
}

export default App;
