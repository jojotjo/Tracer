import React from 'react'

export default function Navbar() {
  return (
     <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Expense Tracer</h1>
      <button className="bg-white text-blue-600 px-4 py-1 rounded">Logout</button>
    </nav>
  )
}
