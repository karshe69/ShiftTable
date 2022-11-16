import { app } from "/auth.js"
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import { getFirestore, doc, collection, getDoc } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"
const db = getFirestore(app);

async function getTable(tid){
  console.log(tid);
}

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    getTable(tableID)
  } else {
    window.location.href = "./login"
  }
});

function logout() {
  auth.signOut()
}