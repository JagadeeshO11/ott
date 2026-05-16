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
    <section className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden rounded-md bg-transparent shadow-[0_35px_80px_rgba(15,23,42,0.45)] smokey-edge">
      <img
        src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
        alt={movie.title || movie.name}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.2),transparent_24%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-transparent" />
      <div className="relative z-20 flex h-full items-end p-6 md:p-12">
        <div className="w-full md:w-2/3 lg:w-1/2 rounded-md p-8 shadow-2xl smokey-edge smokey-border hover-z-axis">
          <span className="inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-sky-100 bg-sky-500/15 rounded-full shadow-sm shadow-sky-500/10 mb-4">
            TRENDING NOW
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-white tracking-tight drop-shadow-lg">
            {movie.title || movie.name}
          </h1>
          <p className="text-slate-200 mb-8 text-sm md:text-base font-medium leading-relaxed line-clamp-3 drop-shadow">
            {movie.overview}
          </p>
          <button 
            onClick={() => navigate(`/player/${movie.id}`)}
            className="inline-flex items-center gap-3 rounded-full bg-sky-400/95 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-300 active:scale-95"
          >
            Play Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
