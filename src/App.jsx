import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
