'use client'

import { useAuth } from '../context/AuthContext'
import { useFetchTableList } from '../hooks/fetchTableList'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'

export default function Home() {
  const [adminLoading, adminTable, adminError] = useFetchTableList("write")
  const [viewLoading, viewTable, viewError] = useFetchTableList("read")
  let { currentUser } = useAuth()
  let uid
  if (currentUser) {
    uid = currentUser.uid
  }

  async function newTable() {
    const docRef = await addDoc(collection(db, "tables"), { write: [uid] });
    console.log(docRef.id);

    window.location.href = `/table/${docRef.id}`
  }

  return (
    <main className="flex-col h-full">
      {adminLoading &&
        <div className='py-6 px-12 h-full w-full items-center'>
          <i className="fa-solid fa-spinner text-7xl sm:text-9xl animate-spin"></i>
        </div>}
      {currentUser &&
        <div className="relative h-full space-y-12 w-full py-6 px-12">
          {!adminLoading &&
            <div>
              <a className="text-2xl font-extrabold">Admin Tables</a>
              <ul className="flex flex-row items-center p-4 sm:p-8 space-x-6 w-full h-fit overflow-x-auto whitespace-nowrap scroll-smooth">
                {adminTable.map((table, index) => (
                  <li key={index} onClick={(e) => window.location.href = `/table/${table.docid}`} className="flex flex-wrap break-normal items-center justify-center bg-background_pop hover:bg-bg_prim rounded hover:scale-105 ease-in-out w-[100px] sm:w-[320px] 2xl:w-[640px] h-[100px] sm:h-[150px] 2xl:h-[384px] shrink-0 cursor-pointer duration-300 font-bold text-base sm:text-2xl">{table.docname}</li>
                ))}
                <li onClick={(e) => newTable()} className="flex items-center justify-center bg-background_pop hover:bg-bg_prim rounded hover:scale-105 ease-in-out w-[100px] sm:w-[320px] 2xl:w-[640px] h-[100px] sm:h-[150px] 2xl:h-[384px] shrink-0 cursor-pointer duration-300 font-bold">
                  <i className="fa-solid fa-plus text-xl sm:text-4xl"></i>
                </li>
              </ul>
            </div>
          }
          {viewTable.length != 0 && <div>
            <a className="text-2xl font-extrabold">View Tables</a>
            {!viewLoading &&
              <ul className="relative flex items-center p-4 sm:p-8 space-x-6 w-full h-full overflow-x-auto whitespace-nowrap scroll-smooth">
                {viewTable.map((table, index) => (
                  <li key={index} onClick={(e) => window.location.href = `/table/${table.docid}`} className="flex items-center justify-center bg-background_pop hover:bg-bg_prim rounded hover:scale-105 ease-in-out w-[100px] sm:w-[320px] 2xl:w-[640px] h-[100px] sm:h-[150px] 2xl:h-[384px] shrink-0 cursor-pointer duration-300 font-bold text-base sm:text-2xl">{table.docname}</li>
                ))}
              </ul>
            }
          </div>
          }
        </div>
      }
      {!currentUser &&
        <div className='p-12'>
          <h2 className='text-3xl '>You need to log in to see tables</h2>
        </div>
      }

    </main >
  )
}