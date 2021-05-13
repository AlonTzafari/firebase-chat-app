import firebase from '../database';
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from './Message';

function Chat({chat, closeChat}) {
    
    const firestore = firebase.firestore();
    const messageRef = firestore.collection('testMsg');
    const query = messageRef.where('chatId', '==', chat ? chat.chatId : "").orderBy('createdAt').limit(20);
    const [messages] = useCollectionData(query, {idField: 'id'});
    
    return (
        <div>
            <main>
                {messages ? messages.map(msg => <Message key={msg.id} message={msg}/>) : <h2>No Messages</h2>}
            </main>
            <footer>
            </footer>
        </div>
    )
}

export default Chat
