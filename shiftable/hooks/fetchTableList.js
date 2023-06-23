import { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, getDocs, where, query, doc } from 'firebase/firestore'
import { useAuth } from "@/context/AuthContext"

export function useFetchTableList(permission) {
    const { currentUser } = useAuth()
    const [loading, setLoading] = useState(true)
    const [table, setTable] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        async function fetchTables() {
            try {
                const uid = currentUser.uid
                const tables = collection(db, "tables")
                let tablesDoc = query(tables, where(permission, "array-contains", uid))
                let tablesSnap = await getDocs(tablesDoc)
                let tableArr = null
                if (tablesSnap.size > 0) {
                    tableArr = []
                    let docname
                    let docid
                    tablesSnap.forEach((doc) => {
                        docname = doc.data()["name"]
                        docid = doc.id
                        tableArr.push({ docname, docid })
                    })
                }
                setTable(tableArr)
            } catch (err) {
                setError('failed to load the list of avialable tables')
            } finally {
                setLoading(false)
            }
        }
        fetchTables()
    }, [])
    return [ loading, table, error ]
}