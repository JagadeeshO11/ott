import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { searchMovies, getImageUrl } from './api'
import MovieModal from './MovieModal'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const delay = setTimeout(async () => {
      try {
        const data = await searchMovies(query);
        setResults(data ? data.slice(0, 5) : []); // only show top 5 in dropdown
      } catch (e) {
        // ignore search errors quietly
      }
    }, 400); // 400ms debounce
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50 z-40 flex items-center justify-between px-4 md:px-8">
      <Link to="/" className="text-3xl font-extrabold text-red-600 tracking-tighter hover:text-red-500 transition-colors">
        OTT
      </Link>
      
      <div className="relative z-50">
        <div className="relative flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 absolute left-3 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..." 
            className="bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder-slate-400 rounded-full pl-10 pr-4 py-2 w-48 md:w-64 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all font-medium"
          />
        </div>

        {/* Search Results Dropdown */}
        {results.length > 0 && query.trim().length >= 2 && (
          <div className="absolute top-12 right-0 w-64 md:w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden py-2" onClick={() => setQuery('')}>
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
                  <p className="text-xs text-slate-500">{movie.release_date?.substring(0,4)} • ★ {Math.round(movie.vote_average * 10) / 10}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reused Modal Component for seamless playback simulation */}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </nav>
  )
}
