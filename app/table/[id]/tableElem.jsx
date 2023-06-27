'use client'

import { useState } from "react"

export function TableElem({ children }) {
    const [rerender, setRerender] = useState(false)
    let columnTitlesTemplate = children.columnTitles
    let rowTitles = children.rowTitles
    let table = children.table
    let columnTitles = []
    let editable = children.editable
    let char
    for (let i = 0; i < columnTitlesTemplate.length; i++) {
        char = columnTitlesTemplate[i].substring(0, 1)
        columnTitlesTemplate[i].substring(1)
        if (char == 'a') {
            columnTitles[i] = "sunday"
        }
        if (char == 'b') {
            columnTitles[i] = "monday"
        }
        if (char == 'c') {
            columnTitles[i] = "tuesday"
        }
        if (char == 'd') {
            columnTitles[i] = "wednesday"
        }
        if (char == 'e') {
            columnTitles[i] = "thursday"
        }
        if (char == 'f') {
            columnTitles[i] = "friday"
        }
        if (char == 'g') {
            columnTitles[i] = "saturday"
        }
    }
    const onChangeInput = (value, index, key) => {
        if (key == -1) {
            rowTitles[index] = value
        }
        else {
            table[index][key] = parseInt(value)
        }
        setRerender(!rerender)
    }
    return (
        <>
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
                        {columnTitles.map((title, index) => (
                            <th key={index} className="px-4 py-2">{title}</th>
                        ))}
                    </tr>
                </thead>
                {table.map((personel, index) => (
                    <tbody key={index} className="text-center">
                        <tr className="border-y border-gray-700">
                            <td className="rounded-md px-4 py-2">
                                {editable && <input
                                    className="bg-transparent"
                                    name="name"
                                    value={rowTitles[index]}
                                    type="text"
                                    onChange={(e) => onChangeInput(e.target.value, index, -1)}
                                    placeholder="title"
                                />}
                                {!editable && rowTitles[index]}
                            </td>
                            {Object.keys(personel).map((val) => (
                                <td key={val} className="rounded-md px-3 py-2">
                                    {editable && <input
                                        className="bg-transparent w-full"
                                        value={personel[val]}
                                        type="number"
                                        onChange={(e) => onChangeInput(e.target.value, index, val)}
                                        placeholder="amount"
                                    />}
                                    {!editable && personel[val]}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                ))}
            </table>
        </>
    )
}