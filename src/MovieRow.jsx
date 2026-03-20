import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { getImageUrl } from './api'

export default function MovieRow({ title, fetchMovies }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps'
  })

  // Navigation Buttons
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  // Data fetching
  useEffect(() => {
    let isMounted = true;
    
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovies();
        if (isMounted) setMovies(data || []);
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    loadMovies();
    return () => { isMounted = false; };
  }, [fetchMovies]);

  return (
    <div className="mb-8 relative group min-h-[200px]">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-slate-100 px-4 md:px-2">{title}</h2>
      
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12 px-4">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="py-10 px-4 flex flex-col items-center text-center">
          <p className="text-red-500 font-medium mb-2">Failed to load movies.</p>
          <button 
            onClick={() => { setLoading(true); setError(false); fetchMovies().then(d => setMovies(d||[])).catch(()=>setError(true)).finally(()=>setLoading(false)); }}
            className="text-sm bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded text-slate-300"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Success State */}
      {!loading && !error && movies.length > 0 && (
        <>
          <div className="overflow-hidden px-4 md:px-2" ref={emblaRef}>
            <div className="flex gap-4 cursor-grab active:cursor-grabbing">
              {movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="flex-none w-32 md:w-44"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-slate-800 mb-3 shadow-md border border-slate-800 hover:border-slate-500 transition-colors relative">
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

          <button 
            onClick={scrollPrev}
            className="absolute left-0 lg:-left-4 top-[60%] mt-4 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer hidden md:block"
          >
            <svg xmlns="http://www.w3.org/w/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute right-0 lg:-right-4 top-[60%] mt-4 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer hidden md:block"
          >
            <svg xmlns="http://www.w3.org/w/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}
      
      {!loading && !error && movies.length === 0 && (
        <p className="px-4 text-slate-500 text-sm">No movies found.</p>
      )}
    </div>
  )
}
