import { app } from "/auth.js"
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import { getFirestore, doc, query, collection, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"
const db = getFirestore(app);
document.getElementById("logout-btn-auth").addEventListener("click", logout);


async function getTable(tid) {
  const tableRef = doc(db, "tables", tid)
  const tableSnap = await getDoc(tableRef)
  if (tableSnap.exists()) {
    console.log(tableSnap.data());
  }
  const listQuery = query(collection(db, "tables/" + tid + "/people"))
  const listSnap = await getDocs(listQuery);

  getNameList(listSnap)
}

async function getNameList(listSnap) {
  const nameList = document.getElementById("name list")
  listSnap.forEach((doc) => {
    nameList.appendChild(createListElem(doc.data()["name"], doc.id))
  });
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

function createListElem(name, id) {
  const tableBox = document.createElement("a")
  if (name == null) {
    tableBox.innerText = `Nothing To See Here`
    return tableBox
  }
  tableBox.innerText = name
  tableBox.href = `/person/${id}`
  tableBox.className = "rounded block hover:bg-slate-500 px-4 py-2 w-1/2"
  return tableBox
}

const cells = document.querySelectorAll("#draggable");

// Add event listeners to all cells
cells.forEach(cell => {
  cell.addEventListener("dragstart", handleDragStart);
  cell.addEventListener("dragover", handleDragOver);
  cell.addEventListener("drop", handleDrop);
});

function handleDragStart(e) {
  e.dataTransfer.setData("text", this.innerHTML);
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  let data = e.dataTransfer.getData("text");
  this.innerHTML = data;
}