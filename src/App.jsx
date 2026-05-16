import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Home from './Home'
import PlayerPage from './components/PlayerPage'
import CatalogGrid from './components/CatalogGrid'

function App() {
  return (
    <div className="relative min-h-screen min-w-screen overflow-hidden bg-[#030508] text-slate-100 font-sans selection:bg-sky-500/30">
      {/* AAA Cinematic Overlays */}
      <div className="film-grain" />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="volumetric-fog" />
        <div className="absolute inset-0 bg-[#030508]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(56,189,248,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(168,85,247,0.08),transparent_50%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full animate-pulse-glow" />
      </div>

      <div className="relative flex min-h-screen z-10">
        {/* Desktop Sidebar Column - Persistent Rail */}
        <div className="hidden md:block w-[120px] flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content Column - Flexible & Constrained */}
        <main className="flex-1 min-w-0 py-8 md:py-12 px-4 md:px-12 lg:px-16 pb-24 md:pb-12">
          <div className="mx-auto max-w-[1800px]">
            <div className="bg-transparent overflow-visible">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/player/:id" element={<PlayerPage />} />
                <Route path="/category/:genreId" element={<CatalogGrid />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation - AAA Style */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 h-20 glass-panel z-[100] flex items-center justify-around px-6 rounded-[2rem] shadow-2xl shadow-black/50 border border-white/10">
        <Link to="/" className="text-2xl text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">🏠</Link>
        <Link to="/search" className="text-2xl text-slate-400">🔍</Link>
        <Link to="/watchlist" className="text-2xl text-slate-400">❤️</Link>
        <Link to="/profile" className="w-10 h-10 rounded-full border border-white/20 p-[1px]">
          <img src="https://ui-avatars.com/api/?name=User&size=40" alt="User" className="rounded-full" />
        </Link>
      </nav>
    </div>
  )
}

export default App
