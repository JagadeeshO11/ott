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
    <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden rounded-[3.5rem] bg-[#050816] shadow-[0_60px_120px_rgba(3,5,8,0.9)] light-sweep">
      {/* Cinematic Hero Environment */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')} 
          alt={movie.title || movie.name}
          className="h-full w-full object-cover object-top brightness-[0.75] contrast-[1.15] animate-drift"
        />
        {/* Layered Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,8,22,0.5)_100%)]" />
        <div className="volumetric-fog opacity-40" />
      </div>

      <div className="relative z-20 flex h-full items-end p-12 md:p-20 lg:p-32 pb-24">
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-14 glass-panel rounded-[4rem] shadow-2xl hover-z-axis transition-all duration-1000 ease-[var(--transition-cinematic)]">
          <div className="flex items-center gap-4 mb-8">
             <span className="inline-flex items-center px-5 py-2 text-[10px] font-black uppercase tracking-[0.5em] text-sky-400 bg-sky-500/10 rounded-full ring-1 ring-sky-400/30 bloom-glow">
              Premier Cinematic
            </span>
            <span className="text-slate-500 text-[10px] font-bold tracking-[0.3em]">IMAX® ENHANCED</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter mb-8 drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)] chromatic-aberration">
            {movie.title || movie.name}
          </h1>
          
          <p className="mb-12 text-xl md:text-2xl text-slate-300/85 leading-relaxed font-medium line-clamp-3 max-w-3xl drop-shadow-md">
            {movie.overview}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={() => navigate(`/player/${movie.id}`)}
              className="group relative flex items-center gap-5 bg-white text-black px-14 py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-sky-400 hover:text-white transition-all duration-500 shadow-2xl active:scale-95"
            >
              <span className="text-xl transition-transform duration-500 group-hover:scale-125">▶</span> 
              <span>Start Experience</span>
            </button>
            <button className="flex items-center gap-5 bg-white/5 border border-white/10 text-white px-14 py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-white/15 transition-all duration-500 active:scale-95 backdrop-blur-xl">
              <span>＋</span> Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
