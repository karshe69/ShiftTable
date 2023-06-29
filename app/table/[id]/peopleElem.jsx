import { useFetchPeople } from "@/hooks/fetchPeople";

export function PeopleElem({ children }) {
    const tableID = children.tableID
    const [peopleLoading, people, peopleError] = useFetchPeople(tableID)
    console.log(people, "people");

    return (
        <>
            {/* {!peopleLoading && <ValidatePeople>{{ people }}</ValidatePeople>} */}
            {!peopleLoading && <h1>hey</h1>}
        </>
    )
}