import firebase from '../database';

function Auth() {

    const googleAuth = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    return (
        <div>
            <button onClick={googleAuth}>Sign In With Google</button>
        </div>
    )
}

export default Auth
