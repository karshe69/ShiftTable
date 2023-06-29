import { useFetchPeople } from "@/hooks/fetchPeople";
import { ValidatePeople } from "./validatePeople"
import { useState } from "react"

export function PeopleElem({ children }) {
    const tableID = children.tableID
    const [peopleLoading, people, peopleError] = useFetchPeople(tableID)
    const [valid, setValid] = useState(false)
    console.log(people, "people");

    return (
        <>
            {!peopleLoading && <ValidatePeople>{{ people, setValid, tableID }}</ValidatePeople>}
            {(!peopleLoading && valid) && <h1>hey</h1>}
        </>
    )
}