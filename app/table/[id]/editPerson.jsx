'use client'

import { useState, useEffect } from "react"

let colors = ["green", "red", "blue", "violet", "orange", "yellow", "teal"]

export function EditPerson({ children }) {
    let days = children.days
    let titles = children.titles
    let person = children.person
    console.log(person);
    console.log(days, titles);
    const [name, setName] = useState(null)
    const [show, setShow] = useState(false)
    const [paint, setPaint] = useState([])

    useEffect(() => {
        setName(person.docname)
    }, [person.docname])

    async function handleCheck(event) {
        if (event.target.checked) {
            setPaint(paint => [...paint, event.target.value]);
        }
        else {
            setPaint(paint.filter(color => color != event.target.value))
        }
    }

    return (
        <div className="text-lg justify-center items-center w-full relative">
            <div className="justify-center">
                <i className="fa-solid fa-pen-to-square text-sm"></i>
                <input type="string" value={name} onChange={(e) => setName(e.target.value)} placeholder='name' className='outline-none bg-inherit text-slate-900 placeholder:text-slate-600 p-2 text-left w-auto inline-block font-bold' />
            </div>
            <div className="flex w-full justify-between h-5/6 px-2">
                <div className="px-4 flex justify-between items-center bg-slate-400 rounded w-full">
                    {show &&
                        <div className="items-center flex-row w-full py-4">
                            <h2 className="font-bold">color the spots where the person ISN'T available</h2>
                            <div className="flex justify-between w-full items-center">
                                <div className="py-2">
                                    <ul className="grid w-full gap-6 md:grid-rows-3">
                                        {titles.map((title, index) => (
                                            <li className="flex" onClick={(e) => handleCheck(e)}>
                                                <input type="checkbox" id={colors[index]} value={colors[index]} className="hidden peer" required=""></input>
                                                <label for={colors[index]} className={"inline-flex items-center justify-between w-min h-min p-2 text-gray-500 bg-white border-2 rounded-lg cursor-pointer border-" + colors[index] + "-600 peer-checked:bg-" + colors[index] + "-600"}></label>
                                                <label className="font-bold text-sm">{title}</label>
                                            </li>
                                        ))}
                                        <li className="flex" onClick={(e) => handleCheck(e)}>
                                            <input type="checkbox" id={colors[titles.length]} value={colors[titles.length]} className="hidden peer" required=""></input>
                                            <label for={colors[titles.length]} className={"inline-flex items-center justify-between w-min h-min p-2 text-gray-500 bg-white border-2 rounded-lg cursor-pointer border-" + colors[titles.length] + "-600 peer-checked:bg-" + colors[titles.length] + "-600"}></label>
                                            <label className="font-bold text-sm">all</label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full items-center justify-center text-center">{show + " table"}</div>
                            </div>
                        </div>
                    }
                </div>
                <div className="flex-row pl-4 justify-end h-fit m-auto">
                    <ul className="grid w-full gap-8 md:grid-rows-2">
                        <li onClick={(e) => setShow("perm")}>
                            <input type="radio" id="perm-reservs" name="reservs" value="perm-reservs" className="hidden peer" required></input>
                            <label htmlFor="perm-reservs" className="text-base bg-slate-600 text-white font-semibold inline-flex items-center justify-between w-min p-2 border-4 border-transparent rounded-lg cursor-pointer peer-checked:border-slate-800 peer-checked:bg-slate-500 hover:bg-slate-700">permanent reservations</label>
                        </li>
                        <li onClick={(e) => setShow("temp")}>
                            <input type="radio" id="temp-reservs" name="reservs" value="temp-reservs" className="hidden peer"></input>
                            <label htmlFor="temp-reservs" className="text-base bg-slate-600 text-white font-semibold inline-flex items-center justify-between w-min p-2 border-4 border-transparent rounded-lg cursor-pointer peer-checked:border-slate-800 peer-checked:bg-slate-500 hover:bg-slate-700">temporary reservations</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}