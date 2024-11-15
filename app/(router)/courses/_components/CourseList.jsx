"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import CourseItem from './CourseItem';
import GlobalApi from '@/app/_utils/GlobalApi';
import Link from 'next/link';

function CourseList() {
    const { user } = useUser();
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        getAllCourses();
    }, []);

    const getAllCourses = () => {
        GlobalApi.getAllCourseList().then(resp => {
            setCourseList(resp?.courseLists);
        });
    };

    return (
        <div className='p-5 bg-white rounded-lg mt-2'>
            <div className='flex items-center justify-between'>
                <h2 className='text-[20px] font-bold text-primary'>All courses</h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                {courseList.map((item, index) => (
                    <Link href={user ? `/course-preview/${item.slug}` : "/sign-in"} key={index}>
                        <div>
                            <CourseItem course={item} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CourseList;
