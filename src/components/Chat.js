import firebase from 'firebase/app';
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from './Message';

function Chat({user}) {
    const firestore = firebase.firestore();

    const messageRef = firestore.collection('testMsg');
    const query = messageRef.orderBy('createdAt').limit(20);
    query.get().then(result => { console.log( result.docs[0].data() ) })
    const [messages] = useCollectionData(query, {idField: 'id'});
    
    const signOut = () => {
        firebase.auth().signOut();
    }

    return (
        <div>
            <header>
                <h1>{user.displayName}</h1>
                <button onClick={signOut}>Sign Out</button>
            </header>
            <main>
                {messages ? messages.map(msg => <Message key={msg.id} message={msg}/>) : <h2>No Messages</h2>}
            </main>
            <footer>
            </footer>
        </div>
    )
}

export default Chat
