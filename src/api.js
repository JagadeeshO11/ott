const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// 1. Temporary log to check if env is working (Check your F12 Console!)
console.log("DEBUG API_KEY:", API_KEY);

export const getImageUrl = (path) => {
  return path ? `${IMAGE_BASE_URL}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
};

export const fetchFromTMDB = async (endpoint) => {
  try {
    // Determine if endpoint already has query params
    const separator = endpoint.includes('?') ? '&' : '?';
    
    // 2. Correct API format matching tutorial perfectly
    const res = await fetch(
      `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US`
    );
    
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("Fetch Error:", err);
    throw err;
  }
};

export const getTrendingMovies = async () => {
  return await fetchFromTMDB('/trending/movie/week');
};

export const getMoviesByCategory = async (genreId) => {
  return await fetchFromTMDB(`/discover/movie?with_genres=${genreId}`);
};
