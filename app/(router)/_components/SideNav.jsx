import { useUser } from '@clerk/nextjs';
import { BadgeIcon, BookOpen, Contact, LayoutDashboard, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function SideNav({ toggleSidebar }) {
    const { user } = useUser();
    const path = usePathname();

    const menu = [
        { id: 4, name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', auth: true },
        { id: 1, name: 'All Courses', icon: BookOpen, path: '/courses', auth: false },
        { id: 3, name: 'Contact', icon: Contact, path: '/contact', auth: false },
    ];

    return (
        <div className="p-5 bg-white shadow-sm border h-screen w-64 fixed overflow-auto">
            <div className="flex justify-between items-center mb-4 sm:hidden">
                <img src="/logo.svg" alt="logo" width={50} height={50} />
                <button onClick={toggleSidebar} className="p-2">
                    <X className="h-6 w-6 text-gray-600" />
                </button>
            </div>

            <div className="flex justify-center mb-4 sm:flex hidden">
                <img src="/logo.svg" alt="logo" width={80} height={80} />
            </div>

            <hr className="mt-7" />

            <div className="mt-5">
                {menu
                    .filter((item) => !item.auth || (item.auth && user))
                    .map((item) => (
                        <Link href={item.path} key={item.id}>
                            <div
                                className={`group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-600 cursor-pointer hover:bg-primary hover:text-white rounded-md transition-all ease-out duration-100 ${
                                    path.includes(item.path) && 'bg-primary text-white'
                                }`}
                            >
                                <item.icon className="group-hover:animate-pulse" />
                                <h2 className="group-hover:animate-pulse">{item.name}</h2>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

export default SideNav;
