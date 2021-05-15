import '../styles/Chat.scss';
import {useRef} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import firebase from '../database';
import { useDocumentData } from "react-firebase-hooks/firestore";

function JoinChat() {

    const {id} = useParams();
    const chatDoc = firebase.firestore().collection('chatRooms').doc(id);
    const [chat, loading, err] = useDocumentData(chatDoc);
    const codeRef = useRef();
    const history = useHistory();

    const submitHandler = (e) => {
        const code = codeRef.current.value;
        if (code === chat.password) {
            chatDoc.update({
                users: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid),
                lastActivityAt: firebase.firestore.Timestamp.now()
            }).then( () => {
                history.push(`/chat/${id}`);
            })
        }

        e.preventDefault();
    }

    return (
        <div>
            {
                loading ? <h2>Loading...</h2> :
                err ? <h2>Something went wrong</h2> :
                <form onSubmit={submitHandler}>
                    <img src={chat.roomImg} alt="room" />
                    <h2>{`Join Chat Room ${chat.name}`}</h2>
                    <input ref={codeRef} type="password" placeholder="Room Code" required />
                    <button type="submit">Join</button>
                </form>
            }
        </div>
    )
}

export default JoinChat
