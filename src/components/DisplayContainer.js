import {useState} from 'react';
import firebase from '../database';
import Home from './Home';
import Chat from './Chat';

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
        <div>
            <header>
                <h2 onClick={closeChat}>HOME</h2>
                <h1>{user.displayName}</h1>
                <button onClick={signOut}>Sign Out</button>
            </header>
            {activeChat ? <Chat chat={activeChat} closeChat={closeChat} /> : <Home openChat={openChat}/>}
        </div>
    )
}

export default DisplayContainer
