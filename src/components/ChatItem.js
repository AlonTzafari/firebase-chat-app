import '../styles/ChatItem.scss';
import {useHistory} from 'react-router-dom'

function ChatItem({chatDetails}) {
    const history = useHistory();
    return (
        <div className="chatItem" onClick={() => {history.push(`/chat/${chatDetails.id}`)}}>
            <img src={chatDetails.roomImg} alt="room" />
            <p>{chatDetails.name}</p>
        </div>
    )
}

export default ChatItem
