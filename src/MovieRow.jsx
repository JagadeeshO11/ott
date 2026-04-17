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

  return (
    <div className="group relative overflow-visible mb-10">
      <div className="flex flex-col gap-2 px-4 md:px-6 mb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">{title}</h2>
          {subtitle && <p className="text-sm text-slate-400 mt-1 max-w-2xl">{subtitle}</p>}
        </div>
        <button className="hidden text-sm font-semibold text-sky-300 transition hover:text-sky-200 md:inline-flex">
          See all
        </button>
      </div>

      {loading && (
        <div className="flex gap-4 px-4 md:px-6 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-none w-36 md:w-44 lg:w-52">
              <div className="aspect-[2/3] rounded-[1.75rem] bg-slate-800 animate-pulse mb-3 border border-white/10"></div>
              <div className="h-3.5 bg-slate-800 animate-pulse rounded-full mb-2"></div>
              <div className="h-3 bg-slate-800/70 animate-pulse rounded-full w-3/4"></div>
            </div>
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="rounded-3xl border border-red-700/30 bg-slate-950/80 px-6 py-10 text-center text-slate-300 shadow-xl shadow-red-900/10 mx-4 md:mx-6">
          <p className="mb-4 text-base">Something went wrong while loading this row.</p>
          <button
            type="button"
            onClick={loadMovies}
            className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto overflow-y-visible pb-4 px-4 md:px-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {movies.map((movie) => (
              <div key={movie.id} className="relative flex-none w-44 md:w-52 lg:w-60 snap-start overflow-visible">
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

