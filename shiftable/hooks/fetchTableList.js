import { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, getDocs, where, query } from 'firebase/firestore'
import { useAuth } from "@/context/AuthContext"

export function useFetchTableList(permission) {
    const { currentUser } = useAuth()
    const [loading, setLoading] = useState(true)
    const [table, setTable] = useState(null)
    const [error, setError] = useState(null)
    if (currentUser) {
        const uid = currentUser.uid
    }
    useEffect(() => {
        async function fetchTables() {
            try {
                const tables = collection(db, "tables")
                console.log(permission, "array-contains-any", uid);
                console.log(tables);
                let tablesDoc = query(tables, where(permission, "array-contains-any", uid))
                console.log(321);
                let tablesSnap = await getDocs(tablesDoc)
                console.log(tablesSnap);
                if (tablesSnap.exists()) {
                    console.log(tablesSnap.data());
                }
            } catch (err) {
                setError('failed to load the list of avialable tables')
            } finally {
                setLoading(false)
            }
        }
        fetchTables()
    }, [])
    return { loading, table, error }
}

async function getTable(uid, setTable, permission) {
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