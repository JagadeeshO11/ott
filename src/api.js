const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const getImageUrl = (path) => {
  return path ? `${IMAGE_BASE_URL}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
};

const fetchFromTMDB = async (endpoint, params = {}) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("TMDB API Key is missing! Add VITE_TMDB_API_KEY to your .env file.");
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', apiKey);
  url.searchParams.append('language', 'en-US');
  
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("TMDB API Error:", error);
    throw error;
  }
};

// Reusable API Functions
export const getTrendingMovies = () => fetchFromTMDB('/trending/movie/week');
export const getMoviesByCategory = (genreId) => fetchFromTMDB('/discover/movie', { with_genres: genreId });
