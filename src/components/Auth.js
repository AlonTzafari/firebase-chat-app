import firebase from '../database';
import SignInExt from './SignInExt';
import SignInMail from './SignInMail';
import gIcon from '../googleIcon128.png';
import fIcon from '../facebookIcon128.png';
import '../styles/Auth.scss';
import {Redirect} from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';

function Auth() {
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const googleAuth = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    const facebookAuth = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider);
    }
    
    return (
        <div className="Auth">
            <SignInMail />
            <SignInExt loginHandler={googleAuth} iconSrc={gIcon} text="google"/>
            <SignInExt loginHandler={facebookAuth} iconSrc={fIcon} text="facebook"/>
            {user && <Redirect to="/home"/>}
        </div>
    )
}

export default Auth
