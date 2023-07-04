import { useFetchPeople } from "@/hooks/fetchPeople";
import { ValidatePeople } from "./validatePeople"
import { EditPeople } from "./editPeople"
import { useState } from "react"

export function PeopleElem({ children }) {
    const tableID = children.tableID
    const [loading, setLoading] = useState(true)
    const [peopleLoading, people, peopleError] = useFetchPeople(tableID)
    const [valid, setValid] = useState(false)
    const [edit, setEdit] = useState(true)
    return (
        <>
            {!peopleLoading && <ValidatePeople>{{ people, setValid, setLoading, tableID }}</ValidatePeople>}
            {valid && <h1>LIST OF PEOPLE HERE</h1>}
            {(!loading && (!valid || edit)) && <EditPeople>{{ people, setValid, tableID, setEdit }}</EditPeople>}
            {loading && <div className='py-6 px-12'>
                <i className="fa-solid fa-spinner text-4xl animate-spin"></i>
            </div>}
        </>
    )
}