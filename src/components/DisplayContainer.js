import {useState} from 'react';
import firebase from '../database';
import Home from './Home';
import Chat from './Chat';
import '../styles/DisplayContainer.scss';
import {FaHome, FaDoorOpen} from 'react-icons/fa';
import {Redirect, Switch, Route, useHistory} from 'react-router-dom';

function DisplayContainer({user}) {
    const [activeChat, setActiveChat] = useState(null);
    const history = useHistory();
    const openChat = (chat) => {
        setActiveChat(chat);          
    }

    const closeChat = () => {
        history.push('/home');
        setActiveChat(null);
    }

    const signOut = () => {
        firebase.auth().signOut();
    }
    return (
        <div className="Display">
            <header>
                <div className="group1">
                    <button className="home" onClick={closeChat}><FaHome /></button>
                    <h2>{user.displayName}</h2>
                </div>
                <button className="signOut" onClick={signOut}><FaDoorOpen /><span>Sign Out</span></button>
            </header>
            <main>
                {
                    activeChat ?
                    <Redirect to={"/chat/" + activeChat.id}/> : 
                    <Redirect to="/home"/>
                }
                <Switch>
                    <Route exact path="/home">
                    <Home openChat={openChat}/>
                    </Route>
                    <Route path="/chat/:id">
                        <Chat chat={activeChat} />
                    </Route>
                    
                </Switch>
            </main>
        </div>
    )
}

export default DisplayContainer
