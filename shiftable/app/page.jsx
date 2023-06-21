'use client'

import { useAuth } from "@/context/AuthContext"
import React, { useState, useMemo } from 'react'
import { db } from "../firebase"
import { collection, getDocs, where, query } from 'firebase/firestore'

export default function Home() {
  const { currentUser } = useAuth()
  const [adminTable, setAdminTable] = useState(null)
  const [viewTable, setViewTable] = useState(null)
  if (currentUser) {
    useMemo(() => getTable(currentUser.uid, setAdminTable, "write"), [currentUser.uid, setAdminTable, "write"])
    useMemo(() => getTable(currentUser.uid, setViewTable, "read"), [currentUser.uid, setViewTable, "read"])
  }
  console.log(adminTable);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative container mx-auto p-6">
        <a className="text-2xl">Admin Tables</a>
        {adminTable && <div className="relative items-center p-8 space-x-6 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth"></div>}
        {!adminTable && <div>You don't have any tables here</div>}
        <a className="text-2xl">View Tables</a>
        {viewTable && <div className="relative items-center p-8 space-x-6 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth"></div>}
        {!viewTable && <div>You don't have any tables here</div>}
      </div>
    </main >
  )
}

async function getTable(uid, setTable, permission) {
  const tables = collection(db, "tables")
  let viewQuery = query(tables, where(permission, "array-contains-any", [uid]))
  let viewSnapshot = await getDocs(viewQuery)
  const tableArr = []
  let docname
  let docid
  if (viewSnapshot.empty) {
    setTable(null)
    return
  }
  else {
    viewSnapshot.forEach((doc) => {
      docname = doc.data()["name"]
      docid = doc.id
      tableArr.push({ docname, docid })
    });
  }
  setTable(tableArr)
}