import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAQwv4lL80FlOdEAEO2EZC1vbL2xarzrsA",
    authDomain: "chat-app-ddf42.firebaseapp.com",
    projectId: "chat-app-ddf42",
    storageBucket: "chat-app-ddf42.appspot.com",
    messagingSenderId: "753410685663",
    appId: "1:753410685663:web:b782fcafab61603224876a",
    measurementId: "G-ZPW34NV7FP"
};
firebase.initializeApp(firebaseConfig);
export default firebase;