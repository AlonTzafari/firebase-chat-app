import {useContext, useState} from 'react';
import firebase from '../database';
import Home from './Home';
import Chat from './Chat';
import '../styles/DisplayContainer.scss';
import {FaHome, FaDoorOpen} from 'react-icons/fa';
import {Redirect, Switch, Route, useHistory} from 'react-router-dom';
import {headerContext} from '../context';


function DisplayContainer({user}) {
    const [headerContent, setHeaderContent] = useState( () => <></> )
    const history = useHistory();

    const closeChat = () => {
        history.push('/home');
    }

    const signOut = () => {
        firebase.auth().signOut();
    }
    return (
        <div className="Display">
            <headerContext.Provider value={{headerContent, setHeaderContent}}>
            <header>
                <div className="group1">
                    <button className="home" onClick={closeChat}><FaHome /></button>
                    {headerContent}
                </div>
                <button className="signOut" onClick={signOut}><FaDoorOpen /><span>Sign Out</span></button>
            </header>
            <main>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route path="/chat/:id" component={Chat} />
                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>
                    
                </Switch>
            </main>
            </headerContext.Provider>
        </div>
    )
}

export default DisplayContainer
