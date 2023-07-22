import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDT4fm3Y1rvOD-RCjcrolVASbrKS-cAtic",
    authDomain: "shift-table-fd7fd.firebaseapp.com",
    databaseURL: "https://shift-table-fd7fd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shift-table-fd7fd",
    storageBucket: "shift-table-fd7fd.appspot.com",
    messagingSenderId: "465684020689",
    appId: "1:465684020689:web:0d4a45ad68dc3348b334f0",
    measurementId: "G-2J30QSLM04"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)