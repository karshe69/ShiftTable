'use client'

import { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, getDocs, query } from 'firebase/firestore'
import { useAuth } from "@/context/AuthContext"

export function useFetchPeople(tableID) {
    let { currentUser } = useAuth()
    const [loading, setLoading] = useState(true)
    const [people, setPeople] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        async function fetchTable() {
            try {
                const peopleQuery = query(collection(db, "tables/" + tableID + "/people"))
                const peopleSnap = await getDocs(peopleQuery)
                let peopleArr = []
                if (peopleSnap.size > 0) {
                    peopleArr = []
                    let docname
                    let docid
                    let permReservs
                    let tempReservs
                    peopleSnap.forEach((doc) => {
                        docname = doc.data()["name"]
                        docid = doc.id
                        permReservs = doc.data()["perms"]
                        tempReservs = doc.data()["temps"]
                        peopleArr.push({ docname, docid, permReservs, tempReservs })
                    })
                }
                setPeople(peopleArr)
            } catch (err) {
                console.log(err);
                setError('failed to load the specific table')
            } finally {
                setLoading(false)
            }

        }
        fetchTable()
    }, [currentUser])
    return [loading, people, error]
}