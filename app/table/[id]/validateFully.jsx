'use client'

import { useEffect, useState } from "react";
import { TableElem } from "./tableElem";
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export default function ValidateFully({ children }) {
    let table = children.table
    const [rerender, setRerender] = useState(true)
    let tableID = children.tableID

    useEffect(() => {
        let bool = true
        if (!table.titles) {
            bool = false
            table.titles = []
        }
        if (table.titles.length != table.size) {
            bool = false
            for (let i = table.titles.length; i < table.size; i++) {
                table.titles[i] = "temporary title"
            }
        }
        if (!table.personel || !Array.isArray(table.personel)) {
            bool = false
            table.personel = []
            table.length = 0
        }
        for (let i = 0; i < table.personel.length; i++) {
            if (typeof (table.personel[i]) !== 'object') {
                bool = false
                table.personel[i] = {
                    "1sunday": 1,
                    "2monday": 1,
                    "3tuesday": 1,
                    "4wednesday": 1,
                    "5thursday": 1,
                    "6friday": 1,
                    "7saturday": 1
                }
            }
            if (typeof (table.personel[i]["1sunday"]) !== 'number') {
                bool = false
                table.personel[i]["1sunday"] = 1
            }
            if (typeof (table.personel[i]["2monday"]) !== 'number') {
                bool = false
                table.personel[i]["2monday"] = 1
            }
            if (typeof (table.personel[i]["3tuesday"]) !== 'number') {
                bool = false
                table.personel[i]["3tuesday"] = 1
            }
            if (typeof (table.personel[i]["4wednesday"]) !== 'number') {
                bool = false
                table.personel[i]["4wednesday"] = 1
            }
            if (typeof (table.personel[i]["5thursday"]) !== 'number') {
                bool = false
                table.personel[i]["5thursday"] = 1
            }
            if (typeof (table.personel[i]["6friday"]) !== 'number') {
                bool = false
                table.personel[i]["6friday"] = 1
            }
            if (typeof (table.personel[i]["7saturday"]) !== 'number') {
                bool = false
                table.personel[i]["7saturday"] = 1
            }
        }
        if (table.personel.length != table.size) {
            if (table.personel.length > table.size) {
                console.log("woonk woonk");
            }
            for (let i = table.personel.length; i < table.size; i++) {
                table.personel[i] = {
                    "1sunday": 1,
                    "2monday": 1,
                    "3tuesday": 1,
                    "4wednesday": 1,
                    "5thursday": 1,
                    "6friday": 1,
                    "7saturday": 1
                }
            }
            bool = false
        }
        if (!table.days || !Array.isArray(table.personel)) {
            table.days = ["a", "b", "c", "d", "e", "f", "g"]
            bool = false
        }
        children.setFullyState(bool && rerender)
        setRerender(false)
    }, [rerender])

    async function submitHandler() {
        const tableRef = doc(db, "tables", tableID)
        await setDoc(tableRef, {
            'days': table.days,
            'personel': table.personel,
            'titles': table.titles,
        }, { merge: true })
        children.setFullyState(true)
    }
    return (
        <>
            {!rerender && <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-2 rounded-lg">
                    <div className='flex-1 text-sm p-2 flex flex-col justify-center items-center'>
                        <h1 className='font-extrabold text-3xl uppercase p-5'>register table</h1>
                        <h3 className="text-xl">type in the cells the amount of people you want in each shift</h3>
                        <h3 className="text-xl">type -1 if you want the max amount of people to be there</h3>
                        <div className="p-5">
                            <TableElem>{{ columnTitles: table.days, table: table.personel, rowTitles: table.titles, editable: true }}</TableElem>
                        </div>
                        <button onClick={submitHandler} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">submit</button>
                    </div>
                </div>
            </div>}
        </>
    )
}