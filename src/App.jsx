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
        <Sidebar />
        <main className="flex-1 pl-0 md:pl-24 lg:pl-32 min-w-0 py-10">
          <div className="mx-auto max-w-[1700px] px-6 md:px-10">
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
    </div>
  )
}

export default App
