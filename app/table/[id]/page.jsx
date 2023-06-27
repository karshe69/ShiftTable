'use client'

import ValidateTable from './validateTable';
import { useFetchTable } from "@/hooks/fetchTable";
import { useFetchPeople } from "@/hooks/fetchPeople";
import { useState } from "react";


export default function Home({ params }) {
    const tableID = params.id;
    const [tableLoading, table, tableError] = useFetchTable(tableID)
    const [peopleLoading, people, peopleError] = useFetchPeople(tableID)
    const [validated, setValidated] = useState(false)
    console.log(table, "table");
    console.log(people, "people");

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <ValidateTable>{{ table, tableLoading, setValidated }}</ValidateTable>
            <div className="flex justify-between py-6 h-3/4">
                <div className="flex-wrap px-6"></div>
                <div className="overflow-hidden shadow-md rounded-lg border-2 border-gray-700 h-full">
                    <table id="main table" className="bg-gray-100 border-collapse w-full h-full">
                        <colgroup>
                            <col className="" />
                            <col className="border-x border-gray-600" />
                            <col className="border-x border-gray-600" />
                            <col className="border-x border-gray-600" />
                            <col className="border-x border-gray-600" />
                            <col className="border-x border-gray-600" />
                            <col className="" />
                        </colgroup>
                        <thead className="bg-gray-600 text-white text-center">
                            <tr>
                                <th className="px-4 py-2">sunday</th>
                                <th className="px-4 py-2">monday</th>
                                <th className="px-4 py-2">tuesday</th>
                                <th className="px-4 py-2">wednesday</th>
                                <th className="px-4 py-2">thursday</th>
                                <th className="px-4 py-2">friday</th>
                                <th className="px-4 py-2">saturday</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr className="border-y border-gray-700">
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                            </tr>
                            <tr className="border-y border-gray-700">
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true"></td>
                            </tr>
                            <tr className="border-y border-gray-700">
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true" rowSpan={2}>asd
                                    dsa
                                </td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true" rowSpan={2}></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true" rowSpan={2}></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true" rowSpan={2}></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true" rowSpan={2}></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true" rowSpan={2}></td>
                                <td id="draggable" className="rounded-md px-4 py-2" draggable="true" rowSpan={2}></td>
                            </tr>
                            <tr>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}
