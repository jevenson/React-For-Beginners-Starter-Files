import Rebase from 're-base';
import firebase from 'firebase';
import FirebaseConfig from './firebase-config';

const firebaseApp = firebase.initializeApp({
    apiKey: FirebaseConfig.FIREBASE_API_KEY,
    authDomain: FirebaseConfig.FIREBASE_AUTH_DOMAIN,
    databaseURL: FirebaseConfig.FIREBASE_DATABASE_URL
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;