import {useState, useRef} from 'react';
import firebase from '../database';

function SignInMail({loginHandler}) {
    
    const [register, setRegister] = useState(false);
    const [confirmErr, setConfirmErr] = useState(false);
    const emailRef = useRef();
    const passRef = useRef();
    const passConfirmRef = useRef();
    
    const registerHandler = (e) => {
        const email = emailRef.current.value;
        const password = passRef.current.value;
        if (password === passConfirmRef.current.value) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log(userCredential);
                setRegister(false);
            });
        } else {
            setConfirmErr(true);
        } 
        e.preventDefault();
        
    }
    const login = (e) => {
        const email = emailRef.current.value;
        const password = passRef.current.value;
        loginHandler(email, password);
        e.preventDefault();
    }

    return (
        <div>

            <form onSubmit={register ? registerHandler : login}>
                <input ref={emailRef} type="email" placeholder="email address" required={true}/>
                <input 
                    ref={passRef} type="password"
                    placeholder="password"
                    pattern="[A-Za-z0-9]{4,16}" 
                    title={"only contain letters and numbers. between 6 to 16 characters."}
                    required={true}
                />
                {
                    register ?
                    <input className={confirmErr ? 'error': null}
                    ref={passConfirmRef} type="password"
                    placeholder="confirm password"
                    pattern="[A-Za-z0-9]{6,16}" 
                    required={true}
                    /> :
                    null
                }
                
                <button type="submit">{register ? 'Sign Up' : 'Sign In'}</button>
                <button type="button" onClick={()=>setRegister(!register)}>{register ? 'Cancel' : 'Register'}</button>
            </form>
        </div>
    )
}

export default SignInMail
