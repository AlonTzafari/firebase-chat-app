

function ChatItem({chatDetails, openChat}) {
 
    return (
        <div onClick={openChat}>
            <p>{chatDetails.name}</p>
            <p>{chatDetails.lastActivityAt.toDate().toLocaleString()}</p>
        </div>
    )
}

export default ChatItem
