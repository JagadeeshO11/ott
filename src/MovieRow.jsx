export default function MovieRow({ title, movies }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-slate-100 px-2">{title}</h2>
      {/* Hide scrollbar for a cleaner look */}
      <div className="flex overflow-x-auto gap-4 pb-4 px-2 scrollbar-hide snap-x">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="flex-none w-32 md:w-44 snap-start group cursor-pointer"
          >
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-slate-800 mb-3 shadow-md border border-slate-700 group-hover:border-slate-500 transition-colors">
              <img 
                src={movie.image} 
                alt={movie.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <h3 className="text-sm font-medium text-slate-300 group-hover:text-white truncate transition-colors">
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}
