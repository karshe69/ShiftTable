'use client'

import ValidateTable from './validateTable';
import { useFetchTable } from "@/hooks/fetchTable";
import { useState } from "react";
import { TableElem } from './tableElem';
import { PeopleElem } from './peopleElem'
import EditName  from "./editName"
import { EditTableSetup } from './editTableSetup';


export default function Home({ params }) {
    const tableID = params.id;
    const [tableLoading, table, tableError] = useFetchTable(tableID)
    const [validated, setValidated] = useState(false)
    const [nameState, setNameState] = useState(true)
    const [fullyState, setFullyState] = useState(true)

    return (
        <main className="min-h-screen px-2 py-2 sm:px-24 sm:py-14">
            {!tableLoading &&
                <div>
                    <div className='flex-row flex space-x-1 sm:space-x-2'>
                        <h1 className='font-bold sm:text-4xl'>{table.name}</h1>
                        <div className='relative'>
                            <i className="fa-solid fa-pen-to-square text-xs sm:text-xl cursor-pointer absolute bottom-0" onClick={(e) => setNameState(false)}></i>
                        </div>
                    </div>
                    <div className="flex justify-between py-10 sm:py-20">
                        <ValidateTable>{{ table, setValidated, tableID }}</ValidateTable>
                        {!nameState && <EditName>{{ setNameState, table, tableID }}</EditName>}
                        {!fullyState && <EditTableSetup>{{ table, setFullyState, tableID }}</EditTableSetup>}
                        {validated &&
                            <div>
                                <i className="fa-solid fa-pen-to-square sm:text-2xl cursor-pointer" onClick={(e) => setFullyState(false)}></i>
                                <div className='pl-6 pt-2'>
                                    <TableElem>{{ columnTitles: table.days, table: table.personel, rowTitles: table.titles, editable: false }}</TableElem>
                                </div>
                            </div>}
                        {validated && <>
                            <PeopleElem>{{ tableID, days: table.days, titles: table.titles }}</PeopleElem>
                        </>}
                    </div>
                </div>
            }
            {tableLoading &&
                <i className="fa-solid fa-spinner text-6xl animate-spin"></i>
            }
        </main>
    )
}
