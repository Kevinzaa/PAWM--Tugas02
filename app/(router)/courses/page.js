"use client"

import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
import SideBanner from './_components/SideBanner'

function Courses() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 p-6'>
        <div className='col-span-3 space-y-8'>
          
          {/* Welcome Banner */}
          <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-500 rounded-lg shadow-lg text-white">
            <WelcomeBanner/>
          </div>

          {/* Course List Section */}
          <div className="p-6 bg-white rounded-lg shadow-lg border border-indigo-300">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Available Courses</h2>
            <CourseList/>
          </div>
        </div>

        {/* Side Banner */}
        <div className=''>
          <SideBanner/>
        </div>
    </div>
  )
}

export default Courses
