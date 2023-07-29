'use client'

import { useState } from "react"
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export default function EditName({ children }) {
    let table = children.table
    const [name, setName] = useState(table.name)
    const [size, setSize] = useState(table.size)
    let tableID = children.tableID
    async function submitHandler() {
        table.name = name
        table.size = size
        const tableRef = doc(db, "tables", tableID)
        await setDoc(tableRef, {
            'name': name,
            'size': size
        }, { merge: true })
        children.setNameState(true)
    }
    return (
        <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-background p-4 rounded-lg w-full max-w-lg">
                <div className='flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4'>
                    <h1 className='font-extrabold select-none text-2xl sm:text-3xl uppercase'>register table</h1>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='bg-inherit outline-none focus:border-b-2 focus:border-solid focus:border-secondary p-2 w-full max-w-[40ch]' />
                    <input type="number" value={size} onChange={(e) => setSize(e.target.value)} placeholder='amount of shifts a day' className='bg-inherit outline-none focus:border-b-2 focus:border-solid focus:border-secondary p-2 w-full max-w-[40ch]' />
                    <button onClick={submitHandler} className="transition duration-300 bg-background_pop hover:bg-bg_prim font-bold py-2 px-4 rounded mt-4">submit</button>
                </div>
            </div>
        </div>
    )
}