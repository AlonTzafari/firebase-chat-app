import firebase from '../database';
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from './Message';

function Chat({chat, closeChat}) {
    
    const firestore = firebase.firestore();
    const messageRef = firestore.collection('testMsg');
    const query = messageRef.where('chatId', '==', chat.id).orderBy('createdAt', 'desc').limit(20);
    const [messages, loading, err] = useCollectionData(query, {idField: 'id'});
    
    return (
        <div>
            <main>
                {loading ? <h2>Loading...</h2> : err ? <h2>{`Error loading messages: ` + err}</h2> : messages.map(msg => <Message key={msg.id} message={msg}/>)}
            </main>
            <footer>
            </footer>
        </div>
    )
}

export default Chat
