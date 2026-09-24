"use client";

import { useState } from 'react';
import SmartImage from './SmartImage';

/**
 * Click-to-play YouTube facade.
 *
 * Embedding an <iframe> directly pulls roughly half a megabyte of YouTube
 * player JavaScript into every home page visit, whether or not anyone
 * watches. This shows the poster frame instead and only mounts the iframe
 * once the visitor actually clicks play.
 */
export default function VideoEmbed({ youtubeId, title }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group absolute inset-0 w-full h-full cursor-pointer"
    >
      <SmartImage
        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 900px"
        className="object-cover"
      />
      <span className="absolute inset-0 bg-gray-900/25 group-hover:bg-gray-900/10 transition-colors"></span>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-20 h-20 rounded-full bg-brand-red text-white flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 transition-transform">
          <i className="fa-solid fa-play ml-1"></i>
        </span>
      </span>
    </button>
  );
}
