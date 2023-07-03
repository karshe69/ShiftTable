export function EditPeople({ children }) {

    async function submitHandler() {
        // const tableRef = doc(db, "tables", tableID)
        // await setDoc(tableRef, {
        //     'days': table.days,
        //     'personel': table.personel,
        //     'titles': table.titles,
        // }, { merge: true })
        children.setValid(true)
        children.setEdit(false)
    }

    return (
        <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-2 rounded-lg">
                <div className='flex-1 text-sm p-2 flex flex-col justify-center items-center'>
                    <h1 className='font-extrabold text-3xl uppercase p-5'>Edit People</h1>
                    <h3 className="text-xl">type in the cells the amount of people you want in each shift</h3>
                    <h3 className="text-xl">type -1 if you want the max amount of people to be there</h3>
                    <div className="py-5 justify-center flex">PEOPLE LIST HERE
                    </div>
                    <button onClick={submitHandler} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">submit</button>
                </div>
            </div>
        </div>
    )
}