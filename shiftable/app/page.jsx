'use client'

import React, { useState } from 'react'
import { useFetchTableList } from '../hooks/fetchTableList'

export default function Home() {
  const [viewTable, setViewTable] = useState(null)
  // const [adminTable, setadminTable] = useState(null)

  const { adminLoading, adminTable, adminError } = useFetchTableList("write")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative container mx-auto p-6">
        <a className="text-2xl">Admin Tables</a>
        {adminTable && <div className="relative items-center p-8 space-x-6 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth"></div>}
        {!adminTable && <div>You don't have any tables here</div>}
        <a className="text-2xl">View Tables</a>
        {viewTable && <div className="relative items-center p-8 space-x-6 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth"></div>}
        {!viewTable && <div>You don't have any tables here</div>}
      </div>
    </main >
  )
}