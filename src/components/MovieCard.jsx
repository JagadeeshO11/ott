import { getImageUrl } from '../api'

export default function MovieCard({ movie, onSelect, isInWatchlist, onToggleWatchlist }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(movie)}
      onKeyDown={(event) => event.key === 'Enter' && onSelect(movie)}
      className="group relative min-w-[180px] max-w-[220px] overflow-visible rounded-[1.75rem] border border-white/10 bg-slate-950/70 shadow-[0_30px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
    >
      <div className="overflow-hidden rounded-[1.75rem]">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title || movie.name}
          loading="lazy"
          className="h-[280px] w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 rounded-b-[1.75rem] bg-gradient-to-t from-slate-950/95 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-sky-300/90">Watch now</p>
            <h3 className="mt-2 text-sm font-semibold leading-tight text-white line-clamp-2">
              {movie.title || movie.name}
            </h3>
          </div>
          <span className="rounded-full bg-slate-800/90 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200">
            HD
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2 text-[12px] text-slate-300">
          <span className="font-semibold text-emerald-400">★ {(movie.vote_average || 0).toFixed(1)}</span>
          <span>{movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onToggleWatchlist(movie)
        }}
        className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-white shadow-lg transition hover:bg-slate-800"
        aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
      >
        <span className="text-xl">{isInWatchlist ? '❤️' : '🤍'}</span>
      </button>
    </div>
  )
}
