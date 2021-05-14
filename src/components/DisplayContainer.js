import {useState} from 'react';
import firebase from '../database';
import Home from './Home';
import Chat from './Chat';
import '../styles/DisplayContainer.scss';
import {FaHome, FaDoorOpen} from 'react-icons/fa'

function DisplayContainer({user}) {
    const [activeChat, setActiveChat] = useState(null);

    const openChat = (chat) => {
        setActiveChat(chat);          
    }

    const closeChat = () => {
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
                    <Chat chat={activeChat} closeChat={closeChat} /> : 
                    <Home openChat={openChat}/>
                }
            </main>
        </div>
    )
}

export default DisplayContainer
