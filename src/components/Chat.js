import firebase from '../database';
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import Message from './Message';
import '../styles/Chat.scss';
import {BiSend} from 'react-icons/bi';
import {useRef, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {headerContext} from '../context';

function Chat() {
    const {id} = useParams()
    
    const firestore = firebase.firestore();
    const messageRef = firestore.collection('messages');
    const chatRoomsRef = firestore.collection('chatRooms');
    const chatDoc = chatRoomsRef.doc(id) //where('id', '==', id);
    const query = messageRef.where('chatId', '==', id).orderBy('createdAt', 'desc').limit(20);
    const [chat] = useDocumentData(chatDoc);
    const [messages, loading, err] = useCollectionData(query, {idField: 'id'});
    const inputRef = useRef();
    const {setHeaderContent} = useContext(headerContext);
    useEffect(() => {
        if (chat) setHeaderContent(<h2>{chat.name}</h2>);
        return () => {
            setHeaderContent(<></>)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat])

    const errorDisplayer = (error) => {
        console.log(error);
        return <h2>{'Error loading messages'}</h2>;
    }

    const sendMessage = (e) => {
        messageRef.add({
            uid: firebase.auth().currentUser.uid,
            text: inputRef.current.value,
            createdAt: firebase.firestore.Timestamp.now(),
            chatId: chat.id,
            
        }).then(() => {
            chatDoc.update({lastActivityAt: firebase.firestore.Timestamp.now()});
        });
        inputRef.current.value = '';
        e.preventDefault();
    }

    return (
        <div className="chat">
            <section className="messagesContainer">
                {
                    loading ? <h2>Loading...</h2> :
                    err ? errorDisplayer() :
                    messages.map(msg => <Message key={msg.id} message={msg}/>)
                }
            </section>
            <footer>
                <form onSubmit={sendMessage} className="messageForm">
                    <input ref={inputRef} type="text" placeholder="Write message" required={true}/>
                    <button type="submit" className="send"><BiSend /></button>
                </form>
            </footer>
        </div>
    )
}

export default Chat