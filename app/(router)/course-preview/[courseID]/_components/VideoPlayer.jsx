import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Play } from 'lucide-react';

function VideoPlayer({ videoUrl, thumbnailUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="video-wrapper">
      {!isPlaying ? (
        <div
          className="thumbnail"
          onClick={() => setIsPlaying(true)}
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
          }}
        >
          <Play className="play-button" />
        </div>
      ) : (
        <div className="player-wrapper">
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls
            playing={isPlaying}
          />
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
