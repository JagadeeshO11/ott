import { useCallback, useEffect, useState, useRef } from 'react'
import MovieCard from './components/MovieCard'
import MovieModal from './MovieModal'
import { getWatchlist, toggleWatchlist } from './utils/watchlist'
import { pushRecentlyWatched } from './utils/recentlyWatched'

export default function MovieRow({ title, subtitle, fetchMovies, movies: initialMovies }) {
  const [movies, setMovies] = useState(initialMovies || [])
  const [loading, setLoading] = useState(!initialMovies)
  const [error, setError] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [watchlistIds, setWatchlistIds] = useState(() => getWatchlist().map((item) => item.id))
  const scrollContainerRef = useRef(null)

  const scrollPrev = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -window.innerWidth * 0.7, behavior: 'smooth' })
    }
  }, [])

  const scrollNext = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: window.innerWidth * 0.7, behavior: 'smooth' })
    }
  }, [])

  const loadMovies = useCallback(async () => {
    if (initialMovies) {
      setMovies(initialMovies)
      setLoading(false)
      setError(false)
      return
    }

    try {
      setLoading(true)
      setError(false)
      const data = await fetchMovies()
      setMovies(data || [])
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [fetchMovies, initialMovies])

  useEffect(() => {
    loadMovies()
  }, [loadMovies])

  useEffect(() => {
    setWatchlistIds(getWatchlist().map((item) => item.id))
  }, [])

  const handleToggleWatchlist = (movie) => {
    toggleWatchlist(movie)
    setWatchlistIds(getWatchlist().map((item) => item.id))
  }

  const handleSelect = (movie) => {
    pushRecentlyWatched(movie)
    setSelectedMovie(movie)
  }

  if (error && !loading) return null;

  return (
    <div className="group relative overflow-visible mb-10">
      <div className="flex items-center justify-between px-4 md:px-6 mb-2">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter chromatic-aberration">
          {title}
        </h2>
        <button className="px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/30 transition-all duration-500">
          See all
        </button>
      </div>

      {loading && (
        <div className="flex gap-4 px-4 md:px-6 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-none w-36 md:w-44 lg:w-52">
              <div className="aspect-[2/3] rounded-md bg-slate-800/50 animate-pulse mb-3 smokey-edge"></div>
              <div className="h-3.5 bg-slate-800/50 animate-pulse rounded-full mb-2"></div>
              <div className="h-3 bg-slate-800/30 animate-pulse rounded-full w-3/4"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="relative overflow-visible">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-8 overflow-x-auto overflow-y-visible py-12 md:py-16 no-scrollbar snap-x snap-mandatory scroll-smooth scroll-padding-x-0"
            style={{ scrollPaddingLeft: '0px' }}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="relative flex-none w-40 md:w-56 lg:w-64 snap-start overflow-visible">
                <MovieCard
                  movie={movie}
                  onSelect={handleSelect}
                  isInWatchlist={watchlistIds.includes(movie.id)}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-y-0 left-0 hidden items-center md:flex">
            <button
              type="button"
              onClick={scrollPrev}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-950/80 text-white shadow-lg shadow-black/20 transition hover:bg-slate-900"
            >
              <span className="text-xl">‹</span>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 hidden items-center md:flex">
            <button
              type="button"
              onClick={scrollNext}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-950/80 text-white shadow-lg shadow-black/20 transition hover:bg-slate-900"
            >
              <span className="text-xl">›</span>
            </button>
          </div>
        </div>
      )}

      {selectedMovie && <MovieModal movie={selectedMovie} allMovies={movies} onClose={() => setSelectedMovie(null)} />}
    </div>
  )
}

