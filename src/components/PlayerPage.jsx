import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={() => navigate(-1)}
          className="text-white hover:text-sky-400 transition flex items-center gap-2 font-semibold"
        >
          <span className="text-2xl">←</span> Back
        </button>
        <div className="text-white text-sm tracking-widest uppercase opacity-70">
          Now Playing
        </div>
      </div>
      
      {/* Placeholder for Video Player */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center text-slate-500 flex-col gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xl tracking-wide">Video Player Placeholder</p>
          <p className="text-sm opacity-60">Movie ID: {id}</p>
        </div>
        
        {/* Custom Controls Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-4">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden hover:h-2 transition-all">
            <div className="h-full bg-sky-500 w-1/3 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]"></div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center gap-6">
              <button className="hover:text-sky-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div className="flex gap-4">
                <button className="hover:text-sky-400 transition opacity-80 hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                  </svg>
                </button>
                <button className="hover:text-sky-400 transition opacity-80 hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z" />
                  </svg>
                </button>
              </div>
              <div className="text-sm font-medium tracking-wide opacity-80">
                24:12 <span className="opacity-50 mx-1">/</span> 2:15:00
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <button className="hover:text-sky-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
              <button className="hover:text-sky-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
