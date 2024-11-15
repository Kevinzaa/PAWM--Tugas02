import { CirclePlay, Video } from 'lucide-react';
import React, { useState } from 'react';

function CourseContentSection({ courseInfo, onSelectChapter }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="p-4 bg-gradient-to-br from-gray-100 to-white rounded-lg mt-3 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Contents</h2>
      
      {courseInfo?.chapter.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-3 mb-2 rounded-lg 
          cursor-pointer transition-all duration-200 ease-in-out
          ${activeIndex === index ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          onClick={() => {
            setActiveIndex(index);
            onSelectChapter(item); // Set selected chapter when clicked
          }}
        >
          <span className="flex items-center text-[15px]">
            {index + 1}. {item.name}
          </span>
          
          <div className="flex items-center gap-2">
            {activeIndex === index ? (
              <CirclePlay className="h-5 w-5 animate-bounce" />
            ) : (
              <Video className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseContentSection;
