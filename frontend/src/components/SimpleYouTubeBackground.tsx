import React from 'react';

interface SimpleYouTubeBackgroundProps {
  videoId: string;
  opacity?: number;
}

const SimpleYouTubeBackground: React.FC<SimpleYouTubeBackgroundProps> = ({ 
  videoId, 
  opacity = 0.4 
}) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playlist=${videoId}`;

  return (
    <div className="youtube-background" style={{ opacity }}>
      <iframe
        src={embedUrl}
        className="youtube-player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Background Video"
      />
      <div className="youtube-overlay"></div>
    </div>
  );
};

export default SimpleYouTubeBackground;