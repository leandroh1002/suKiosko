import React from 'react'
import Dashboard from '../Dashboard'

function DashboardView() {
  return (
    <div className="flex flex-col min-h-[55vh]">
    <div className="flex-grow">
      <Dashboard />
    </div>
  </div>
  )
}

export default DashboardView