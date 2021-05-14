import '../styles/Message.scss';
import firebase from '../database';

function Message({message}) {
    
    const isUserMessage = firebase.auth().currentUser.uid === message.uid; 
    
    return (
        <div className = {`message ${isUserMessage && 'userSend'}`}>
            <span className="sender">{message.uid}</span>
            <p className="text">{message.text}</p> 
            {message.imgURL ? <img src={message.imgURL} alt="attached"/> : null}
        </div>
    )
}

export default Message