'use client'

import { useEffect, useState } from "react";

export default function ValidateFully({ children }) {
    let table = children.table
    const [rerender, setRerender] = useState(true)

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
                    sunday: 1,
                    monday: 1,
                    tuesday: 1,
                    wednesday: 1,
                    thursday: 1,
                    friday: 1,
                    saturday: 1
                }
            }
            if (typeof (table.personel[i].sunday) !== 'number') {
                bool = false
                table.personel[i].sunday = 1
            }
            if (typeof (table.personel[i].monday) !== 'number') {
                bool = false
                table.personel[i].monday = 1
            }
            if (typeof (table.personel[i].tuesday) !== 'number') {
                bool = false
                table.personel[i].tuesday = 1
            }
            if (typeof (table.personel[i].wednesday) !== 'number') {
                bool = false
                table.personel[i].wednesday = 1
            }
            if (typeof (table.personel[i].thursday) !== 'number') {
                bool = false
                table.personel[i].thursday = 1
            }
            if (typeof (table.personel[i].friday) !== 'number') {
                bool = false
                table.personel[i].friday = 1
            }
            if (typeof (table.personel[i].saturday) !== 'number') {
                bool = false
                table.personel[i].saturday = 1
            }
        }
        if (table.personel.length != table.size) {
            for (let i = table.personel.length; i < table.size; i++) {
                table.personel[i] = {
                    sunday: 1,
                    monday: 1,
                    tuesday: 1,
                    wednesday: 1,
                    thursday: 1,
                    friday: 1,
                    saturday: 1
                }
            }
            bool = false
        }
        children.setFullyState(bool && rerender)
        setRerender(false)
    }, [rerender])

    async function submitHandler() {
        children.setFullyState(true)
    }
    return (
        <>
            {!rerender && <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg">
                    <div className='flex-1 text-sm p-2 flex flex-col justify-center items-center'>
                        <h1 className='font-extrabold select-none text-2xl sm:text-3xl uppercase'>register table</h1>
                        <table className="bg-gray-100 border-collapse w-full h-full rounded-lg">
                            <colgroup>
                                <col className="" />
                                <col className="border-x border-gray-600" />
                                <col className="border-x border-gray-600" />
                                <col className="border-x border-gray-600" />
                                <col className="border-x border-gray-600" />
                                <col className="border-x border-gray-600" />
                                <col className="border-x border-gray-600" />
                                <col className="" />
                            </colgroup>
                            <thead className="bg-gray-600 text-white text-center">
                                <tr>
                                    <th className="px-4 py-2">shifts</th>
                                    <th className="px-4 py-2">sunday</th>
                                    <th className="px-4 py-2">monday</th>
                                    <th className="px-4 py-2">tuesday</th>
                                    <th className="px-4 py-2">wednesday</th>
                                    <th className="px-4 py-2">thursday</th>
                                    <th className="px-4 py-2">friday</th>
                                    <th className="px-4 py-2">saturday</th>
                                </tr>
                            </thead>
                            {table.personel.map((personel, index) => (
                                <tbody key={index} className="text-center">
                                    <tr className="border-y border-gray-700">
                                        <td className="rounded-md px-4 py-2">{table.titles[index]}</td>
                                        <td className="rounded-md px-4 py-2">{personel.sunday}</td>
                                        <td className="rounded-md px-4 py-2">{personel.monday}</td>
                                        <td className="rounded-md px-4 py-2">{personel.tuesday}</td>
                                        <td className="rounded-md px-4 py-2">{personel.wednesday}</td>
                                        <td className="rounded-md px-4 py-2">{personel.thursday}</td>
                                        <td className="rounded-md px-4 py-2">{personel.friday}</td>
                                        <td className="rounded-md px-4 py-2">{personel.saturday}</td>
                                    </tr>
                                </tbody>
                            ))}

                        </table>
                        <button onClick={submitHandler} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">submit</button>
                    </div>
                </div>
            </div>}
        </>
    )
}