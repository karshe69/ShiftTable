'use client'

import { useEffect } from "react"
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export function ValidatePeople({ children }) {
    let people = children.people
    let tableID = children.tableID
    useEffect(() => {
        people.forEach((element, index) => {
            if (typeof (element.name) !== "string") {
                const docRef = doc(db, "tables", tableID, "people", element.id)
                deleteDoc(docRef)
                people.splice(index, 1)
            }
            if (!element.permReservs || !(Object.getPrototypeOf(element.permReservs) == Object.prototype)) {
                element.permReservs = {}
            }
            if (!element.tempReservs || !(Object.getPrototypeOf(element.tempReservs) == Object.prototype)) {
                element.tempReservs = {}
            }
        });
        let bool = false
        if (people.length != 1) {
            bool = true
        }
        children.setValid(bool)
        children.setLoading(false)
    }, [])
}