'use client'

import { useState} from "react"
import { MonthlyTable } from './monthlyTable'

export function EditPerson({ children }) {
    let days = children.days
    let titles = children.titles
    let person = children.person
    let setPerson = children.setPerson
    const [rerender, setRerender] = useState(false)
    const [show, setShow] = useState(false)

    async function ChangeName(val){
        person.name = val
        setPerson(person)
        setRerender(!rerender)
    }

    return (
        <div className="text-2xl justify-center items-center w-full relative flex flex-col">
            <div className="justify-start w-full">
                <i className="fa-solid fa-pen-to-square text-xl"></i>
                <input type="string" value={person.name} onChange={(e) => ChangeName(e.target.value)} placeholder='name' className='outline-none bg-inherit text-slate-900 placeholder:text-slate-600 p-2 text-left w-auto inline-block font-bold' />
            </div>
            <div className="flex w-full justify-between h-full px-2">
                <div className="px-4 flex justify-between items-center w-full">
                    <div className="items-center flex flex-col w-full h-full">
                        <h2 className="font-bold pb-4">color the spots where the person ISN'T available</h2>
                        <div className="flex justify-between w-full items-center h-full">
                            <div className="w-full h-full items-center justify-center text-center">
                                {show && <MonthlyTable>{{ person, show, titles, setPerson }}</MonthlyTable>}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex-row pl-4 justify-end h-fit m-auto">
                    <ul className="grid w-full gap-8 md:grid-rows-2">
                        <li onClick={(e) => setShow("perm")}>
                            <input type="radio" id="perm-reservs" name="reservs" value="perm-reservs" className="hidden peer" required></input>
                            <label htmlFor="perm-reservs" className="text-2xl font-semibold inline-flex items-center justify-between w-min p-2 rounded-lg cursor-pointer peer-checked:bg-slate-400 hover:bg-slate-300">permanent reservations</label>
                        </li>
                        <li onClick={(e) => setShow("temp")}>
                            <input type="radio" id="temp-reservs" name="reservs" value="temp-reservs" className="hidden peer"></input>
                            <label htmlFor="temp-reservs" className="text-2xl font-semibold inline-flex items-center justify-between w-min p-2 rounded-lg cursor-pointer peer-checked:bg-slate-400 hover:bg-slate-300">temporary reservations</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
