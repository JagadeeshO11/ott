// Updated API functions with pagination support

const API_KEY = import.meta.env.VITE_APP_TOKEN;
const IS_PROD = import.meta.env.PROD;
const BASE_URL = IS_PROD ? "/api" : "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const getImageUrl = (path, size = 'w500') => {
  const base = size === 'original' ? 'https://image.tmdb.org/t/p/original' : `https://image.tmdb.org/t/p/${size}`;
  return path ? `${base}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
};

/**
 * TMDB fetch utility with caching and optional pagination.
 */
export const fetchFromTMDB = async (endpoint, params = {}, page = 1) => {
  try {
    const url = new URL(`${window.location.origin}${IS_PROD ? '' : ''}${BASE_URL}${endpoint}`);
    url.searchParams.append('language', 'en-US');
    
    const isV4Token = API_KEY && API_KEY.length > 50;
    
    // Only append API KEY on client side if NOT in production (development)
    if (!IS_PROD) {
      if (!isV4Token) url.searchParams.append('api_key', API_KEY || '');
    }

    // Append pagination if applicable
    if (page && page > 1) url.searchParams.append('page', page);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const urlString = url.toString();
    const cacheKey = `tmdb_${urlString}`;
    const cachedItem = localStorage.getItem(cacheKey);
    if (cachedItem) {
      try {
        const { timestamp, data } = JSON.parse(cachedItem);
        const ONE_DAY = 24 * 60 * 60 * 1000;
        if (Date.now() - timestamp < ONE_DAY) {
          return data;
        }
      } catch (e) { console.error("Cache parsing error", e); }
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        ...(!IS_PROD && isV4Token ? { Authorization: `Bearer ${API_KEY}` } : {})
      }
    };
    
    const res = await fetch(urlString, options);
    if (!res.ok) throw new Error(`TMDB API Error: ${res.status}`);
    const data = await res.json();
    const returnData = data.results !== undefined ? data.results : data;
    
    try { localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: returnData })); }
    catch (e) { console.warn('LocalStorage full or disabled', e); }
    
    return returnData;
  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }
};

export const getTrendingMovies = (page = 1) => fetchFromTMDB('/trending/movie/week', {}, page);

export const getMoviesByCategory = async (genreId, page = 1) => {
  const movies = await fetchFromTMDB('/discover/movie', { with_genres: genreId }, page);
  return movies?.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
};

export const getMoviesByLanguage = async (lang, page = 1) => {
  const movies = await fetchFromTMDB('/discover/movie', { with_original_language: lang, sort_by: 'popularity.desc' }, page);
  return movies?.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
};

export const searchMovies = (query, page = 1) => fetchFromTMDB('/search/movie', { query, include_adult: false }, page);

export const getMovieProviders = (movieId) => fetchFromTMDB(`/movie/${movieId}/watch/providers`);
