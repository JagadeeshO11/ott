function Home() {
  return (
    <div className="px-6 py-8">
      {/* Hero Section Placeholder */}
      <div className="w-full h-64 md:h-96 bg-slate-800 rounded-2xl flex items-end p-8 mb-10 overflow-hidden relative shadow-lg ring-1 ring-slate-700">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
        <div className="relative z-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">Featured Show</h1>
          <p className="text-slate-300 md:w-2/3 mb-4">Watch the latest trending series right now. Binge-worthy entertainment updated daily.</p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg transition-colors cursor-pointer shadow-red-600/20 shadow-lg">
            Play Now
          </button>
        </div>
      </div>

      {/* Content Row */}
      <h2 className="text-2xl font-bold mb-6 text-slate-100">Trending Now</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div 
            key={item} 
            className="aspect-[2/3] bg-slate-800 rounded-xl hover:scale-105 transition-transform cursor-pointer shadow-md border py-2 px-2 border-slate-700 hover:border-slate-500 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-4">
                <span className="text-sm font-semibold text-white">Show {item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
