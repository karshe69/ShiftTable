'use client'

import { useEffect } from "react"
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export function ValidatePeople({ children }) {
    let people = children.people
    let tableID = children.tableID
    useEffect(() => {
        people.forEach((element, index) => {
            if (typeof (element.docname) !== "string") {
                const docRef = doc(db, "tables", tableID, "people", element.docid)
                deleteDoc(docRef)
                people.splice(index, 1)
            }
            if (!Array.isArray(element.permReservs)) {
                element.permReservs = []
            }
            if (!Array.isArray(element.tempReservs)) {
                element.tempReservs = []
            }
        });
        let bool = false
        if (people.length != 0) {
            bool = true
        }
        children.setValid(bool)
        children.setLoading(false)
    }, [])
}