'use client'

import { useState, useEffect } from "react"
import { db } from "../firebase"
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from "@/context/AuthContext"

export function useFetchTable(tableID) {
    let { currentUser } = useAuth()
    const [loading, setLoading] = useState(true)
    const [table, setTable] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        async function fetchTable() {
            try {
                const tableRef = doc(db, "tables", tableID)
                const tableSnap = await getDoc(tableRef)
                setTable(tableSnap.data())
            } catch (err) {
                console.log(err);
                setError('failed to load the specific table')
            } finally {
                setLoading(false)
            }

        }
        fetchTable()
    }, [currentUser])
    return [loading, table, error]
}