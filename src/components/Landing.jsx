import React, { useState, useEffect } from 'react';
import { getTrendingMovies, getImageUrl } from '../api';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const trending = await getTrendingMovies();
        if (trending && trending.length > 0) {
          setMovie(trending[0]);
        }
      } catch (error) {
        console.error("Failed to fetch hero movie:", error);
      }
    };
    fetchHero();
  }, []);

  if (!movie) return <div className="w-full h-[55vh] md:h-[65vh] bg-slate-950 animate-pulse rounded-md sm:smokey-edge" />;

  return (
    <section className="relative w-full h-[65vh] md:h-[75vh] lg:h-[85vh] overflow-hidden rounded-[3rem] bg-transparent shadow-[0_50px_100px_rgba(3,5,8,0.8)] smokey-edge light-sweep">
      {/* Cinematic Hero Backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')} 
          alt={movie.title || movie.name}
          className="h-full w-full object-cover object-top brightness-[0.7] contrast-[1.1] transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-[#030508]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030508] via-[#030508]/20 to-transparent" />
        <div className="volumetric-fog opacity-30" />
      </div>

      <div className="relative z-20 flex h-full items-end p-10 md:p-16 lg:p-24 pb-20">
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-12 glass-panel rounded-[3.5rem] shadow-2xl hover-z-axis transition-all duration-700">
          <div className="flex items-center gap-3 mb-6">
             <span className="inline-flex items-center px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.4em] text-sky-400 bg-sky-500/10 rounded-full ring-1 ring-sky-500/20 bloom-glow">
              Trending AAA
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter chromatic-aberration mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {movie.title || movie.name}
          </h1>
          
          <p className="mb-10 text-lg md:text-xl text-slate-300/90 leading-relaxed font-medium line-clamp-3 md:line-clamp-none max-w-2xl">
            {movie.overview}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <button 
              onClick={() => navigate(`/player/${movie.id}`)}
              className="flex items-center gap-4 bg-white text-black px-12 py-6 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-sky-400 hover:text-white transition-all shadow-xl shadow-sky-500/10 active:scale-95"
            >
              <span>▶</span> Play Now
            </button>
            <button className="flex items-center gap-4 bg-white/5 border border-white/10 text-white px-12 py-6 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
              <span>＋</span> Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
