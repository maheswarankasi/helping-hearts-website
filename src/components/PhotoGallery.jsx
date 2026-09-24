"use client";

import { useCallback, useEffect, useState } from 'react';
import SmartImage from './SmartImage';

/**
 * Grid of uploaded photos with a simple lightbox. Used on the event and
 * shelter details pages.
 */
export default function PhotoGallery({ images, title = 'Photo Gallery', alt }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (delta) =>
      setActiveIndex((current) => {
        if (current === null) return current;
        return (current + delta + images.length) % images.length;
      }),
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add('modal-open');
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, close, step]);

  if (images.length === 0) return null;

  return (
    <div>
      <h2 className="font-heading text-3xl font-black text-gray-900 mb-2">
        {title}
      </h2>
      <div className="w-16 h-2 bg-brand-red rounded-full mb-8"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open photo ${index + 1} of ${images.length}`}
            className="group relative h-40 md:h-52 overflow-hidden rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-shadow cursor-zoom-in"
          >
            <SmartImage
              src={src}
              alt={`${alt} photo ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 300px"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <span className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/30 transition-colors flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
              <i className="fa-solid fa-magnifying-glass-plus text-2xl"></i>
            </span>
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <div
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
            onClick={close}
          ></div>

          <button
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/90 text-gray-800 hover:bg-brand-red hover:text-white transition flex items-center justify-center shadow-lg"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-4 md:left-8 z-10 w-11 h-11 rounded-full bg-white/90 text-gray-800 hover:bg-brand-blue hover:text-white transition flex items-center justify-center shadow-lg"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-4 md:right-8 z-10 w-11 h-11 rounded-full bg-white/90 text-gray-800 hover:bg-brand-blue hover:text-white transition flex items-center justify-center shadow-lg"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </>
          )}

          <figure className="relative z-[5] w-[90%] max-w-4xl">
            <div className="relative w-full h-[80vh]">
              <SmartImage
                src={images[activeIndex]}
                alt={`${alt} photo ${activeIndex + 1}`}
                fill
                priority
                sizes="90vw"
                className="object-contain rounded-[2rem] drop-shadow-2xl"
              />
            </div>
            <figcaption className="text-center text-white/80 text-sm mt-4 font-medium">
              {activeIndex + 1} / {images.length}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
