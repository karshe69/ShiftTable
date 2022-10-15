import { app } from "/auth.js"
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import { getFirestore, doc, collection, getDocs, getDoc, where, query } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"
const db = getFirestore(app);

document.getElementById("logout-btn-auth").addEventListener("click", logout);

async function getTable(uid) {
  const tables = collection(db, "tables")
  let viewQuery = query(tables, where("read", "array-contains-any", [uid]))
  let viewSnapshot = await getDocs(viewQuery)
  const viewTables = document.getElementById("viewTables")

  if (viewSnapshot.empty) {
    viewTables.appendChild(createTableElem(null, null))
  }
  else {
    viewSnapshot.forEach((doc) => {
      viewTables.appendChild(viewTables.appendChild(createTableElem(doc.data()["name"], doc.id)))
    });
  }


  let adminQuery = query(tables, where("write", "array-contains-any", [uid]))
  let adminSnapshot = await getDocs(adminQuery)
  const adminTables = document.getElementById("adminTables")

  if (adminSnapshot.empty) {
    viewTables.appendChild(createTableElem(null, null))
  }
  else {
    for (let index = 0; index < 10; index++) {
      adminSnapshot.forEach((doc) => {
        adminTables.appendChild(viewTables.appendChild(createTableElem(doc.data()["name"], doc.id)))
      });
    }
  }
}

function createTableElem(name, id) {
  const tableBox = document.createElement("a")
  if (name == null) {
    tableBox.innerText = `Nothing To See Here`
    return tableBox
  }
  tableBox.innerText = name
  tableBox.href = `/table/${id}`
  tableBox.className = "flex items-center justify-center bg-slate-100 hover:scale-105 ease-in-out min-w-[128px] w-[128px] h-[128px]"
  return tableBox
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