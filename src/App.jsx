import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Home from './Home'

function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans flex">
      <Sidebar />
      <main className="flex-1 pl-0 md:pl-20 min-w-0">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
