import firebase from '../database';
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from './Message';
import '../styles/Chat.scss';
import {BiSend} from 'react-icons/bi';
import {useRef} from 'react';

function Chat({chat}) {
    
    const firestore = firebase.firestore();
    const messageRef = firestore.collection('messages');
    const query = messageRef.where('chatId', '==', chat.id).orderBy('createdAt', 'desc').limit(20);
    const [messages, loading, err] = useCollectionData(query, {idField: 'id'});
    const inputRef = useRef();
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