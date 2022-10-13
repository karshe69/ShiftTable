import { app } from "/auth.js"
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import { getFirestore, doc, collection, getDoc } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"
const db = getFirestore(app);
const tables = doc(db, "tables/j1B6I18T0VfcaDFdo2Ep")
console.log(getDoc(tables));

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      window.location.href = "./login"
    }
  });

function logout(){
    auth.signOut()
}