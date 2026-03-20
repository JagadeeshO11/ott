import MovieRow from './MovieRow'

const DUMMY_MOVIES = {
  trending: [
    { id: 1, title: 'The Dark Horizon', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400&h=600' },
    { id: 2, title: 'Neon Nights', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=400&h=600' },
    { id: 3, title: 'Echoes of Time', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=400&h=600' },
    { id: 4, title: 'Cosmic Journey', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400&h=600' },
    { id: 5, title: 'Silent Protocol', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400&h=600' },
    { id: 6, title: 'Shadow Walker', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=400&h=600' },
  ],
  action: [
    { id: 7, title: 'Velocity', image: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=400&h=600' },
    { id: 8, title: 'Extraction Point', image: 'https://images.unsplash.com/photo-1608265386093-9b242fc911f1?auto=format&fit=crop&q=80&w=400&h=600' },
    { id: 9, title: 'Redline', image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=400&h=600' },
    { id: 10, title: 'Bulletproof', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400&h=600' },
    { id: 11, title: 'Apex Predator', image: 'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&q=80&w=400&h=600' },
  ],
  comedy: [
    { id: 12, title: 'Office Space', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=600' },
    { id: 13, title: 'Weekend Plans', image: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=400&h=600' },
    { id: 14, title: 'Roommates', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400&h=600' },
    { id: 15, title: 'Bad Ideas', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400&h=600' },
  ]
}

function Home() {
  return (
    <div className="px-4 md:px-8 py-8 w-full max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="w-full h-[50vh] md:h-[60vh] bg-slate-800 rounded-2xl flex items-end p-8 md:p-12 mb-12 overflow-hidden relative shadow-lg ring-1 ring-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=1920&h=1080" 
          alt="Featured Show" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-20 w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-3 text-white drop-shadow-md">Neon Nights</h1>
          <p className="text-slate-200 mb-6 text-sm md:text-base drop-shadow-sm font-medium">
            In a city that never sleeps, detective Cole finds himself entangled in a conspiracy that goes straight to the top. Watch the latest trending series right now.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer shadow-red-600/20 shadow-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/w/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
            Play Now
          </button>
        </div>
      </div>

      {/* Movie Rows */}
      <MovieRow title="Trending Now" movies={DUMMY_MOVIES.trending} />
      <MovieRow title="Action Packed" movies={DUMMY_MOVIES.action} />
      <MovieRow title="Comedy Hits" movies={DUMMY_MOVIES.comedy} />
    </div>
  )
}

export default Home
