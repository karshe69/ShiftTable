'use client'

import { useState, useEffect } from "react"

export function MonthlyTable({ children }) {
    let person = children.person
    console.log(person);
    let show = children.show
    console.log(show);
    const currDate = new Date()
    const [month, setMonth] = useState(currDate.getMonth())
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [year, setYear] = useState(currDate.getFullYear())
    const [days, setDays] = useState([[]])
    useEffect(() => {
        getMonthDays(new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate(), new Date(currDate.getFullYear(), currDate.getMonth(), 1).getDay()).then((data) => {
            setDays(data)
        })
    }, []);
    async function handleMonth(val) {
        let y = year
        if (month + val >= 12) {
            val = -11
            y += 1
        }
        if (month + val <= -1) {
            val = 11
            y -= 1
        }
        setYear(y)
        setMonth(month + val)
        getMonthDays(new Date(y, month + val + 1, 0).getDate(), new Date(y, month + val, 1).getDay()).then((data) => {
            setDays(data)
        })
    }

    async function getMonthDays(amountOfDays, firstDay) {
        console.log(amountOfDays + " " + firstDay)
        let arr = []
        for (let i = 0; i < 6; i++) {
            if (i * 7 - firstDay >= amountOfDays) {
                break
            }
            arr[i] = []
            for (let j = 0; j < 7; j++) {
                arr[i][j] = j + i * 7 - firstDay + 1
                if (arr[i][j] > amountOfDays) {
                    arr[i][j] = -1
                }
            }
        }
        return arr
    }
    return (
        <>
            <div className="h-full w-full flex flex-col justify-center">
                <div>
                    <h4 className="text-sm font-bold">{year}</h4>
                    <div className="flex justify-center">
                        <i className="fa-solid fa-caret-left pt-1 text-xl" onClick={(e) => handleMonth(-1)}></i>
                        <h3 className="font-bold text-xl px-2 min-w-[20%]">{months[month]}</h3>
                        <i className="fa-solid fa-caret-right pt-1 text-xl" onClick={(e) => handleMonth(1)}></i>
                    </div>
                </div>
                <table className="h-full w-full">
                    <tbody>
                        {days.map((row, index) => (
                            <tr key={index}>
                                {row.map((val, jndex) => (
                                    <>
                                        {(val > 0) &&
                                            <td key={jndex} className="border">
                                                <div className="h-full w-full relative flex">
                                                    <h2 className="z-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-xl">{val}</h2>
                                                    <div className="bg-green-500 h-full w-full"></div>
                                                    <div className="bg-blue-500 h-full w-full"></div>
                                                    <div className="bg-red-500 h-full w-full"></div>
                                                </div>
                                            </td>
                                        }
                                        {(val <= 0) &&
                                            <td key={jndex}></td>
                                        }
                                    </>

                                ))}
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}