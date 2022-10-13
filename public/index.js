import { app } from "/auth.js"
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import { getFirestore, doc, collection, getDocs, where } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"
const db = getFirestore(app);

document.getElementById("logout-btn-auth").addEventListener("click", logout);

const tablesGrid = document.getElementById("tables")

// let arr = ["table1", "table2"]
// for (let i = 0; i < arr.length; i++) {
//   const tableBox = document.createElement("a")
//   tableBox.innerText = `${arr[i]}`
//   tablesGrid.appendChild(tableBox)
// }


async function getTable() {
  const tables = collection(db, "tables", where("name", "==", "test table"))

  console.log(tables);
}


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    window.location.href = "./login"
  }
});

function logout() {
  auth.signOut()
}

getTable()
