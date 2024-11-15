import React from 'react';
import Image from 'next/image';

function CourseItem({ course }) {

  return (
    <div className="w-full max-w-xs rounded-xl overflow-hidden shadow-lg border mt-3 hover:shadow hover:shadow-indigo-900 cursor-pointer mx-auto
    border-indigo-300">
      {/* Gambar */}
      <div className="relative w-full h-48">
        <Image 
          src={course?.banner?.url || '/placeholder.png'}
          layout="fill"
          objectFit="cover"
          alt='banner'
          className=''
        />
      </div>

      {/* Teks di bawah gambar */}
      <div className="p-4 bg-white flex flex-col gap-1">
        <h2 className="text-lg font-bold text-gray-900">{course.name}</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Image
            src="/youtube.png"
            alt="YouTube Logo"
            width={16}
            height={16}
          />
          <p>Watch on YouTube</p>
        </div>
      </div>
    </div>
  );
}

export default CourseItem;
