import {useState} from 'react';
import firebase from '../database';
import Home from './Home';
// import Chat from './Chat';

function DisplayContainer({user}) {
    const firestore = firebase.firestore();
    const messageRef = firestore.collection('chatRooms');
    const [activeChat, setActiveChat] = useState(null);

    const openChat = (chatId) => {
        const query = messageRef.where('chatId', '==', chatId);
        query.get()
        .then(result => {
            const chat = result.docs[0].data();
            setActiveChat(chat);          
        })
        .catch(err => console.log(err));
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
                <h1>{user.displayName}</h1>
                <button onClick={signOut}>Sign Out</button>
            </header>
            {activeChat ? /*<Chat chat={activeChat} closeChat={closeChat} />*/ <h2>Chat View</h2>  : <Home openChat={setActiveChat}/>}
        </div>
    )
}

export default DisplayContainer
