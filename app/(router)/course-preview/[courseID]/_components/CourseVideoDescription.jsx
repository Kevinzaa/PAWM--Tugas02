import React from 'react';
import VideoPlayer from './VideoPlayer';

function CourseVideoDescription({ courseInfo, selectedChapter }) {
  return (
    <div>
      <h2 className='text-[20px] font-semibold mb-5'>{selectedChapter?.name || courseInfo.name}</h2>
      <VideoPlayer videoUrl={selectedChapter?.youtubeUrl || courseInfo?.chapter[0]?.youtubeUrl} thumbnailUrl={courseInfo?.banner?.url} />
      <h2 className='text-gray-500 text-[14px] mb- mt-5 text-justify'>{selectedChapter?.description || courseInfo.description}</h2>
    </div>
  );
}

export default CourseVideoDescription;
