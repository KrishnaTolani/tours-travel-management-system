import React from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
  opacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl, opacity = 0.3 }) => {
  return (
    <div className="video-background">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="video-background-element"
        style={{ opacity }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>
    </div>
  );
};

export default VideoBackground;