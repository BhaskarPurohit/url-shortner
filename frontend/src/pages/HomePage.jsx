import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between"></div>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="text-2xl font-bold text-center mb-6">
                URL Shortner
                <UrlForm/>
            </div>
        </div>
    </div>
  )
}

export default HomePage