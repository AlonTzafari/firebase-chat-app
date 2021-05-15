import firebase from '../database';
import SignInExt from './SignInExt';
import SignInMail from './SignInMail';
import gIcon from '../googleIcon128.png';
import fIcon from '../facebookIcon128.png';
import '../styles/Auth.scss';
import {Redirect, useHistory} from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';

function Auth({destination}) {
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const googleAuth = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    const history = useHistory()
    return (
        <div className="Auth">
            <SignInMail />
            <SignInExt loginHandler={googleAuth} iconSrc={gIcon} text="google"/>
            <SignInExt loginHandler={()=>{}} iconSrc={fIcon} text="facebook"/>
            {user && history.goBack()}
        </div>
    )
}

export default Auth
