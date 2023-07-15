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
            <div className="bg-slate-200 p-2 rounded-lg w-11/12 h-[87%]">
                <div className='flex-1 text-sm px-2 pb-6 flex flex-col justify-center items-center h-full'>
                    <h1 className='font-extrabold text-4xl uppercase pt-5'>Edit People</h1>
                    <div className="flex py-4 justify-between w-full items-center divide-x-2 divide-gray-600 h-full">
                        <div className="space-y-2 p-3 h-[80%] flex flex-col">
                            <h2 className="text-3xl whitespace-nowrap font-bold">List Of People</h2>
                            <ul className="relative grid gap-6 overflow-x-hidden overflow-y-auto whitespace-nowrap scroll-smooth max-h-full">
                                {people.map((person, i) => (
                                    <li key={i} onClick={(e) => clickPerson(i)} className="inline-flex">
                                        <input type="radio" id={"person" + i} name="hosting" value={"person" + i} className="hidden peer" required></input>
                                        <label htmlFor={"person" + i} className="text-2xl font-semibold w-full p-3 rounded-lg cursor-pointer peer-checked:bg-slate-400 hover:bg-slate-300">{person.name}</label>
                                    </li>
                                ))}
                            </ul>
                            <div onClick={(e) => newPerson()}>
                                <input type="radio" id={"newperson"} name="hosting" value={"newperson"} className="hidden peer" required></input>
                                <label htmlFor={"newperson"} className="text-2xl font-semibold inline-flex items-center justify-between w-full p-3 rounded-lg cursor-pointer peer-checked:bg-slate-300 hover:bg-slate-300">
                                    <i className="fa-solid fa-plus pr-2 pt-1"></i>
                                    <h3>New Person</h3>
                                </label>
                            </div>
                        </div>
                        <div className="justify-center flex w-full h-full space-y-2 pl-4">
                            {(index != -1) && <EditPerson>{{ person, days, titles, setPerson }}</EditPerson>}
                        </div>
                    </div>
                    <div className="flex justify-between w-[30%] pt-6">
                        <button onClick={finishHandler} className=" bg-sky-700 hover:bg-sky-600 text-white text-2xl font-bold py-4 px-8 rounded">finish</button>
                        <button onClick={saveHandler} className=" bg-sky-700 hover:bg-sky-600 text-white text-2xl font-bold py-4 px-8 rounded">save</button>
                    </div>
                </div>
            </div >
        </div >
    )
}