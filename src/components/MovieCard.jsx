import { getImageUrl } from '../api'

export default function MovieCard({ movie, onSelect, isInWatchlist, onToggleWatchlist }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(movie)}
      onKeyDown={(event) => event.key === 'Enter' && onSelect(movie)}
      className="group relative min-w-[190px] max-w-[240px] overflow-visible rounded-3xl hover-z-axis spring-hover cursor-pointer"
    >
      <div className="overflow-hidden rounded-3xl bg-transparent glass-card transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(56,189,248,0.25)]">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title || movie.name}
          loading="lazy"
          className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        
        {/* AAA Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030508]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
          <div className="flex items-center justify-between mb-4">
             <span className="inline-flex items-center px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-sky-400 bg-sky-500/10 rounded-lg ring-1 ring-sky-500/20 bloom-glow">
              ★ {(movie.vote_average || 0).toFixed(1)}
            </span>
            <span className="px-2 py-1 bg-white/10 rounded-lg text-[8px] font-black tracking-widest text-white uppercase">4K</span>
          </div>

          <h3 className="text-lg font-black text-white leading-tight tracking-tight mb-6 drop-shadow-xl line-clamp-2">
            {movie.title || movie.name}
          </h3>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); onSelect(movie); }}
              className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-400 hover:text-white transition-all shadow-xl active:scale-95"
            >
              Play
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie); }}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border border-white/10 backdrop-blur-md ${isInWatchlist ? 'bg-sky-500/20 text-sky-400' : 'bg-white/5 text-white hover:bg-white/10'}`}
            >
              {isInWatchlist ? '❤️' : '➕'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
