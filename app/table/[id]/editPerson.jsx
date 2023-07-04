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
        <div className="text-lg p-2 justify-center items-center">
            <div>
                <i class="fa-solid fa-pen-to-square text-sm"></i>
                <input type="string" value={name} onChange={(e) => setName(e.target.value)} placeholder='name' className='outline-none bg-inherit text-slate-900 placeholder:text-slate-600 p-2 text-left w-auto inline-block font-bold' />
            </div>
            <div>
                <h2>permenant reservations</h2>
                <></>
            </div>
            <div>temp</div>
        </div>
    )
}