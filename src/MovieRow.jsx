import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { getImageUrl } from './api'
import MovieModal from './MovieModal'

export default function MovieRow({ title, fetchMovies }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps'
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

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
        <>
          <div className="overflow-hidden px-4 md:px-2" ref={emblaRef}>
            <div className="flex gap-4 cursor-grab active:cursor-grabbing">
              {movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="flex-none w-32 md:w-44"
                  onClick={() => setSelectedMovie(movie)} // Opens modal
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-slate-800 mb-3 shadow-md border border-slate-800 hover:border-slate-400 focus-within:ring-2 focus-within:ring-slate-400 transition-all relative">
                    <img 
                      src={getImageUrl(movie.poster_path || movie.backdrop_path)} 
                      alt={movie.title || movie.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-slate-300 hover:text-white truncate transition-colors px-1" title={movie.title || movie.name}>
                    {movie.title || movie.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <button onClick={scrollPrev} className="absolute left-0 lg:-left-4 top-[55%] mt-4 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer hidden md:flex items-center justify-center">
            <svg xmlns="http://www.w3.org/w/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          
          <button onClick={scrollNext} className="absolute right-0 lg:-right-4 top-[55%] mt-4 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer hidden md:flex items-center justify-center">
            <svg xmlns="http://www.w3.org/w/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </>
      )}

      {/* MODAL POPUP */}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  )
}
