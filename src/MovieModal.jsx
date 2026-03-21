import { useEffect, useState } from 'react'
import { getMovieProviders } from './api'

export default function MovieModal({ movie, onClose }) {
  const [providers, setProviders] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, []);

  useEffect(() => {
    if (movie?.id) {
      getMovieProviders(movie.id)
        .then(data => {
          // Prioritize IN (India), then US, then fallback to first available
          const countryData = data?.IN || data?.US || Object.values(data || {})[0];
          if (countryData) setProviders(countryData);
        })
        .catch(console.error);
    }
  }, [movie]);

  if (!movie) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" 
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 rounded-2xl max-w-3xl w-full overflow-hidden relative shadow-2xl ring-1 ring-slate-800 animate-in zoom-in-95 duration-200" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white rounded-full p-2 z-20 transition-colors" 
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/w/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
        </button>
        
        <div className="h-64 sm:h-96 w-full relative">
          <img 
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path || movie.poster_path}`} 
            alt={movie.title || movie.name}
            className="w-full h-full object-cover opacity-70" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="p-6 md:p-8 -mt-24 md:-mt-32 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-md">
            {movie.title || movie.name}
          </h2>
          
          <div className="flex items-center gap-4 text-sm md:text-base text-slate-300 mb-6 font-medium">
            <span className="text-green-500 font-bold">{Math.round(movie.vote_average * 10)}% Match</span>
            <span>{movie.release_date?.substring(0,4) || movie.first_air_date?.substring(0,4)}</span>
            <span className="border border-slate-600 px-2 py-0.5 rounded text-xs text-slate-400">HD</span>
          </div>
          
          <p className="text-slate-200 leading-relaxed text-sm md:text-lg mb-6 max-w-2xl">
            {movie.overview || "No description available for this title."}
          </p>
          
          {providers && (
            <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Available on</h3>
              <div className="flex flex-wrap gap-3 items-center">
                {Array.from(new Map(
                  [...(providers.flatrate || []), ...(providers.rent || []), ...(providers.buy || [])]
                    .map(p => [p.provider_id, p])
                ).values()).slice(0, 5).map(provider => (
                  <img 
                    key={provider.provider_id}
                    src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`} 
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    className="w-10 h-10 rounded-lg shadow-sm"
                  />
                ))}
                {providers.link && (
                  <a 
                    href={providers.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg transition-colors ml-2"
                  >
                    Watch Links &rarr;
                  </a>
                )}
              </div>
            </div>
          )}
          
          <button className="bg-white hover:bg-slate-200 text-black font-bold py-2 md:py-3 px-8 rounded-lg transition-colors cursor-pointer flex items-center gap-2">
            <svg xmlns="http://www.w3.org/w/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
            Play Now
          </button>
        </div>
      </div>
    </div>
  )
}
