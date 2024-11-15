"use client";

import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import { BellDot, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function Header({ toggleSidebar }) {
  const { user, isLoaded } = useUser();

  return (
    <div className='p-4 bg-white flex items-center justify-between'>
      <button onClick={toggleSidebar} className="sm:hidden p-2">
        <Menu className="h-6 w-6" />
      </button>

      <div className='flex items-center gap-4 flex-grow max-w-md'>
        <div className='flex gap-2 rounded-md border p-2 flex-grow'>
          <Search className='h-5 w-5' />
          <input
            type="text"
            placeholder='Search..'
            className='outline-none w-full'
          />
        </div>
        <BellDot className='text-gray-600 mr-4' />
      </div>

      <div className='flex items-center'>
        {isLoaded && user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href={'/sign-in'}>
            <Button>Get started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
