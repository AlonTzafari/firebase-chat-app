import firebase from '../database';
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatItem from './ChatItem';

function Home({openChat}) {

    const firestore = firebase.firestore();
    const messageRef = firestore.collection('chatRooms');
    const query = messageRef.where('users', 'array-contains', firebase.auth().currentUser.uid);
    const [chatRooms] = useCollectionData(query, {idField: 'id'});

    return (
        <div>
            {chatRooms ? chatRooms.sort((a,b) => a.lastActivityAt.seconds - b.lastActivityAt.seconds)
                .map(chatRoom => <ChatItem key={chatRoom.id} chatDetails={chatRoom} />) : <h2>Create Chat Room</h2>}
        </div>
    )
}

export default Home
