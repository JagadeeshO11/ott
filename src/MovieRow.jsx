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
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 text-slate-100 px-4 md:px-12 lg:px-16">{title}</h2>
      
      {/* SKELETON LOADING UI */}
      {loading && (
        <div className="flex gap-4 px-4 md:px-12 lg:px-16 overflow-hidden">
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
        <div className="relative group/nav z-10">
          <div 
            ref={scrollContainerRef}
            // Interior padded layout area avoids clipping absolute popouts while seamlessly scrolling past edges
            className="flex gap-4 pt-2 pb-14 md:pb-24 px-4 md:px-12 lg:px-16 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            {movies.map((movie) => (
              <div 
                key={movie.id} 
                className="flex-none w-36 md:w-56 lg:w-64 snap-start cursor-pointer group/card relative"
                onClick={() => setSelectedMovie(movie)} // Opens modal
              >
                {/* 1. Standard Poster (Remains visually static) */}
                <div className="aspect-[2/3] rounded-md overflow-hidden bg-slate-800 shadow-md transition-opacity duration-300 group-hover/card:opacity-0 relative">
                  <img 
                    src={getImageUrl(movie.poster_path)} 
                    alt={movie.title || movie.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <h3 className="text-xs md:text-sm font-medium text-slate-400 truncate px-1 mt-2 opacity-100 group-hover/card:opacity-0 transition-opacity duration-200" title={movie.title || movie.name}>
                  {movie.title || movie.name}
                </h3>

                {/* 2. Hotstar/Netflix Popout Hover Card (Massive Popout Scale) */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] aspect-square bg-[#0f172a] rounded-xl shadow-[0_25px_65px_rgba(0,0,0,0.95)] opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible z-[100] flex flex-col overflow-hidden border border-slate-700/50 transition-all duration-300 transform scale-90 group-hover/card:scale-100 delay-[150ms]">
                  
                  {/* Backdrop Image Header */}
                  <div className="relative w-full h-[45%] bg-slate-800 flex-shrink-0">
                    <img 
                      src={getImageUrl(movie.backdrop_path || movie.poster_path)} 
                      className="w-full h-full object-cover" 
                      alt="Backdrop"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
                  </div>

                  {/* Content Body */}
                  <div className="p-3 md:p-4 flex-1 flex flex-col justify-between bg-[#0f172a]">
                    <div className="flex-1">
                      <h4 className="text-white font-[700] text-sm md:text-base leading-tight line-clamp-1">{movie.title || movie.name}</h4>
                      <div className="flex items-center gap-2 mt-1.5 md:mt-2">
                        <span className="text-emerald-400 text-[10px] md:text-[11px] font-bold bg-white/10 px-1.5 py-0.5 rounded-[4px]">★ {movie.vote_average?.toFixed(1) || 0}</span>
                        <span className="text-slate-400 text-[10px] md:text-[11px] font-semibold">{movie.release_date?.substring(0,4)}</span>
                      </div>
                      <p className="text-slate-300/80 text-[10px] md:text-[11px] font-[500] line-clamp-3 mt-2 md:mt-3 leading-relaxed">
                        {movie.overview || "No description available."}
                      </p>
                    </div>

                    <button className="w-full bg-white hover:bg-slate-200 text-slate-900 font-bold py-1.5 md:py-2 rounded-[4px] text-[10px] md:text-sm flex items-center justify-center gap-2 transition-colors mt-2 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-3 md:w-3.5 h-3 md:h-3.5"><path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" /></svg>
                      Watch Trailer
                    </button>
                  </div>
                </div>

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
