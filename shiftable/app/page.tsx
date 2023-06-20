export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative container mx-auto p-6">
        <a className="text-2xl">Admin Tables</a>
        <div id="adminTables" className="relative flex items-center p-8 space-x-6 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth"></div>
        <a className="text-2xl">View Tables</a>
        <div id="viewTables" className="relative flex items-center p-8 space-x-6 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth"></div>
      </div>
    </main >
  )
}
