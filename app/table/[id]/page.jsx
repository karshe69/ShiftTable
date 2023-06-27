'use client'

import ValidateTable from './validateTable';
import { useFetchTable } from "@/hooks/fetchTable";
import { useFetchPeople } from "@/hooks/fetchPeople";
import { useState } from "react";
import { TableElem } from './tableElem';


export default function Home({ params }) {
    const tableID = params.id;
    const [tableLoading, table, tableError] = useFetchTable(tableID)
    const [peopleLoading, people, peopleError] = useFetchPeople(tableID)
    const [validated, setValidated] = useState(false)
    console.log(table, "table");
    console.log(people, "people");
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <ValidateTable>{{ table, tableLoading, setValidated, tableID }}</ValidateTable>
            {validated && <TableElem>{{columnTitles: table.days, table: table.personel, rowTitles: table.titles, editable:false}}</TableElem>}
        </main>
    )
}
