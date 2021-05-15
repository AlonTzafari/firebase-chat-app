import firebase from '../database';
import {useRef, useState} from 'react';
import '../styles/ChatEditor.scss';

const noImage = 'https://firebasestorage.googleapis.com/v0/b/chat-app-ddf42.appspot.com/o/roomImages%2Fno-image.png?alt=media&token=608eb13a-fcfb-4000-b6ba-e0841cb066cc';

function ChatEditor({closeEditor}) {
    const storageRef = firebase.storage().ref('roomImages');
    const chatRoomsRef = firebase.firestore().collection('chatRooms');
    const nameRef = useRef();
    const passRef = useRef();
    const [imgFile, setImgFile] = useState(noImage);
    const [status, setStatus] = useState('editor');

    const uploadImage = (imgFile) => {
        storageRef.put(imgFile)
    }

    const uploadHander = (e) => {
        const file = e.target.files[0];
        if (file) setImgFile(file);
    }

    const createChat = () => {
        setStatus('loading');
        const {uid} = firebase.auth().currentUser;
        chatRoomsRef.add({
            lastActivityAt: firebase.firestore.Timestamp.now(),
            name: nameRef.current.value,
            password: passRef.current.value,
            roomImg: noImage,
            users: [uid],
            admins: [uid]
        })
        .then(() => setStatus('success'))
        .catch(() => setStatus('failed'))
        .finally(() => {
            setTimeout( () => closeEditor(), 3000 )
        });
    }

    return (
        <div className="chatEditor">
            {
                status === 'editor' ?
                    <form onSubmit={createChat}>
                        <img src={imgFile} alt="room"/>
                        <input ref={nameRef} type="text" placeholder="room name" required={true}/>
                        <input 
                            ref={passRef} type="text"
                            placeholder="room password"
                            pattern="[A-Za-z0-9]{4,16}" 
                            title={"only contain letters and numbers. between 4 to 16 characters."}
                            required={true}
                        />
                        <input onChange={uploadHander} type="file" accept="image/*"/>
                        <button type="submit">Create</button>
                    </form> : 
                status === 'loading' ? <h2>Creating Chat Room...</h2> :
                status === 'success' ? <h2>Success</h2> :
                status === 'failed' ? <h2>Failed</h2> : null
            } 
        </div>
    )
}

export default ChatEditor
