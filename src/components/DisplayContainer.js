import {useState} from 'react';
import firebase from '../database';
import Home from './Home';
import Chat from './Chat';
import '../styles/DisplayContainer.scss';

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
                <h2 onClick={closeChat}>🏠</h2>
                <h1>{user.displayName}</h1>
                <button onClick={signOut}>Sign Out</button>
            </header>
            <main>
                {activeChat ? <Chat chat={activeChat} closeChat={closeChat} /> : <Home openChat={openChat}/>}
            </main>
        </div>
    )
}

export default DisplayContainer
