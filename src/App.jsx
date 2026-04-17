import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Home from './Home'

function App() {
  return (
    <div className="relative min-h-screen min-w-screen overflow-hidden bg-[#07101d] text-slate-100 font-sans">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),transparent_18%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.14),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.96))]" />

      <div className="relative flex min-h-screen">
        <Sidebar />
        <main className="flex-1 pl-0 md:pl-20 min-w-0 py-6">
          <div className="mx-auto max-w-[1600px] px-4 md:px-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_40px_120px_rgba(15,23,42,0.42)] overflow-visible">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
