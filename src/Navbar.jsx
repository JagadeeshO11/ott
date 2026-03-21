import { useState, useEffect } from 'react'
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
    <>
      {/* Sidebar Navigation */}
      <nav className="fixed top-0 left-0 h-screen w-[4.5rem] md:w-20 hover:w-[280px] bg-slate-950/90 group-hover:bg-gradient-to-r group-hover:from-[#0f172a] group-hover:via-[#0f172a]/95 group-hover:to-transparent backdrop-blur-xl group-hover:backdrop-blur-sm border-r border-white/5 group-hover:border-transparent z-50 flex flex-col transition-all duration-500 group overflow-x-hidden">
        
        {/* LOGO */}
        <div className="flex flex-col items-center justify-center py-8 min-w-[72px] md:min-w-[80px]">
          <div className="text-amber-300 hover:scale-110 transition-transform cursor-pointer">
             <svg className="w-8 h-8 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          </div>
          <div className="opacity-0 group-hover:opacity-100 h-0 group-hover:h-8 transition-all duration-300 overflow-hidden mt-1 flex items-center justify-center w-full delay-100">
            <button className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-[4px] uppercase tracking-widest hover:bg-amber-400/20 transition-colors whitespace-nowrap font-sans">
              Upgrade &gt;
            </button>
          </div>
        </div>

        {/* MAIN LINKS */}
        <div className="flex-1 flex flex-col gap-[2px] px-2 md:px-[6px] mt-4">
          
          {/* My Space */}
          <div className="flex items-center p-3 rounded-xl hover:bg-white/10 cursor-pointer text-slate-400 hover:text-white transition-colors group/item">
            <svg className="w-[22px] h-[22px] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
            <span className="ml-[22px] font-[500] text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap transform group-hover/item:translate-x-1 group-hover/item:text-white tracking-wide">My Space</span>
          </div>

          {/* Search */}
          <div className="flex items-center p-3 rounded-xl focus-within:bg-white/10 text-slate-400 focus-within:text-white transition-colors relative group/item hover:text-white">
            <svg className="w-[22px] h-[22px] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <input 
               type="text" 
               placeholder="Search" 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className="ml-[22px] bg-transparent border-none text-[15px] text-white placeholder-slate-400 focus:outline-none w-full opacity-0 group-hover:opacity-100 transition-opacity w-[180px] duration-300 font-[500] tracking-wide"
            />
          </div>

          {/* Home */}
          <a href="#trending" className="flex items-center p-3 rounded-xl text-white font-bold bg-white/10 cursor-pointer group/item">
            <svg className="w-[22px] h-[22px] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.99 8.99a.75.75 0 1 1-1.06 1.06L12 5.414 3.54 13.891a.75.75 0 1 1-1.06-1.06l8.99-8.99Z" /><path d="M12 5.414l-7.5 7.5V20.25a.75.75 0 0 0 .75.75h13.5a.75.75 0 0 0 .75-.75v-7.336l-7.5-7.5Z" /></svg>
            <span className="ml-[22px] text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap transform group-hover/item:translate-x-1 tracking-wide">Home</span>
          </a>

          {/* TV */}
          <div className="flex items-center p-3 rounded-xl hover:bg-white/10 cursor-pointer text-slate-400 hover:text-white transition-colors group/item">
            <svg className="w-[22px] h-[22px] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" /></svg>
            <span className="ml-[22px] font-[500] text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap transform group-hover/item:translate-x-1 tracking-wide">TV</span>
          </div>

          {/* Movies */}
          <a href="#indian-cinema" className="flex items-center p-3 rounded-xl hover:bg-white/10 cursor-pointer text-slate-400 hover:text-white transition-colors group/item">
            <svg className="w-[22px] h-[22px] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.625 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.625 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-1.5-3.75C18.504 8.25 18 7.746 18 7.125v-1.5m1.125 5.25h-1.5m1.5 0A1.125 1.125 0 0 1 18 10.875v-1.5m-1.5 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 16.5 10.875v-1.5" /></svg>
            <span className="ml-[22px] font-[500] text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap transform group-hover/item:translate-x-1 tracking-wide">Movies</span>
          </a>

          {/* Categories */}
          <a href="#explore-genres" className="flex items-center p-3 rounded-xl hover:bg-white/10 cursor-pointer text-slate-400 hover:text-white transition-colors group/item">
            <svg className="w-[22px] h-[22px] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>
            <span className="ml-[22px] font-[500] text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap transform group-hover/item:translate-x-1 tracking-wide">Categories</span>
          </a>

        </div>

      </nav>

      {/* Search Results (Floating strictly outside the sidebar to the right) */}
      {results.length > 0 && query.trim().length >= 2 && (
        <div className="fixed top-24 left-24 md:left-[90px] w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden py-2 z-40 transition-all duration-300" onClick={() => setQuery('')}>
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

      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </>
  )
}
