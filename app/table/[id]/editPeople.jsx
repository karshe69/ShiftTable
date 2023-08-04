'use client'
import { doc, setDoc, addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'

import { useState } from "react"
import { EditPerson } from "./editPerson.jsx"


export function EditPeople({ children }) {
    let days = children.days
    let titles = children.titles
    let people = children.people
    let tableID = children.tableID

    let [index, setIndex] = useState(-1)
    let [person, setPerson] = useState("")
    let [rerender, setRerender] = useState(false)

    async function finishHandler() {
        saveHandler()
        if (people.length >= 3) {
            children.setValid(true)
            children.setEdit(false)
        }
    }
    async function saveHandler() {
        if (person && person.name) {
            people[index] = person
            setRerender(!rerender)
        }
        people.map(async (person) => {
            if (person.id) {
                await setDoc(doc(db, "tables", tableID, "people", person.id), person, { merge: true })
            }
            else {
                const docRef = await addDoc(collection(db, "tables", tableID, "people"), person);
                person.id = docRef.id
            }
        })
    }

    async function clickPerson(i) {
        if (i == index) {
            return
        }
        if (index == people.length) {
            if (person && person.name) {
                people[index] = person
            }
        }
        else if (index != -1 && !people[index].name) {
            i = index
        }
        setPerson(people[i])
        setIndex(i)
    }

    async function newPerson() {
        if (person && person.name) {
            people[index] = person
        }
        setPerson({ name: "", permReservs: [], tempReservs: [], id: "" })
        setIndex(people.length)

    }

    return (
        <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex bg-background p-2 pb-4 sm:p-4 sm:pb-8 rounded-lg w-11/12 h-[87%] flex-col justify-center items-center">
                <h1 className='font-extrabold text-lg sm:text-4xl uppercase pt-5'>Edit People</h1>
                <div className="flex flex-col sm:flex-row sm:py-4 justify-between w-full items-center sm:divide-x-2 divide-background_pop h-full">
                    <div className="sm:space-y-2 p-2 sm:p-3 sm:h-[80%] flex flex-col">
                        <h2 className="sm:text-3xl whitespace-nowrap font-bold text-center sm:text-start">People</h2>
                        <div className='flex sm:flex-col space-x-1 sm:space-x-0'>
                            <ul className="relative grid sm:gap-6 overflow-x-hidden overflow-y-auto whitespace-nowrap scroll-smooth max-h-full">
                                {people.map((person, i) => (
                                    <li key={i} onClick={(e) => clickPerson(i)} className="inline-flex">
                                        <input type="radio" id={"person" + i} name="hosting" value={"person" + i} className="hidden peer" required></input>
                                        <label htmlFor={"person" + i} className="sm:text-2xl font-semibold w-full p-1 sm:p-3 rounded-lg cursor-pointer peer-checked:text-secondary hover:bg-bg_prim sm:bg-background bg-background_pop">{person.name}</label>
                                    </li>
                                ))}
                            </ul>
                            <div onClick={(e) => newPerson()}>
                                <input type="radio" id={"newperson"} name="hosting" value={"newperson"} className="hidden peer" required></input>
                                <label htmlFor={"newperson"} className="sm:text-2xl font-semibold inline-flex items-center justify-between w-full p-1 sm:p-3 rounded-lg cursor-pointer peer-checked:text-secondary hover:bg-bg_prim sm:bg-background bg-background_pop">
                                    <i className="fa-solid fa-plus pr-2 pt-1"></i>
                                    <h3>New Person</h3>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="justify-center flex w-full h-full sm:pl-4">
                        {(index != -1) && <EditPerson>{{ person, days, titles, setPerson }}</EditPerson>}
                    </div>
                </div>
                <div className="flex justify-between w-[30%] sm:pt-6 space-x-4">
                    <button onClick={finishHandler} className="bg-background_pop hover:bg-bg_prim sm:text-2xl font-bold py-2 sm:py-4 px-2 sm:px-8 rounded">finish</button>
                    <button onClick={saveHandler} className="bg-background_pop hover:bg-bg_prim sm:text-2xl font-bold py-2 sm:py-4 px-2 sm:px-8 rounded">save</button>
                </div>
            </div>
        </div >
    )
}