import firebase from '../database';
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from './Message';
import '../styles/Chat.scss';
import {BiSend} from 'react-icons/bi';

function Chat({chat}) {
    
    const firestore = firebase.firestore();
    const messageRef = firestore.collection('messages');
    const query = messageRef.where('chatId', '==', chat.id).orderBy('createdAt', 'desc').limit(20);
    const [messages, loading, err] = useCollectionData(query, {idField: 'id'});

    const errorDisplayer = (error) => {
        console.log(error);
        return <h2>{'Error loading messages'}</h2>;
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
                <form className="messageForm">
                    <input type="text" placeholder="Write message" required={true}/>
                    <button className="send"><BiSend /></button>
                </form>
            </footer>
        </div>
    )
}

export default Chat