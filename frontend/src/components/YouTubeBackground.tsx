import React from 'react';
import YouTube from 'react-youtube';

interface YouTubeBackgroundProps {
  videoId: string;
  opacity?: number;
}

const YouTubeBackground: React.FC<YouTubeBackgroundProps> = ({ videoId, opacity = 0.4 }) => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      controls: 0,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playlist: videoId, // For looping
    },
  };

  return (
    <div className="youtube-background" style={{ opacity }}>
      <YouTube
        videoId={videoId}
        opts={opts}
        className="youtube-player"
        onReady={(event) => {
          event.target.playVideo();
        }}
      />
      <div className="youtube-overlay"></div>
    </div>
  );
};

export default YouTubeBackground;