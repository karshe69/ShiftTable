'use client'

import { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, getDocs, query} from 'firebase/firestore'

export function useFetchPeople(tableID) {
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
                    peopleSnap.forEach((doc) => {
                        docname = doc.data()["name"]
                        docid = doc.id
                        peopleArr.push({ docname, docid })
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
    }, [])
    return [loading, people, error]
}