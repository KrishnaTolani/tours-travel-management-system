import React, { useState, useEffect } from 'react';
import YouTubeBackground from './YouTubeBackground';

const MultiVideoBackground: React.FC = () => {
  const videoIds = [
    'YOUR_VIDEO_ID_1', // Replace with your actual video IDs
    'YOUR_VIDEO_ID_2',
    'YOUR_VIDEO_ID_3'
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoIds.length);
    }, 30000); // Change video every 30 seconds

    return () => clearInterval(interval);
  }, [videoIds.length]);

  return (
    <YouTubeBackground 
      videoId={videoIds[currentVideoIndex]} 
      opacity={0.4} 
    />
  );
};

export default MultiVideoBackground;