import firebase from '../database';
import SignInExt from './SignInExt';
import gIcon from '../googleIcon128.png';
import fIcon from '../facebookIcon128.png';

function Auth() {

    const googleAuth = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    return (
        <div>
            <SignInExt loginHandler={googleAuth} iconSrc={gIcon} text="google"/>
            <SignInExt loginHandler={()=>{}} iconSrc={fIcon} text="facebook"/>
            {/* <button onClick={googleAuth}>Sign In With Google</button> */}
        </div>
    )
}

export default Auth
