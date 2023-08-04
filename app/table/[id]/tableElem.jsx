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
    let small = window.innerWidth < 640
    for (let i = 0; i < columnTitlesTemplate.length; i++) {
        char = columnTitlesTemplate[i].substring(0, 1)
        columnTitlesTemplate[i].substring(1)
        if (!small) {
            switch (char) {
                case 'a':
                    columnTitles[i] = "sunday"
                    break
                case 'b':
                    columnTitles[i] = "monday"
                    break
                case 'c':
                    columnTitles[i] = "tuesday"
                    break
                case 'd':
                    columnTitles[i] = "wednesday"
                    break
                case 'e':
                    columnTitles[i] = "thursday"
                    break
                case 'f':
                    columnTitles[i] = "friday"
                    break
                case 'g':
                    columnTitles[i] = "saturday"
                    break
            }
        }
        else {
            switch (char) {
                case 'a':
                    columnTitles[i] = "s"
                    break
                case 'b':
                    columnTitles[i] = "m"
                    break
                case 'c':
                    columnTitles[i] = "t"
                    break
                case 'd':
                    columnTitles[i] = "w"
                    break
                case 'e':
                    columnTitles[i] = "t"
                    break
                case 'f':
                    columnTitles[i] = "f"
                    break
                case 'g':
                    columnTitles[i] = "s"
                    break
            }
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
            <table className="text-xs sm:text-base font-normal bg-background_pop border-collapse sm:w-1/2 h-full rounded-lg">
                <thead className="bg-bg_sec">
                    <tr>
                        <th className="sm:px-4 sm:py-2 font-normal">shifts</th>
                        {columnTitles.map((title, index) => (
                            <th key={index} className="px-1 sm:px-4 sm:py-2 font-normal">{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="">
                    {table.map((personel, index) => (
                        <tr key={index} className="border-y border-gray-700">
                            <td className="rounded-md sm:px-4 sm:py-2">
                                {editable && <input
                                    className="bg-background_pop px-1 sm:px-4 max-w-[10ch]"
                                    name="name"
                                    value={rowTitles[index]}
                                    type="text"
                                    onChange={(e) => onChangeInput(e.target.value, index, -1)}
                                    placeholder="title"
                                />}
                                {!editable && rowTitles[index]}
                            </td>
                            {Object.keys(personel).sort().map((val) => (
                                <td key={val} className="rounded-md sm:px-3 sm:py-2">
                                    {editable && <input
                                        className="bg-background_pop w-full text-center"
                                        value={personel[val]}
                                        type="number"
                                        onChange={(e) => onChangeInput(e.target.value, index, val)}
                                        placeholder="amount"
                                    />}
                                    {!editable && personel[val]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}