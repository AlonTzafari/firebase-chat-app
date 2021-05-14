import '../styles/ChatItem.scss';

function ChatItem({chatDetails, openChat}) {
 
    return (
        <div className="chatItem" onClick={openChat}>
            <img src={chatDetails.roomImg} alt="room" />
            <p>{chatDetails.name}</p>
        </div>
    )
}

export default ChatItem
