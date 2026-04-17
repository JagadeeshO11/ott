const WATCHLIST_KEY = 'ott_watchlist'

const safeParse = (value) => {
  try {
    return JSON.parse(value) || []
  } catch {
    return []
  }
}

export const getWatchlist = () => {
  if (typeof window === 'undefined') return []
  return safeParse(window.localStorage.getItem(WATCHLIST_KEY))
}

export const saveWatchlist = (movies) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(WATCHLIST_KEY, JSON.stringify(movies))
}

export const toggleWatchlist = (movie) => {
  const current = getWatchlist()
  const exists = current.some((item) => item.id === movie.id)

  const next = exists
    ? current.filter((item) => item.id !== movie.id)
    : [movie, ...current].slice(0, 50)

  saveWatchlist(next)
  return next
}

export const isInWatchlist = (movieId) => {
  return getWatchlist().some((item) => item.id === movieId)
}
