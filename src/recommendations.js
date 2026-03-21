export const getRecommendedLocalMovies = (allMovies, selectedMovie) => {
  if (!allMovies || !selectedMovie) return [];

  return allMovies.filter(movie => {
    // 1. Exclude the selected movie itself
    if (movie.id === selectedMovie.id) return false;

    // 2. Matching genre_ids (at least one shared genre)
    const hasSharedGenre = movie.genre_ids?.some(id => 
      selectedMovie.genre_ids?.includes(id)
    );

    // 3. Same original_language
    const isSameLanguage = movie.original_language === selectedMovie.original_language;

    // 4. Similar vote_average (within 1.5 points)
    const ratingDiff = Math.abs((movie.vote_average || 0) - (selectedMovie.vote_average || 0));
    const isSimilarRating = ratingDiff <= 1.5;

    // We require at least a genre match and similar rating/language
    return hasSharedGenre && (isSameLanguage || isSimilarRating);
  });
};
