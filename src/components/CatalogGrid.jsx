import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import { getMoviesByCategory } from '../api';

const CatalogGrid = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(false);
      try {
        const newMovies = await getMoviesByCategory(genreId || 28, page);
        setMovies(prev => page === 1 ? newMovies : [...prev, ...newMovies]);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError(true);
      }
      setLoading(false);
    };
    
    fetchMovies();
  }, [genreId, page]);

  return (
    <div className="w-full px-4 md:px-6 py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Category Catalog</h1>
          <p className="text-slate-400">Explore movies in this genre</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map(movie => (
          <div key={`${movie.id}-${Math.random()}`} className="cursor-pointer" onClick={() => navigate(`/player/${movie.id}`)}>
            <MovieCard movie={movie} />
          </div>
        ))}
        
        {loading && [...Array(12)].map((_, i) => (
          <div key={`skeleton-${i}`} className="aspect-[2/3] rounded-2xl bg-slate-800 animate-pulse border border-white/10" />
        ))}
      </div>
      
      {!loading && movies.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => setPage(p => p + 1)}
            className="btn-primary"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogGrid;
