import { getImageUrl } from '../api'

export default function MovieCard({ movie, onSelect, isInWatchlist, onToggleWatchlist }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(movie)}
      onKeyDown={(event) => event.key === 'Enter' && onSelect(movie)}
      className="group relative min-w-[180px] max-w-[220px] overflow-visible rounded-md hover-z-axis cursor-pointer"
    >
      <div className="overflow-hidden rounded-md bg-transparent smokey-edge">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title || movie.name}
          loading="lazy"
          className="h-[280px] w-full object-cover"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 rounded-b-md bg-gradient-to-t from-[#030508] via-[#030508]/80 to-transparent p-5 opacity-0 transition-all duration-500 group-hover:opacity-100 flex flex-col justify-end gap-3 translate-y-2 group-hover:translate-y-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white line-clamp-1 drop-shadow-lg">
            {movie.title || movie.name}
          </h3>
          <span className="flex-shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-slate-300 backdrop-blur-sm border border-white/5">
            HD
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
          <span className="text-sky-400 font-bold">★ {(movie.vote_average || 0).toFixed(1)}</span>
          <span className="opacity-40">•</span>
          <span>{movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4)}</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onSelect(movie); }}
            className="flex-1 bg-white text-black py-2 rounded-lg font-bold text-xs hover:bg-sky-400 transition-colors shadow-lg active:scale-95"
          >
            Play Now
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie); }}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all border border-white/10 backdrop-blur-md ${isInWatchlist ? 'bg-sky-500/20 text-sky-400' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
            {isInWatchlist ? '❤️' : '➕'}
          </button>
        </div>
      </div>
    </div>
  )
}
