'use client'

import { useState, useEffect } from "react"

export function EditPerson({ children }) {
    let person = children.person
    console.log(person);
    const [name, setName] = useState(null)

    useEffect(() => {
        setName(person.docname)
    }, [person.docname])

    return (
        <div className="text-lg justify-center items-center w-full relative">
            <>

            </>
            <div className="justify-center">
                <i className="fa-solid fa-pen-to-square text-sm"></i>
                <input type="string" value={name} onChange={(e) => setName(e.target.value)} placeholder='name' className='outline-none bg-inherit text-slate-900 placeholder:text-slate-600 p-2 text-left w-auto inline-block font-bold' />
            </div>
            <div className="flex w-full justify-between h-5/6 py-4 px-2">
                <div className="px-4 flex justify-between items-center bg-slate-400 rounded w-full">table</div>
                <div className="flex-row pl-4 justify-end space-y-6">
                    <ul className="grid w-full gap-6 md:grid-rows-2">
                        <li>
                            <input type="radio" id="hosting-small" name="hosting" value="hosting-small" className="hidden peer" required></input>
                            <label for="hosting-small" className="text-lg bg-slate-600 text-white font-semibold inline-flex items-center justify-between w-full p-5 border-4 border-transparent rounded-lg cursor-pointer peer-checked:border-slate-800 peer-checked:bg-slate-500 hover:bg-slate-700">permanent reservs</label>
                        </li>
                        <li>
                            <input type="radio" id="hosting-big" name="hosting" value="hosting-big" className="hidden peer"></input>
                            <label for="hosting-big" className="text-lg bg-slate-600 text-white font-semibold inline-flex items-center justify-between w-full p-5 border-4 border-transparent rounded-lg cursor-pointer peer-checked:border-slate-800 peer-checked:bg-slate-500 hover:bg-slate-700">temporary reservs</label>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}