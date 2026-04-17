import { useEffect, useState } from 'react'
import MovieRow from './MovieRow'
import { getTrendingMovies, getMoviesByCategory, getMoviesByLanguage } from './api'
import { getRecentlyWatched } from './utils/recentlyWatched'

const fetchTelugu = () => getMoviesByLanguage('te')
const fetchHindi = () => getMoviesByLanguage('hi')
const fetchTamil = () => getMoviesByLanguage('ta')
const fetchMalayalam = () => getMoviesByLanguage('ml')

const fetchAction = () => getMoviesByCategory(28)
const fetchComedy = () => getMoviesByCategory(35)
const fetchHorror = () => getMoviesByCategory(27)
const fetchSciFi = () => getMoviesByCategory(878)

function Home() {
  return (
    <div className="w-full overflow-x-hidden pb-8">
      {/* Hero Section */}
      <div className="w-full mb-12">
        <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/30 shadow-[0_35px_80px_rgba(15,23,42,0.45)]">
          <img
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=1920&h=1080"
            alt="Featured Trailer Background"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.2),transparent_24%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent" />
          <div className="relative z-20 flex h-full items-end p-6 md:p-12">
            <div className="w-full md:w-2/3 lg:w-1/2 rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl p-8 shadow-[0_24px_64px_rgba(15,23,42,0.35)]">
              <span className="inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-sky-100 bg-sky-500/15 rounded-full shadow-sm shadow-sky-500/10 mb-4">
                TMDB EXCLUSIVE
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight">
                Cinematic Universe
              </h1>
              <p className="text-slate-200 mb-8 text-sm md:text-base font-medium leading-relaxed">
                Welcome to the fully upgraded React OTT platform pulling real-time data from the TMDB API. Browse trending cinema, action blockbusters, and more.
              </p>
              <button className="inline-flex items-center gap-3 rounded-full bg-sky-400/95 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>

    <div className="space-y-4 md:space-y-8 pb-12 mt-8">
      <MovieRow title="Global Trending" fetchMovies={getTrendingMovies} />
      <MovieRow title="Tollywood Blockbusters" fetchMovies={fetchTelugu} />
      <MovieRow title="Bollywood Hits" fetchMovies={fetchHindi} />
      <MovieRow title="Kollywood Blockbusters" fetchMovies={fetchTamil} />
      <MovieRow title="Mollywood Cinema" fetchMovies={fetchMalayalam} />
      <MovieRow title="Action & Adventure" fetchMovies={fetchAction} />
      <MovieRow title="Sci-Fi & Fantasy" fetchMovies={fetchSciFi} />
      <MovieRow title="Comedy Specials" fetchMovies={fetchComedy} />
      <MovieRow title="Horror Highlights" fetchMovies={fetchHorror} />
    </div>
    </div >
  )
}

export default Home
