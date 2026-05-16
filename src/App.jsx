import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Home from './Home'
import PlayerPage from './components/PlayerPage'
import CatalogGrid from './components/CatalogGrid'

function App() {
  return (
    <div className="relative min-h-screen min-w-screen overflow-hidden bg-[#030508] text-slate-100 font-sans">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(76,29,149,0.25),transparent_60%),radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.2),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.5),_rgba(3,5,8,0.95))]" />

      <Navbar />

      <div className="relative flex min-h-screen pt-20 z-10">
        <Sidebar />
        <main className="flex-1 pl-0 md:pl-20 min-w-0 py-6">
          <div className="mx-auto max-w-[1600px] px-4 md:px-6">
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
