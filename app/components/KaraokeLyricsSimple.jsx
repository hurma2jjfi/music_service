"use client";

import React, { useEffect, useRef, useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';


export default function KaraokeLyricsSync({
  trackId,
  audioSrc,
  trackTitle = "",
  artistName = "",
}) {
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [lyrics, setLyrics] = useState([]); // {time:number, text:string}
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const activeLineRef = useRef(null);

  useEffect(() => {
    async function fetchLyrics() {
      const res = await fetch(`/api/lyrics/${trackId}`);
      const data = await res.json();

      if (Array.isArray(data.lyrics)) {
        setLyrics(data.lyrics);
      } else if (typeof data.lyrics === "string") {
        const splitted = data.lyrics.split("\n").filter((l) => l.trim());
        const defaultDuration = audioRef.current?.duration || 180;
        const step = defaultDuration / splitted.length;
        const timed = splitted.map((text, i) => ({ time: i * step, text }));
        setLyrics(timed);
      }
      setCurrentLineIndex(0);
    }
    fetchLyrics();
  }, [trackId]);

  useEffect(() => {
    if (!containerRef.current || !activeLineRef.current) return;
    const container = containerRef.current;
    const activeLine = activeLineRef.current;
    const containerHeight = container.clientHeight;
    const scrollOffset =
      activeLine.offsetTop -
      container.offsetTop -
      containerHeight / 2 +
      activeLine.clientHeight / 2;
    container.scrollTo({
      top: scrollOffset,
      behavior: "smooth",
    });
  }, [currentLineIndex, isLyricsOpen]);

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    const curTime = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 1;

    setCurrentTime(curTime);
    setDuration(dur);
    setProgressPercent((curTime / dur) * 100);

    const activeIdx = lyrics.reduce((acc, item, i) => (item.time <= curTime ? i : acc), 0);
    if (activeIdx !== currentLineIndex) setCurrentLineIndex(activeIdx);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
  };

  const onPlay = () => setIsPlaying(true);
  const onPause = () => setIsPlaying(false);

  const onSeek = (e) => {
    if (!audioRef.current) return;
    const val = parseFloat(e.target.value);
    const newTime = (val / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgressPercent(val);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const toggleLyrics = () => setIsLyricsOpen((v) => !v);

  return (
    <div className="karaoke">
      {(trackTitle || artistName) && (
        <div className="karaoke__header">
          <h2 className="karaoke__title">{trackTitle}</h2>
          {artistName && <p className="karaoke__artist">{artistName}</p>}
        </div>
      )}

      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={onTimeUpdate}
        onPlay={onPlay}
        onPause={onPause}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        hidden
      />

      <div className="karaoke__player">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="player__button"
        >
          {isPlaying ? (
           <StopIcon />
          ) : (
            <PlayArrowIcon />
          )}
        </button>

        <span className="player__time player__time--current">{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progressPercent}
          onChange={onSeek}
          className="player__range"
          style={{ "--progress-percent": `${progressPercent}%` }}
        />

        <span className="player__time player__time--duration">{formatTime(duration)}</span>
      </div>

      <button
        onClick={toggleLyrics}
        aria-expanded={isLyricsOpen}
        className="karaoke__toggle"
      >
        {isPlaying && (
          <span className="karaoke__bars" aria-hidden="true">
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar3"></span>
          </span>
        )}
        {isLyricsOpen ? "Скрыть текст песни..." : "Показать текст песни..."}
      </button>

      <div
  ref={containerRef}
  aria-label="Lyrics"
  className={`karaoke__lyrics ${isLyricsOpen ? "karaoke__lyrics--open" : ""}`}
  style={{ maxHeight: isLyricsOpen ? '420px' : '0', overflowY: isLyricsOpen ? 'auto' : 'hidden', transition: 'max-height 0.5s ease-in-out' }}
>
 

        {lyrics.length === 0 ? (
          <p className="karaoke__no-lyrics">Текст отсутствует</p>
        ) : (
          lyrics.map((line, i) => (
            <p
              key={i}
              ref={i === currentLineIndex ? activeLineRef : null}
              className={`karaoke__line ${
                i === currentLineIndex ? "karaoke__line--active" : ""
              }`}
            >
              {line.text}
              {i === currentLineIndex && <span className="caret" />}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
