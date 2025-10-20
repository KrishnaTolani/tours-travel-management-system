import React, { useState, useEffect } from 'react';

interface AirplaneLoaderProps {
  onLoadingComplete: () => void;
}

const AirplaneLoader: React.FC<AirplaneLoaderProps> = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onLoadingComplete, 300);
  };

  const handleVideoEnd = () => {
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 500);
    }, 1000);
  };

  useEffect(() => {
    // Auto-skip after 30 seconds as fallback
    const fallbackTimer = setTimeout(handleSkip, 30000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  if (!isVisible) return null;

  const embedUrl = `https://www.youtube.com/embed/rSvZn-Vmfyc?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&loop=0&end=30`;

  return (
    <div className="video-intro-fullscreen">
      <iframe
        src={embedUrl}
        className="fullscreen-video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Intro Video"
        onLoad={() => {
          // Auto-advance after video duration
          setTimeout(handleVideoEnd, 25000);
        }}
      />
      <button className="skip-button-enhanced" onClick={handleSkip}>
        Skip ⏭️
      </button>
      <div className="intro-overlay">
        <div className="intro-text-enhanced">
          <h1>Tours & Travel</h1>
          <p>Experience the Journey of a Lifetime</p>
        </div>
      </div>
    </div>
  );
};

export default AirplaneLoader;