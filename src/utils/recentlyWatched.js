const RECENTLY_WATCHED_KEY = 'ott_recently_watched'

const safeParse = (value) => {
  try {
    return JSON.parse(value) || []
  } catch {
    return []
  }
}

export const getRecentlyWatched = () => {
  if (typeof window === 'undefined') return []
  return safeParse(window.localStorage.getItem(RECENTLY_WATCHED_KEY))
}

export const pushRecentlyWatched = (movie) => {
  if (!movie || typeof window === 'undefined') return []
  const current = getRecentlyWatched()
  const normalized = {
    id: movie.id,
    title: movie.title || movie.name,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date || movie.first_air_date,
    vote_average: movie.vote_average,
    genre_ids: movie.genre_ids,
    original_language: movie.original_language,
    overview: movie.overview,
  }

  const filtered = current.filter((item) => item.id !== normalized.id)
  const next = [normalized, ...filtered].slice(0, 6)
  window.localStorage.setItem(RECENTLY_WATCHED_KEY, JSON.stringify(next))
  return next
}
