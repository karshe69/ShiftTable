export default function ValidateName({ children }) {
    let table = children.table
    let name = table.name
    let size = table.size
    async function submitHandler() {
        table.name = name
        table.size = size
        children.setNameState(true)
    }
    return (
        <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-full max-w-lg">
                <div className='flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4'>
                    <h1 className='font-extrabold select-none text-2xl sm:text-3xl uppercase'>register table</h1>
                    <input type="text" value={name} onChange={(e) => name = e.target.value} placeholder='Name' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
                    <input type="number" value={size} onChange={(e) => size = e.target.value} placeholder='amount of shifts a day' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
                    <button onClick={submitHandler} className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">submit</button>
                </div>
            </div>
        </div>
    )
}