import { useFetchPeople } from "@/hooks/fetchPeople";
import { ValidatePeople } from "./validatePeople"
import { EditPeople } from "./editPeople"
import { useState } from "react"

export function PeopleElem({ children }) {
    let days = children.days
    let titles = children.titles
    const tableID = children.tableID
    const [loading, setLoading] = useState(true)
    const [peopleLoading, people, peopleError] = useFetchPeople(tableID)
    const [valid, setValid] = useState(false)
    const [edit, setEdit] = useState(false)

    return (
        <>
            {!peopleLoading && <ValidatePeople>{{ people, setValid, setLoading, tableID }}</ValidatePeople>}
            {valid &&
                <div className="flex flex-col items-end">
                    <i className="fa-solid fa-user-pen sm:text-2xl cursor-pointer" onClick={(e) => setEdit(true)}></i>
                    <div className="px-3 sm:px-6 sm:py-4">
                        <h2>Personal</h2>
                    </div>
                </div>
            }
            {(!loading && (!valid || edit)) && <EditPeople>{{ people, setValid, tableID, setEdit, days, titles }}</EditPeople>}
            {loading && <div className='py-6 px-12'>
                <i className="fa-solid fa-spinner text-xl sm:text-4xl animate-spin"></i>
            </div>}
        </>
    )
}