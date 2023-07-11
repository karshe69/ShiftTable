'use client'

import { useState } from "react"

export function MonthlyTable({ children }) {
    let person = children.person
    console.log(person);
    const currDate = new Date()
    const [month, setMonth] = useState(currDate.getMonth())
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [year, setYear] = useState(currDate.getFullYear())
    const [days, setDays] = useState(new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate())
    const [prevDays, setPrevDays] = useState(new Date(currDate.getFullYear(), currDate.getMonth(), 0).getDate())
    const [firstDay, setFirstDay] = useState(new Date(currDate.getFullYear(), currDate.getMonth(), 1).getDay())
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
        setDays(new Date(y, month + val + 1, 0).getDate())
        setPrevDays(new Date(y, month + val, 0).getDate())
        setFirstDay(new Date(y, month + val, 1).getDay());
    }

    return (
        <>
            {console.log(days + " " + firstDay + " " + prevDays)}
            <div className="flex-row justify-center">
                <h4 className="text-sm font-bold">{year}</h4>
                <div className="flex justify-center">
                    <i className="fa-solid fa-caret-left pt-1 text-xl" onClick={(e) => handleMonth(-1)}></i>
                    <h3 className="font-bold text-xl px-2 min-w-[30%]">{months[month]}</h3>
                    <i className="fa-solid fa-caret-right pt-1 text-xl" onClick={(e) => handleMonth(1)}></i>
                </div>
                <table></table>
            </div>
        </>
    )
}