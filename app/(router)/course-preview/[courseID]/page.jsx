"use client"

import React, { useEffect, useState } from 'react'
import CourseVideoDescription from './_components/CourseVideoDescription';
import GlobalApi from '@/app/_utils/GlobalApi';
import CourseContentSection from './_components/CourseContentSection';
import MiniDashboard from './_components/MiniDashboard';
import InteractiveSection from './_components/InteractiveSection';
import InteractiveMoleculeSection from './_components/MoleculeSection';

function CoursePreview(params) {
    
    const [courseInfo, setCourseInfo] = useState();
    const [selectedChapter, setSelectedChapter] = useState(null);

    useEffect(() => {
        params && getCourseInfoByID();
    }, [params]);

    const getCourseInfoByID = () => {
        GlobalApi.getCourseById(params?.courseId).then(resp => {
            console.log(resp);
            setCourseInfo(resp?.courseList);
            setSelectedChapter(resp?.courseList?.chapter[0]);
        });
    };

    return courseInfo && (
        <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
            {/* Video Section */}
            <div className='col-span-2 bg-white p-3'>
                <CourseVideoDescription courseInfo={courseInfo} selectedChapter={selectedChapter} />
                <InteractiveSection/>
                <InteractiveMoleculeSection/>
            </div>

            {/* Content Section */}
            <div>
                <MiniDashboard/>
                <CourseContentSection courseInfo={courseInfo} onSelectChapter={setSelectedChapter} />
            </div>
        </div>
    );
}

export default CoursePreview;
