import firebase from '../database';
import SignInExt from './SignInExt';
import SignInMail from './SignInMail';
import gIcon from '../googleIcon128.png';
import fIcon from '../facebookIcon128.png';
import '../styles/Auth.scss';

function Auth() {

    const googleAuth = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    return (
        <div className="Auth">
            <SignInMail />
            <SignInExt loginHandler={googleAuth} iconSrc={gIcon} text="google"/>
            <SignInExt loginHandler={()=>{}} iconSrc={fIcon} text="facebook"/>
        </div>
    )
}

export default Auth
