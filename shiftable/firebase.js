import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration

console.log(process.env.PUBLIC_API);

const firebaseConfig = {
    apiKey: process.env.PUBLIC_API,
    authDomain: process.env.PUBLIC_AUTHDOMAIN,
    projectId: process.env.PUBLIC_PROJECTID,
    storageBucket: process.env.PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.PUBLIC_MESSAGINGSENDERID,
    appId: process.env.PUBLIC_APPID,
    measurementId: process.env.PUBLIC_MESSAGINGSENDERID
};

const app = initializeApp(firebaseConfig);
console.log(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)