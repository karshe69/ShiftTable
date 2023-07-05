'use client'

import { useState } from "react"
import { EditPerson } from "./editPerson.jsx"


export function EditPeople({ children }) {
    let people = children.people

    let [index, setIndex] = useState(0)
    let [person, setPerson] = useState(people[index])

    async function submitHandler() {
        children.setValid(true)
        children.setEdit(false)
    }

    async function clickPerson(i) {
        if (index == people.length) {
            if (person && person.docname) {
                people[i] = person
            }
        }
        else if (!people[index].docname) {
            i = index
        }
        setPerson(people[i])
        setIndex(i)
    }

    async function newPerson() {
        setPerson({ docname: "", permReservs: [], tempReservs: [], docid: "" })
        setIndex(people.length)
    }

    return (
        <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-2 rounded-lg w-11/12">
                <div className='flex-1 text-sm p-2 flex flex-col justify-center items-center'>
                    <h1 className='font-extrabold text-3xl uppercase p-5'>Edit People</h1>
                    <div className="flex justify-between space-x-8 w-full px-4">
                        <div className="justify-center flex w-full space-y-2 bg-slate-300 py-6 px-4 rounded-lg">
                            <EditPerson>{{ person }}</EditPerson>
                        </div>
                        <div className="justify-center space-y-2 bg-slate-300 p-6 rounded-lg">
                            <h2 className="text-2xl whitespace-nowrap font-bold">List Of People</h2>
                            <ul className="grid w-full gap-6 md:grid-rows-2">
                                {people.map((person, i) => (
                                    // <h3 key={i} onClick={(e) => clickPerson(i)} className="text-xl rounded-lg border-2 border-slate-300 p-2 font-bold bg-slate-600 hover:bg-slate-700 text-white whitespace-nowrap">{person.docname}</h3>
                                    <li key={i} onClick={(e) => clickPerson(i)}>
                                        <input type="radio" id={"person" + i} name="hosting" value={"person" + i} className="hidden peer" required></input>
                                        <label for={"person" + i} className="text-lg bg-slate-600 text-white font-semibold inline-flex items-center justify-between w-full p-3 border-2 border-transparent rounded-lg cursor-pointer peer-checked:border-slate-800 peer-checked:bg-slate-500 hover:bg-slate-700">{person.docname}</label>
                                    </li>
                                ))}
                                <li onClick={(e) => newPerson()}>
                                    <input type="radio" id={"newperson"} name="hosting" value={"newperson"} className="hidden peer" required></input>
                                    <label for={"newperson"} className="text-lg bg-slate-600 text-white font-semibold inline-flex items-center justify-between w-full p-3 border-2 border-transparent rounded-lg cursor-pointer peer-checked:border-slate-800 peer-checked:bg-slate-500 hover:bg-slate-700">
                                        <i className="fa-solid fa-plus pr-2 pt-1"></i>
                                        <h3>New Person</h3>
                                    </label>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <button onClick={submitHandler} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">finish</button>
                </div>
            </div >
        </div >
    )
}