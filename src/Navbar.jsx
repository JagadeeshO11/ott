import { useState, useEffect } from 'react'
import { searchMovies, getImageUrl } from './api'
import { useDebounce } from './hooks/useDebounce'
import { useNavigate } from 'react-router-dom'
import MovieModal from './MovieModal'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const debouncedQuery = useDebounce(query, 400)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <nav className={`fixed top-0 left-0 right-0 h-20 z-40 transition-all duration-300 flex items-center justify-end px-6 md:px-12 ${scrolled ? 'bg-[#07101d] shadow-lg shadow-black/20' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        
        {/* Right side: Search and Profile */}
        <div className="flex items-center gap-6">
          <div className="relative group flex items-center">
            <div className="absolute right-3 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Titles, people, genres"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-0 opacity-0 group-hover:w-64 group-hover:opacity-100 focus:w-64 focus:opacity-100 transition-all duration-500 bg-black/50 border border-white/20 rounded-full py-2 pl-4 pr-10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:bg-black/80 backdrop-blur-md"
            />
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-purple-500 p-[2px] cursor-pointer hover:scale-105 transition-transform shadow-lg">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Results Overlay */}
      {results.length > 0 && query.trim().length >= 2 && (
        <div className="fixed top-20 right-12 md:right-24 w-80 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden py-2 z-50 transition-all duration-300">
          <div className="px-4 pb-2 pt-2 text-xs text-sky-400 font-bold tracking-widest uppercase">Top Results</div>
          {results.map(movie => (
            <div
              key={movie.id}
              className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
              onClick={() => { setSelectedMovie(movie); setQuery(''); }}
            >
              <img src={getImageUrl(movie.poster_path)} className="w-12 h-16 object-cover rounded-lg bg-slate-800 flex-shrink-0 shadow-md" alt="Poster" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{movie.title || movie.name}</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium">{movie.release_date?.substring(0, 4)} • <span className="text-amber-400">★</span> {Math.round(movie.vote_average * 10) / 10}</p>
              </div>
            </div>
          ))}
          <div 
            className="px-4 py-3 text-center text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
            onClick={() => { navigate(`/search?q=${query}`); setQuery(''); }}
          >
            See all results for "{query}"
          </div>
        </div>
      )}

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  )
}
