import '../styles/SignInExt.scss';

function SignInExt({loginHandler, iconSrc, text}) {
    return (
        <button className="signInExt" onClick={loginHandler}>
            <img src={iconSrc} alt="provider" />
            <span>{text}</span>
        </button>
    )
}

export default SignInExt
