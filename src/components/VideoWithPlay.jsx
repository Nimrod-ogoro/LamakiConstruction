import { useState, useRef } from "react";
import { Play } from "lucide-react";
import "./VideoWithPlay.css";

export default function VideoWithPlay({ src, poster, className = "", onClick }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const vidRef = useRef(null);

  /*  accept query-params  */
  const isVideo = () => /\.(mp4|webm|ogg|m3u8|mov)(\?.*)?$/i.test(src.trim());

  const handleClick = (e) => {
    e.stopPropagation();
    if (!showPlayer && isVideo()) {
      setShowPlayer(true);
      setTimeout(() => vidRef.current?.play(), 0);
      return;
    }
    onClick?.(e);
  };

  return (
    <div className={`video-wrapper ${className}`} onClick={handleClick}>
      {!showPlayer ? (
        <>
          <img src={poster || src} alt="project" loading="lazy" />
          {isVideo() && (
            <div className="play-icon">
              <Play size={48} color="#fff" />
            </div>
          )}
        </>
      ) : (
        <video
          ref={vidRef}
          src={src}
          poster={poster}
          controls
          muted
          loop
          playsInline
        />
      )}
    </div>
  );
}