
function Message({message}) {
    return (
        <div>
            <hr />
           <p>{message.text}</p> 
           {message.imgURL ? <img src={message.imgURL} alt="attached"/> : null}
           <hr /> 
        </div>
    )
}

export default Message
