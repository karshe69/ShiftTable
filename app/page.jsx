'use client'

import { useFetchTableList } from '../hooks/fetchTableList'

export default function Home() {
  const [adminLoading, adminTable, adminError] = useFetchTableList("write")
  const [viewLoading, viewTable, viewError] = useFetchTableList("read")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative container mx-auto p-6">
        <a className="text-2xl">Admin Tables</a>
        {(adminTable && !adminLoading) && <div className="relative flex items-center p-8 space-x-6 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth">
          {adminTable.map((table, index) => (
            <a key={index} href={`/table/${table.docid}`} className="flex items-center justify-center bg-slate-100 hover:scale-105 ease-in-out min-w-[128px] w-[128px] h-[128px]">{table.docname}</a>
          ))
          }
        </div>}
        {(!adminTable && !adminLoading) && <div>You don't have any tables here</div>}
        {adminLoading &&
          <div className='py-6 px-12'>
            <i className="fa-solid fa-spinner text-4xl animate-spin"></i>
          </div>}
        <a className="text-2xl">View Tables</a>
        {(viewTable && !viewLoading) && <div className="relative flex items-center p-8 space-x-6 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth">
          {viewTable.map((table, index) => (
            <a key={index} href={`/table/${table.docid}`} className="flex items-center justify-center bg-slate-100 hover:scale-105 ease-in-out min-w-[128px] w-[128px] h-[128px]">{table.docname}</a>
          ))
          }</div>}
        {(!viewTable && !viewLoading) && <div>You don't have any tables here</div>}
        {viewLoading &&
          <div className='py-6 px-12'>
            <i className="fa-solid fa-spinner text-4xl animate-spin"></i>
          </div>}
      </div>
    </main >
  )
}