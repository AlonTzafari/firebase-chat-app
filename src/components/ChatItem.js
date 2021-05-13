

function ChatItem({chatDetails}) {
    return (
        <div>
            <p>{chatDetails.name}</p>
            <p>{(new Date(chatDetails.lastActivityAt.seconds)).toISOString()}</p>
        </div>
    )
}

export default ChatItem
