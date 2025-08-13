import React, { useEffect, useRef, useState } from 'react';
import Button from './ui/Button';
import { GoArrowRight } from "react-icons/go";
import { IoCallOutline } from "react-icons/io5";

const Hero = () => {
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.onended = () => {
        setShowVideo(false);

        // Replay video after 5 seconds
        setTimeout(() => {
          setShowVideo(true);
          videoElement.play();
        }, 5000);
      };
    }
  }, []);

  return (
    <section className='home'>
      <div className="fade-dark-container">
        {showVideo ? (
          <video
            ref={videoRef}
            className="fade-video"
            src="/REEL.mp4"
            autoPlay
            muted
            playsInline
          />
        ) : (
          <img
            src="hero.png.png"
            alt="Background"
            className="fade-image"
          />
        )}
      </div>

      {/* Hero Content */}
      <div className='hero-content'>
        <h1 className='hero-title'>Building Your</h1>
        <p className='gradient-text'>Dreams Into Reality</p>
        <p className='hero-subtitle'>
          Professional construction services for residential and commercial projects.<br/>
          From concept to completion, we deliver quality craftsmanship that lasts.
        </p>
        <Button className="hero-btn-1">
          Get Free Quote 
          <GoArrowRight className='hero-icon-1' />
        </Button>
        <Button className="hero-btn-2">
          <IoCallOutline className='hero-icon-2' />
          (+254) 113710584
        </Button>
      </div>
    </section>
  );
};

export default Hero;

