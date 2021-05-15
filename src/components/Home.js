import firebase from '../database';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatItem from './ChatItem';
import ChatEditor from './ChatEditor';
import {themeContext, headerContext} from '../context';
import {useContext, useState, useEffect} from 'react';
import {BsFillPlusCircleFill as PlusSign} from 'react-icons/bs';
import {FaAdjust} from 'react-icons/fa';
import '../styles/Home.scss';

function Home({openChat}) {
    const [user] = useAuthState(firebase.auth());
    const firestore = firebase.firestore();
    const chatRoomsRef = firestore.collection('chatRooms');
    const query = chatRoomsRef.where('users', 'array-contains', user.uid).orderBy('lastActivityAt', 'desc');
    const [chatRooms, loading, err] = useCollectionData(query, {idField: 'id'});
    const {toggleTheme} = useContext(themeContext);
    const {setHeaderContent} = useContext(headerContext);
    const [isEditor, setIsEditor] = useState(false);

    useEffect(() => {
        if (user) setHeaderContent(<h2>{user.displayName || user.email.split('@')[0]}</h2>);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <div className="home">
            <div className="optionsContainer">
                <button onClick={toggleTheme}><FaAdjust/></button>
            </div>
                {isEditor ? <ChatEditor closeEditor={() => {setIsEditor(false)}}/> : <button className="addChat" onClick={() => {setIsEditor(true)}}><PlusSign/></button>}
            <div className="chatsContainer">
                {
                    loading ? <h2>Loading...</h2> : 
                    err ? <h2>Error loading chat rooms</h2> : 
                    chatRooms.map(chatRoom => <ChatItem key={chatRoom.id} openChat={()=> openChat(chatRoom)} chatDetails={chatRoom} />)
                }
            </div>
            
        </div>
    )
}

export default Home
