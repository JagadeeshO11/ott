import MovieRow from './MovieRow'
import { getTrendingMovies, getMoviesByCategory, getMoviesByLanguage } from './api'

// Define fetch functions outside component to maintain stable references
// Indian Cinema Languages
const fetchTelugu = () => getMoviesByLanguage('te');
const fetchHindi = () => getMoviesByLanguage('hi');
const fetchTamil = () => getMoviesByLanguage('ta');
const fetchMalayalam = () => getMoviesByLanguage('ml');

// Global Genres
const fetchAction = () => getMoviesByCategory(28);
const fetchComedy = () => getMoviesByCategory(35);
const fetchHorror = () => getMoviesByCategory(27);
const fetchSciFi = () => getMoviesByCategory(878);

function Home() {
  return (
    <div className="px-4 md:px-12 lg:px-16 py-8 w-full 2xl:max-w-[2000px] mx-auto">
      {/* Hero Section */}
      <div className="w-full h-[50vh] md:h-[60vh] bg-slate-800 rounded-2xl flex items-end p-8 md:p-12 mb-12 overflow-hidden relative shadow-lg ring-1 ring-slate-700/50 group">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=1920&h=1080" 
          alt="Featured Trailer Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="relative z-20 w-full md:w-2/3 lg:w-1/2">
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-3 shadow-md tracking-wider">
            TMDB EXCLUSIVE
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-3 text-white drop-shadow-md tracking-tight">
            Cinematic Universe
          </h1>
          <p className="text-slate-200 mb-6 text-sm md:text-base drop-shadow-sm font-medium leading-relaxed">
            Welcome to the fully upgraded React OTT platform pulling real-time data from the TMDB API. Browse trending cinema, action blockbusters, and more.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer shadow-red-600/20 shadow-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
            Play Now
          </button>
        </div>
      </div>

      <div className="space-y-4 md:space-y-8">
        <div id="trending" className="mb-8 md:mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 ml-4 md:ml-2">Global Trending</h2>
          <MovieRow title="Trending Now" fetchMovies={getTrendingMovies} />
        </div>

        <div id="indian-cinema" className="mb-8 md:mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-2 ml-4 md:ml-2">Indian Cinema Hub</h2>
          <div className="bg-slate-800/20 rounded-2xl py-2 md:py-6 backdrop-blur-sm border border-slate-800/50">
            <MovieRow title="Tollywood Blockbusters" fetchMovies={fetchTelugu} />
            <MovieRow title="Bollywood Hits" fetchMovies={fetchHindi} />
            <MovieRow title="Kollywood Blockbusters" fetchMovies={fetchTamil} />
            <MovieRow title="Mollywood Cinema" fetchMovies={fetchMalayalam} />
          </div>
        </div>

        <div id="explore-genres" className="mb-8 md:mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2 ml-4 md:ml-2">Explore Genres</h2>
          <MovieRow title="Action & Adventure" fetchMovies={fetchAction} />
          <MovieRow title="Sci-Fi & Fantasy" fetchMovies={fetchSciFi} />
          <MovieRow title="Comedy Specials" fetchMovies={fetchComedy} />
          <MovieRow title="Horror Highlights" fetchMovies={fetchHorror} />
        </div>
      </div>
    </div>
  )
}

export default Home
