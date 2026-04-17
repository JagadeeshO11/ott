import { useState, useEffect } from 'react'
import { searchMovies, getImageUrl } from './api'
import { useDebounce } from './hooks/useDebounce'
import MovieModal from './MovieModal'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const debouncedQuery = useDebounce(query, 400)

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([])
      return
    }

    const search = async () => {
      try {
        const data = await searchMovies(debouncedQuery)
        setResults(data ? data.slice(0, 5) : [])
      } catch (e) {
        console.error(e)
        setResults([])
      }
    }

    search()
  }, [debouncedQuery])

  return (
    <>
      {/* Sidebar Navigation */}
      <nav className="fixed top-0 left-0 h-screen w-36 md:w-48 bg-transparent z-50 flex flex-col py-6 transition-all duration-500 overflow-x-hidden">

        {/* LOGO */}
        <div className="flex flex-col justify-center mb-10 w-full px-6 md:px-8">
          <div className="text-amber-300 hover:scale-110 transition-transform cursor-pointer flex items-center gap-2">
            <svg className="w-8 h-8 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            <span className="font-extrabold text-2xl tracking-tighter text-white drop-shadow-md">OTT</span>
          </div>
        </div>

        {/* MAIN LINKS */}
        <div className="flex-1 flex flex-col gap-6 px-6 md:px-8">
          {/* Search */}
          <div className="flex flex-col relative">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-none text-lg md:text-xl font-semibold text-slate-100 placeholder-slate-400 focus:outline-none w-full transition-colors drop-shadow-md"
            />
          </div>

          <a href="#trending" className="text-lg md:text-xl font-semibold text-slate-100/80 hover:text-white drop-shadow-md transition-colors cursor-pointer">
            Home
          </a>
          <div className="text-lg md:text-xl font-semibold text-slate-100/80 hover:text-white drop-shadow-md transition-colors cursor-pointer">
            TV
          </div>
          <a href="#indian-cinema" className="text-lg md:text-xl font-semibold text-slate-100/80 hover:text-white drop-shadow-md transition-colors cursor-pointer">
            Movies
          </a>
          <a href="#explore-genres" className="text-lg md:text-xl font-semibold text-slate-100/80 hover:text-white drop-shadow-md transition-colors cursor-pointer">
            Categories
          </a>
          <div className="text-lg md:text-xl font-semibold text-slate-100/80 hover:text-white drop-shadow-md transition-colors cursor-pointer">
            My Space
          </div>
        </div>

        {/* User Profile Icon */}
        <div className="mt-auto px-6 md:px-8 pb-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer hover:ring-2 ring-sky-400 transition-all shadow-lg text-slate-300 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
          </div>
        </div>

      </nav>

      {/* Search Results */}
      {results.length > 0 && query.trim().length >= 2 && (
        <div className="fixed top-24 left-24 md:left-40 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden py-2 z-40 transition-all duration-300" onClick={() => setQuery('')}>
          <div className="px-3 pb-2 pt-1 border-b border-slate-800 text-xs text-slate-500 font-semibold tracking-wider">TOP RESULTS</div>
          {results.map(movie => (
            <div
              key={movie.id}
              className="flex items-center gap-3 px-3 py-2 hover:bg-slate-800 cursor-pointer transition-colors"
              onClick={() => { setSelectedMovie(movie); setQuery(''); }}
            >
              <img src={getImageUrl(movie.poster_path)} className="w-10 h-14 object-cover rounded bg-slate-800 flex-shrink-0" alt="Poster" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-200 truncate">{movie.title || movie.name}</h4>
                <p className="text-xs text-slate-500">{movie.release_date?.substring(0, 4)} • ★ {Math.round(movie.vote_average * 10) / 10}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </>
  )
}
