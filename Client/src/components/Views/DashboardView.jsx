import React from 'react'
import Dashboard from '../Dashboard'
import UploadExcel from '../UploadExcel/UploadExcel'

function DashboardView() {
  return (
    <div className="flex flex-col min-h-[55vh]">
    <div className="flex-grow">
      <Dashboard />
      <UploadExcel />
    </div>
  </div>
  )
}

export default DashboardView