export default function ValidateFully({ children }) {
    let table = children.table

    async function submitHandler() {
        children.setFullyState(true)
    }
    console.log(table.titles, table.personel, 123);
    return (
        <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <div className='flex-1 text-sm p-2 flex flex-col justify-center items-center'>
                    <h1 className='font-extrabold select-none text-2xl sm:text-3xl uppercase'>register table</h1>
                    <table className="bg-gray-100 border-collapse w-full h-full rounded-lg">
                        <colgroup>
                            <col className="" />
                            <col className="border-x border-gray-600" />
                            <col className="border-x border-gray-600" />
                            <col className="border-x border-gray-600" />
                            <col className="border-x border-gray-600" />
                            <col className="border-x border-gray-600" />
                            <col className="border-x border-gray-600" />
                            <col className="" />
                        </colgroup>
                        <thead className="bg-gray-600 text-white text-center">
                            <tr>
                                <th className="px-4 py-2">shift</th>
                                <th className="px-4 py-2">sunday</th>
                                <th className="px-4 py-2">monday</th>
                                <th className="px-4 py-2">tuesday</th>
                                <th className="px-4 py-2">wednesday</th>
                                <th className="px-4 py-2">thursday</th>
                                <th className="px-4 py-2">friday</th>
                                <th className="px-4 py-2">saturday</th>
                            </tr>
                        </thead>
                        {table.personel.map((personel, index) => (
                            <tbody key={index} className="text-center">
                                <tr className="border-y border-gray-700">
                                    <td className="rounded-md px-4 py-2">{table.titles}</td>
                                    <td className="rounded-md px-4 py-2">{personel.sunday}</td>
                                    <td className="rounded-md px-4 py-2">{personel.monday}</td>
                                    <td className="rounded-md px-4 py-2">{personel.tuesday}</td>
                                    <td className="rounded-md px-4 py-2">{personel.wednesday}</td>
                                    <td className="rounded-md px-4 py-2">{personel.thursday}</td>
                                    <td className="rounded-md px-4 py-2">{personel.friday}</td>
                                    <td className="rounded-md px-4 py-2">{personel.saturday}</td>
                                </tr>
                            </tbody>
                        ))}

                    </table>
                    <button onClick={submitHandler} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">submit</button>
                </div>
            </div>
        </div>
    )
}