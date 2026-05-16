import { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { MdMovie } from 'react-icons/md';
import { FaFire, FaBookmark, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'Home', icon: <AiFillHome size={24} />, path: '/' },
    { name: 'Action', icon: <FaFire size={24} />, path: '/category/28' },
    { name: 'Comedy', icon: <MdMovie size={24} />, path: '/category/35' },
    { name: 'Horror', icon: <FaBookmark size={24} />, path: '/category/27' },
    { name: 'Sci-Fi', icon: <FaFire size={24} />, path: '/category/878' },
    { name: 'Romance', icon: <MdMovie size={24} />, path: '/category/10749' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Hamburger button for floating mobile view when collapsed */}
      {!isOpen && (
        <button 
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 text-white bg-slate-900/80 p-2 rounded-md"
        >
          <FaBars size={24} />
        </button>
      )}

      {/* Floating Cinematic Sidebar */}
      <aside 
        className={`fixed top-4 left-4 bottom-4 glass-panel smokey-edge z-50 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] rounded-[2.5rem] light-sweep
          ${isOpen ? 'w-[280px]' : 'w-[88px]'}
        `}
      >
        {/* Branding Section */}
        <div className={`relative flex items-center w-full p-6 mb-10 transition-all ${isOpen ? 'justify-between' : 'justify-center'}`}>
          <div className="absolute inset-0 bg-sky-500/5 blur-3xl rounded-full animate-pulse-glow" />
          
          <div className={`relative h-12 w-12 bg-gradient-to-br from-sky-400 via-sky-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20 ring-1 ring-white/20 transition-transform duration-500 hover:scale-110 ${!isOpen ? '' : 'hidden'}`}>
             <span className="text-[10px] font-black text-white tracking-widest">OTT</span>
          </div>
          
          <Link to="/" className={`relative text-4xl font-black text-white tracking-tighter transition-all duration-500 hover:tracking-normal ${!isOpen ? 'opacity-0 hidden' : 'opacity-100'}`}>
            OTT<span className="text-sky-400 animate-pulse">.</span>
          </Link>
          
          <button 
            onClick={toggleSidebar} 
            className={`group relative text-slate-400 hover:text-white transition-all p-3 rounded-2xl bg-white/5 hover:bg-white/10 hover:shadow-lg ${isOpen ? '' : 'hidden'}`}
          >
            <FaBars size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>

        {/* Search Integration */}
        <div className={`px-5 mb-10 transition-all duration-700 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 h-0 overflow-hidden'}`}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
            <input 
              type="text" 
              placeholder="Search cinematic world..."
              className="relative w-full bg-slate-900/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:bg-slate-900/60 transition-all"
            />
            <span className="absolute left-4 top-4 text-slate-400 group-focus-within:text-sky-400 transition-colors duration-300">🔍</span>
          </div>
        </div>

        {/* Premium Navigation List */}
        <nav className={`flex-1 flex flex-col gap-3 px-4 ${isOpen ? '' : 'items-center'}`}>
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className={`group relative flex items-center rounded-[1.25rem] transition-all duration-500 
                ${isOpen ? 'w-full p-4 gap-5' : 'w-14 h-14 justify-center'}
                text-slate-400 hover:text-white hover:bg-white/[0.05] hover:translate-x-1
              `}
              onClick={() => setIsOpen(false)}
            >
              {/* Neon Aura Background */}
              <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/[0.03] rounded-[1.25rem] transition-colors" />
              
              <div className={`relative shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)] ${isOpen ? 'text-xl' : 'text-2xl'}`}>
                {item.icon}
              </div>
              
              <span 
                className={`font-bold text-[15px] tracking-[0.05em] uppercase transition-all duration-500
                  ${isOpen ? 'opacity-70 group-hover:opacity-100 translate-x-0' : 'opacity-0 translate-x-10 w-0 overflow-hidden'}
                `}
              >
                {item.name}
              </span>
              
              {/* Floating Highlight Pill */}
              <div className="absolute -left-1 w-1.5 h-8 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_15px_rgba(56,189,248,0.8)] blur-[1px]" />
            </Link>
          ))}
        </nav>

        {/* Bottom Panel */}
        <div className="mt-auto p-6 flex flex-col gap-4 border-t border-white/5">
          <div className={`flex items-center gap-4 transition-all ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-purple-500 p-[1px]">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" />
              </div>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'}`}>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Premium User</p>
              <p className="text-[10px] text-slate-500">Gold Subscription</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
