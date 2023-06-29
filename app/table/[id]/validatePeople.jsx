'use client'

import { useEffect } from "react"
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export function ValidatePeople({ children }) {
    let people = children.people
    let tableID = children.tableID
    useEffect(() => {
        let bool = true
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
        if (people.isEmpty) {
            //TODO
        }
        children.setValid(bool)
    }, [])
    return (
        <>
        </>
    )
}