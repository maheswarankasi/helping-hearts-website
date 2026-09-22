"use client";

import { useEffect, useState } from 'react';

export default function EventModal({ event, onClose }) {
  const [isEntered, setIsEntered] = useState(false);

  // Trigger the scale-in on the frame after mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Lock page scroll while open and close on Escape
  useEffect(() => {
    document.body.classList.add('modal-open');
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className={`relative bg-white rounded-[2rem] w-[90%] max-w-2xl shadow-2xl overflow-hidden transform transition-all duration-300 max-h-[90vh] overflow-y-auto ${
          isEntered ? 'scale-100' : 'scale-95'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-10 h-10 bg-white/50 backdrop-blur rounded-full flex items-center justify-center text-gray-800 hover:bg-brand-red hover:text-white transition z-10 shadow"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <h3
            id="event-modal-title"
            className="font-heading text-3xl font-bold text-brand-blue mb-4"
          >
            {event.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{event.description}</p>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
