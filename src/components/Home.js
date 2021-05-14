import firebase from '../database';
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatItem from './ChatItem';
import {themeContext} from '../context';
import {useContext} from 'react';

function Home({openChat}) {

    const firestore = firebase.firestore();
    const messageRef = firestore.collection('chatRooms');
    const query = messageRef.where('users', 'array-contains', firebase.auth().currentUser.uid).orderBy('lastActivityAt', 'desc');
    const [chatRooms, loading, err] = useCollectionData(query, {idField: 'id'});
    const {toggleTheme} = useContext(themeContext)
    return (
        <div>
            <button onClick={toggleTheme}>THEME</button>
            {loading ? <h2>Loading...</h2> : 
            err ? <h2>Error loading chat rooms</h2> : 
            chatRooms.map(chatRoom => <ChatItem key={chatRoom.id} openChat={()=> openChat(chatRoom)} chatDetails={chatRoom} />)}
        </div>
    )
}

export default Home
