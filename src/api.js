const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

console.log("DEBUG API_KEY Loaded:", API_KEY ? "Yes" : "No");

export const getImageUrl = (path) => {
  return path ? `${IMAGE_BASE_URL}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
};

/**
 * Official TMDB Fetch Architecture
 * Supports both v3 API Key (query parameter) and v4 Access Token (Bearer Header) flawlessly.
 */
export const fetchFromTMDB = async (endpoint, params = {}) => {
  try {
    // 1. Properly construct URL to avoid query string malformations (? &)
    const url = new URL(`${BASE_URL}${endpoint}`);
    
    url.searchParams.append('language', 'en-US');
    
    // If it's a short v3 standard API key, append to URL. 
    // TMDB v4 Bearer tokens are usually > 100 characters.
    const isV4Token = API_KEY && API_KEY.length > 50;
    if (!isV4Token) {
      url.searchParams.append('api_key', API_KEY);
    }
    
    // Safely append custom params like with_genres
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    // 2. Official TMDB Headers setup
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        ...(isV4Token ? { Authorization: `Bearer ${API_KEY}` } : {})
      }
    };

    const res = await fetch(url.toString(), options);
    
    if (!res.ok) {
      throw new Error(`TMDB API Error: ${res.status}`);
    }

    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("Fetch Error:", err);
    throw err;
  }
};

// Clean API routes built using the official fetcher
export const getTrendingMovies = () => fetchFromTMDB('/trending/movie/week');
export const getMoviesByCategory = (genreId) => fetchFromTMDB('/discover/movie', { with_genres: genreId });
