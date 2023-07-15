'use client'

import { useState, useEffect } from "react"

const colors = ["green", "red", "blue", "violet", "orange", "yellow", "teal"]

export function MonthlyTable({ children }) {
    let person = children.person
    let show = children.show
    let titles = children.titles
    let setPerson = children.setPerson
    const currDate = new Date()
    const [month, setMonth] = useState(currDate.getMonth())
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [year, setYear] = useState(currDate.getFullYear())
    const [days, setDays] = useState([[]])
    const [paint, setPaint] = useState([])
    const [rerender, setRerender] = useState(false)
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

    async function handleCheck(event, color) {
        if (event.target.checked) {
            setPaint(paint => [...paint, color]);
        }
        else {
            setPaint(paint.filter(colour => colour != color))
        }
    }

    async function colorTable(date, show) {
        if (paint.length === 0) {
            return
        }
        let reservs
        if (show == 'perm') {
            reservs = person.permReservs
        }
        else {
            reservs = person.tempReservs
        }
        let color = paint.join('')
        if (reservs[date]) {
            let bool = true
            paint.map((color) => {
                bool *= reservs[date].includes(color)
                reservs[date] = reservs[date].replace(color, "");
            })
            if (!bool) {
                reservs[date] += color
                reservs[date] = reservs[date].split('').sort().join('');
            }
        }
        else {
            reservs[date] = color
            reservs[date] = reservs[date].split('').sort().join('');
        }
        setPerson(person)
        setRerender(!rerender)
    }

    async function getMonthDays(amountOfDays, firstDay) {
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
                    <h4 className="text-lg font-bold">{year}</h4>
                    <div className="flex justify-center">
                        <i className="fa-solid fa-caret-left pt-1 text-2xl" onClick={(e) => handleMonth(-1)}></i>
                        <h3 className="font-bold text-2xl px-2 min-w-[20%]">{months[month]}</h3>
                        <i className="fa-solid fa-caret-right pt-1 text-2xl" onClick={(e) => handleMonth(1)}></i>
                    </div>
                </div>
                <div className="h-full w-full flex flex-row justify-center">
                    <ul className="gap-6 flex flex-col content-between justify-center pr-8">
                        {titles.map((title, index) => (
                            <li key={colors[index]} className="flex justify-start items-center" onClick={(e) => handleCheck(e, index)}>
                                <input type="checkbox" id={colors[index]} value={colors[index]} className="hidden peer" required=""></input>
                                <label htmlFor={colors[index]} className={"inline-flex items-center justify-between w-min h-min p-2 text-gray-500 bg-white border-2 rounded-lg cursor-pointer border-" + colors[index] + "-600 peer-checked:bg-" + colors[index] + "-600"}></label>
                                <label className="font-bold text-xl text-left pl-1">{title}</label>
                            </li>
                        ))}
                    </ul>
                    <table className="h-full w-full">
                        <tbody>
                            {days.map((row, index) => (
                                <tr key={index}>
                                    {row.map((val, jndex) => (
                                        <>
                                            {(val > 0) &&
                                                < td key={val + months[month] + year} className="border" onClick={(e) => colorTable(val + months[month] + year, show)}>
                                                    <input htmlFor={val + months[month] + year} id={val + months[month] + year} value={val + months[month] + year} className="hidden peer" readOnly required=""></input>
                                                    <div className="h-full w-full relative flex p-1">
                                                        <h2 className="z-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl">{val}</h2>
                                                        {(show == 'perm' && person.permReservs[val + months[month] + year]) &&
                                                            person.permReservs[val + months[month] + year].split("").map((color) => (
                                                                <div className={"w-full h-full bg-" + colors[color] + "-600"}></div>
                                                            ))}
                                                        {(show == 'temp' && person.tempReservs[val + months[month] + year]) &&
                                                            person.tempReservs[val + months[month] + year].split("").map((color) => (
                                                                <div className={"w-full h-full bg-" + colors[color] + "-600"}></div>
                                                            ))}
                                                    </div>
                                                </td >
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
            </div >
        </>
    )
}

//< div className="border-green-600 border-red-600 border-blue-600 border-violet-600 border-orange-600 border-yellow-600 border-teal-600" ></div>
// < div className="peer-checked:bg-green-600 peer-checked:bg-red-600 peer-checked:bg-blue-600 peer-checked:bg-violet-600 peer-checked:bg-orange-600 peer-checked:bg-yellow-600 peer-checked:bg-teal-600" ></div>
// < div className="bg-green-600 bg-red-600 bg-blue-600 bg-violet-600 bg-orange-600 bg-yellow-600 bg-teal-600" ></div>