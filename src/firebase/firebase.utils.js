import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBBEvnqIoLQCMFsT3IISE6lX2v4WFU34mM",
    authDomain: "crown-db-e6132.firebaseapp.com",
    projectId: "crown-db-e6132",
    storageBucket: "crown-db-e6132.appspot.com",
    messagingSenderId: "167313570671",
    appId: "1:167313570671:web:954a5abc941c953587c69a"
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    console.log(snapShot);

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInwithGoogle = () => auth.signInWithPopup(provider);

export default firebase;