import { useEffect, useState } from 'react'
import MovieRow from './MovieRow'
import Landing from './components/Landing'
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
        <Landing />
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
