import firebase from '../database';
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatItem from './ChatItem';
import ChatEditor from './ChatEditor';
import {themeContext} from '../context';
import {useContext, useState} from 'react';

function Home({openChat}) {

    const firestore = firebase.firestore();
    const chatRoomsRef = firestore.collection('chatRooms');
    const query = chatRoomsRef.where('users', 'array-contains', firebase.auth().currentUser.uid).orderBy('lastActivityAt', 'desc');
    const [chatRooms, loading, err] = useCollectionData(query, {idField: 'id'});
    const {toggleTheme} = useContext(themeContext)
    const [isEditor, setIsEditor] = useState(false);
    return (
        <div>
            <button onClick={toggleTheme}>THEME</button>
            <div className="chatsContainer">
                {
                    loading ? <h2>Loading...</h2> : 
                    err ? <h2>Error loading chat rooms</h2> : 
                    chatRooms.map(chatRoom => <ChatItem key={chatRoom.id} openChat={()=> openChat(chatRoom)} chatDetails={chatRoom} />)
                }
            </div>
            
            {isEditor ? <ChatEditor closeEditor={() => {setIsEditor(false)}}/> : <button onClick={() => {setIsEditor(true)}}>NEW CHAT ROOM</button>}
        </div>
    )
}

export default Home
