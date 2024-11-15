"use client";

import React, { useEffect, useState } from 'react';
import SideBanner from '../courses/_components/SideBanner';
import { useUser } from '@clerk/nextjs';

function Dashboard() {
  const { user } = useUser();
  const [assignmentCount, setAssignmentCount] = useState(0);

  // Function to handle assignment count update from SideBanner
  const handleAssignmentCount = (count) => {
    setAssignmentCount(count);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
      {/* Main Content Section */}
      <div className="col-span-3 space-y-8">
        {/* Header Section */}
        <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-lg shadow-lg text-white">
          <h2 className="text-3xl font-bold">Halo, {user ? user.firstName : 'User'}</h2>
          <p className="text-sm text-blue-200 mt-2">
            Selamat datang ke halaman dashboard, berikut adalah quick review progress belajarmu!.
          </p>
        </div>

        {/* Assignment Count Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Assignment Count Card */}
          <div className="p-6 bg-white rounded-lg shadow-lg border border-indigo-300 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-semibold text-blue-700">Assignments</h3>
            <p className="text-5xl font-bold text-blue-600 mt-2">{assignmentCount}</p>
            <p className="text-sm text-gray-500 mt-1">Assignments available</p>
          </div>

          {/* Progress Circle */}
          <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-indigo-300 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-semibold text-blue-700">Progress</h3>
            <div className="relative w-24 h-24 mt-4">
              <svg className="w-full h-full">
                <circle cx="50" cy="50" r="40" stroke="gray" strokeWidth="5" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="blue"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="251.2" // Full circumference for a circle with r=40
                  strokeDashoffset={251.2 - (assignmentCount * 25.12)} // Adjust offset based on assignment count
                  className="transition-all duration-500 ease-in-out"
                />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-600">
                {Math.min(assignmentCount * 10, 100)}%
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-1">Overall completion</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="p-6 bg-white rounded-lg shadow-lg p-6 bg-white rounded-lg shadow-md border border-indigo-300 flex flex-col">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">Recent Activities</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-600">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">+</span>
              </div>
              <p>Added new assignment: "Tugas02 - Pengembangan Aplikasi Web dan Mobile"</p>
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">✏️</span>
              </div>
              <p>Updated deadline for "Tugas Besar - Layanan Sistem dan Teknologi Informasi"</p>
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">✓</span>
              </div>
              <p>On proggress "UTS - Pengembangan Aplikasi Web dan Mobile"</p>
            </li>
          </ul>
        </div>

        {/* Motivational Quote */}
        <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-lg shadow-lg text-white">
          <p className="text-center text-xl font-semibold text-white italic">
            “Success is not final, failure is not fatal: It is the courage to continue that counts.” 
          </p>
          <p className="text-right mt-2 text-white">- Winston Churchill</p>
        </div>
      </div>

      {/* Side Banner - Always on the right side */}
      <div className="col-span-1">
        <SideBanner onAssignmentCountUpdate={handleAssignmentCount} />
      </div>
    </div>
  );
}

export default Dashboard;
