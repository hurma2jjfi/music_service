"use client";

import React, { useState } from "react";

export default function CustomAudioPlayer({ src, audioRef, onTimeUpdate, onPlayPause }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef?.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const onPlay = () => {
    setIsPlaying(true);
    onPlayPause?.(true);
  };
  const onPause = () => {
    setIsPlaying(false);
    onPlayPause?.(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-md flex flex-col space-y-2">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onPlay={onPlay}
        onPause={onPause}
        hidden
      />

      <button
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center text-white transition"
      >
        {isPlaying ? (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        )}
      </button>
    </div>
  );
}
