import { app } from "/auth.js"
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import { getFirestore, doc, collection, getDocs, getDoc, where, query } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"
const db = getFirestore(app);

document.getElementById("logout-btn-auth").addEventListener("click", logout);

const tablesGrid = document.getElementById("tables")

// let arr = ["table1", "table2"]
// for (let i = 0; i < arr.length; i++) {
//   const tableBox = document.createElement("a")
//   tableBox.innerText = `${arr[i]}`
//   tablesGrid.appendChild(tableBox)
// }


async function getTable(uid) {
  const table = await getDoc(doc(db, 'tables', 'j1B6I18T0VfcaDFdo2Ep'))
  console.log(table.id, " => ", table.data());

  const tables = collection(db, "tables")
  let q = query(tables, where("write", "array-contains-any", [uid]))
  let querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    getTable(uid)
  } else {
    window.location.href = "./login"
  }
});

function logout() {
  auth.signOut()
}