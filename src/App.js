import './App.scss';
import Auth from './components/Auth';
import DisplayContainer from './components/DisplayContainer'; 
import firebase from './database';


import {useAuthState} from 'react-firebase-hooks/auth';



const auth = firebase.auth();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <DisplayContainer user={user} /> : <Auth />}
    </div>
  );
}

export default App;
