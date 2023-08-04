import { TableElem } from './tableElem'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export function EditTableSetup({ children }) {
    let table = children.table
    let tableID = children.tableID

    async function submitHandler() {
        const tableRef = doc(db, "tables", tableID)
        await setDoc(tableRef, {
            'days': table.days,
            'personel': table.personel,
            'titles': table.titles,
        }, { merge: true })
        children.setFullyState(true)
    }

    return (
        <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className='flex-1 rounded-lg bg-background text-sm p-2 flex flex-col justify-center items-center'>
                <h1 className='font-extrabold text-base sm:text-3xl uppercase p-2 sm:p-5'>register table</h1>
                <h3 className="text-xs sm:text-xl">type in the cells the amount of people you want in each shift</h3>
                <h3 className="text-xs sm:text-xl">type -1 if you want the max amount of people to be there</h3>
                <div className="py-2 sm:py-5 justify-center flex">
                    <TableElem>{{ columnTitles: table.days, table: table.personel, rowTitles: table.titles, editable: true }}</TableElem>
                </div>
                <button onClick={submitHandler} className="transition duration-300 bg-background_pop hover:bg-bg_prim font-bold py-1 sm:py-2 px-2 sm:px-4 rounded sm:mt-4 text-xs sm:text-base">submit</button>
            </div>
        </div>
    )
}