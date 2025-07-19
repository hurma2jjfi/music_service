"use client";

import React, { useEffect, useState } from "react";
import KaraokeLyricsSimple from "./components/KaraokeLyricsSimple";

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tracks")
      .then((res) => res.json())
      .then((data) => {
        setTracks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки треков", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-lg">Загрузка треков...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Music:</h1>
      {tracks.length === 0 ? (
        <p>Треков не найдено</p>
      ) : (
        <ul className="space-y-8">
          {tracks.map((track) => (
            <li key={track.id} className="p-4 border rounded shadow-sm flex space-x-4 items-start">
              {/* Обложка трека */}
              {track.cover_url ? (
                <img
                  src={track.cover_url.startsWith("http") ? track.cover_url : `/${track.cover_url}`}
                  alt={`Обложка - ${track.title}`}
                  className="w-32 h-32 object-cover rounded"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-xs">
                  Нет обложки
                </div>
              )}

              {/* Информация о треке и плеер */}
              <div className="flex-1">
                {/* Плеер / караоке */}
                {track.audio_url && (
                  <KaraokeLyricsSimple
                    trackId={track.id}
                    audioSrc={track.audio_url}
                    coverUrl={track.cover_url}
                    trackTitle={track.title}
                    artistName={track.artist_name}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
