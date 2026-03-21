import { useCallback, useEffect, useState, useRef } from 'react'
import { getImageUrl } from './api'
import MovieModal from './MovieModal'

export default function MovieRow({ title, fetchMovies }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const scrollContainerRef = useRef(null);

  const scrollPrev = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -window.innerWidth * 0.7, behavior: 'smooth' });
    }
  }, []);

  const scrollNext = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: window.innerWidth * 0.7, behavior: 'smooth' });
    }
  }, []);

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchMovies();
      setMovies(data || []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [fetchMovies]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return (
    <div className="mb-8 relative group min-h-[220px]">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-slate-100 px-4 md:px-2">{title}</h2>
      
      {/* SKELETON LOADING UI */}
      {loading && (
        <div className="flex gap-4 px-4 md:px-2 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-none w-32 md:w-44">
              <div className="aspect-[2/3] rounded-lg bg-slate-800 animate-pulse mb-3 border border-slate-700/50"></div>
              <div className="h-4 bg-slate-800 animate-pulse rounded w-3/4 mb-1"></div>
              <div className="h-3 bg-slate-800/50 animate-pulse rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* ERROR UI */}
      {error && !loading && (
        <div className="py-8 px-4 flex flex-col items-center justify-center bg-slate-900/50 rounded-xl border border-red-900/30 mx-4 md:mx-2">
          <p className="text-slate-300 font-medium mb-4">We couldn't load these shows right now.</p>
          <button 
            onClick={loadMovies}
            className="text-sm bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-bold text-white transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* SUCCESS UI */}
      {!loading && !error && movies.length > 0 && (
        <div className="relative group/nav z-10 -mx-4 md:-mx-2 px-4 md:px-2">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 pb-4 overflow-x-auto custom-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {movies.map((movie) => (
              <div 
                key={movie.id} 
                className="flex-none w-36 md:w-56 lg:w-64 snap-start cursor-pointer group/card transition-all duration-300 hover:scale-[1.15] hover:z-40 relative"
                onClick={() => setSelectedMovie(movie)} // Opens modal
              >
                <div className="aspect-[2/3] rounded-lg overflow-hidden bg-slate-800 mb-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-transparent group-hover/card:border-slate-500/50 transition-all relative">
                  <img 
                    src={getImageUrl(movie.poster_path || movie.backdrop_path)} 
                    alt={movie.title || movie.name} 
                    className="w-full h-full object-cover relative z-0 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Smoke Gradient + Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4 pb-2 md:pb-3 pointer-events-none">
                    <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-1 drop-shadow-lg truncate">
                      {movie.title || movie.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold text-amber-500 mb-2 drop-shadow-md">
                      <span>★ {(movie.vote_average ? movie.vote_average.toFixed(1) : 0)}</span>
                      <span className="text-slate-300">• {movie.release_date?.substring(0,4)}</span>
                    </div>
                    <button className="bg-white/20 text-white w-full py-1 md:py-1.5 rounded text-[10px] md:text-xs font-bold transition-colors backdrop-blur-sm shadow-sm pointer-events-auto hover:bg-white hover:text-black">
                      Watch Now
                    </button>
                  </div>
                </div>
                <h3 className="text-xs md:text-sm font-medium text-slate-400 truncate px-1 opacity-100 group-hover/card:opacity-0 transition-opacity duration-200" title={movie.title || movie.name}>
                  {movie.title || movie.name}
                </h3>
              </div>
            ))}
          </div>

          <button onClick={scrollPrev} className="absolute left-0 lg:-left-6 top-[40%] md:top-[45%] -translate-y-1/2 bg-black/80 hover:bg-black text-white p-3 md:p-4 rounded-full opacity-0 group-hover/nav:opacity-100 transition-opacity z-30 cursor-pointer hidden md:flex items-center justify-center shadow-xl ring-1 ring-white/10 hover:scale-110">
            <svg xmlns="http://www.w3.org/w/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          
          <button onClick={scrollNext} className="absolute right-0 lg:-right-6 top-[40%] md:top-[45%] -translate-y-1/2 bg-black/80 hover:bg-black text-white p-3 md:p-4 rounded-full opacity-0 group-hover/nav:opacity-100 transition-opacity z-30 cursor-pointer hidden md:flex items-center justify-center shadow-xl ring-1 ring-white/10 hover:scale-110">
            <svg xmlns="http://www.w3.org/w/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      )}

      {/* MODAL POPUP */}
      {selectedMovie && <MovieModal movie={selectedMovie} allMovies={movies} onClose={() => setSelectedMovie(null)} />}
    </div>
  )
}
