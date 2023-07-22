'use client'

import { useAuth } from '../context/AuthContext'
import { useFetchTableList } from '../hooks/fetchTableList'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'

export default function Home() {
  const [adminLoading, adminTable, adminError] = useFetchTableList("write")
  const [viewLoading, viewTable, viewError] = useFetchTableList("read")
  let { currentUser } = useAuth()
  const uid = currentUser.uid



  async function newTable() {
    const docRef = await addDoc(collection(db, "tables"), { write: [uid] });
    console.log(docRef.id);

    window.location.replace(`/table/${docRef.id}`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative container mx-auto p-6">
        <a className="text-2xl">Admin Tables</a>
        {!adminLoading &&
          <ul className="relative flex items-center p-8 space-x-6 w-full h-full overflow-x-auto whitespace-nowrap scroll-smooth">
            {adminTable.map((table, index) => (
              <li key={index} href={`/table/${table.docid}`} className="flex items-center justify-center bg-slate-100 hover:scale-105 ease-in-out min-w-[128px] w-[128px] h-[128px] cursor-pointer">{table.docname}</li>
            ))}
            <li onClick={(e) => newTable()} className='flex items-center justify-center bg-slate-100 hover:scale-105 ease-in-out min-w-[128px] w-[128px] h-[128px] cursor-pointer'>
              <i class="fa-solid fa-plus text-4xl"></i>
            </li>
          </ul>
        }
        {adminLoading &&
          <div className='py-6 px-12'>
            <i className="fa-solid fa-spinner text-4xl animate-spin"></i>
          </div>}
        {viewTable.length != 0 && <div>
          <a className="text-2xl">View Tables</a>
          {!viewLoading &&
            <ul className="relative flex items-center p-8 space-x-6 w-full h-full overflow-x-auto whitespace-nowrap scroll-smooth">
              {viewTable.map((table, index) => (
                <li key={index} href={`/table/${table.docid}`} className="flex items-center justify-center bg-slate-100 hover:scale-105 ease-in-out min-w-[128px] w-[128px] h-[128px] cursor-pointer">{table.docname}</li>
              ))}
            </ul>
          }
        </div>
        }
      </div>
    </main >
  )
}