"use client";

import React, { useState } from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      {/* Sidebar Navigation */}
      <div className={`fixed ${isSidebarOpen ? 'block' : 'hidden'} sm:block sm:w-64`}>
        <SideNav toggleSidebar={() => setIsSidebarOpen(false)} /> 
      </div>
      <div className={`sm:ml-64 ${isSidebarOpen ? 'ml-0' : 'ml-0'} sm:ml-64`}>
        {/* Header */}
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Main Content */}
        {children}
      </div>
    </div>
  );
}

export default Layout;
