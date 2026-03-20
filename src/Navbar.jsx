import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6">
      <Link to="/" className="text-3xl font-extrabold text-red-600 tracking-tighter hover:text-red-500 transition-colors">
        OTT
      </Link>
      
      <div className="flex items-center">
        <input 
          type="text" 
          placeholder="Search movies, shows..." 
          className="bg-slate-800 text-sm text-slate-200 placeholder-slate-400 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all border border-slate-700"
        />
      </div>
    </nav>
  )
}

export default Navbar
