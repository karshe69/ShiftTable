'use client'

import ValidateTable from './validateTable';
import { useFetchTable } from "@/hooks/fetchTable";
import { useState } from "react";
import { TableElem } from './tableElem';
import { PeopleElem } from './peopleElem'


export default function Home({ params }) {
    const tableID = params.id;
    const [tableLoading, table, tableError] = useFetchTable(tableID)
    const [validated, setValidated] = useState(false)
    console.log(table, "table");
    return (
        <main className="min-h-screen p-24">
            <div className="flex justify-between space-x-8">
                <ValidateTable>{{ table, tableLoading, setValidated, tableID }}</ValidateTable>
                {validated && <TableElem>{{ columnTitles: table.days, table: table.personel, rowTitles: table.titles, editable: false }}</TableElem>}
                <PeopleElem>{{ tableID }}</PeopleElem>
            </div>
        </main>
    )
}
