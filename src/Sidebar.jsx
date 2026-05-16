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

      {/* Next-Gen Floating Navigation Rail */}
      <aside 
        className="fixed top-8 left-8 bottom-8 w-[96px] glass-panel smokey-edge z-50 flex flex-col items-center py-12 rounded-[2.5rem] gpu-accelerated light-sweep"
      >
        {/* Optical Branding Module */}
        <div className="relative mb-20 group">
          <Link to="/" className="relative h-14 w-14 bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-600 rounded-[1.75rem] flex items-center justify-center shadow-2xl shadow-sky-500/30 ring-1 ring-white/20 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
             <span className="text-[10px] font-black text-white tracking-[0.2em]">OTT</span>
             {/* Emissive Aura */}
             <div className="absolute inset-0 bg-sky-400/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </Link>
        </div>

        {/* High-Fidelity Navigation Stack */}
        <nav className="flex-1 flex flex-col gap-8 w-full px-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={index} 
                to={item.path}
                className={`group relative w-full aspect-square rounded-[1.5rem] flex items-center justify-center transition-all duration-500 
                  ${isActive ? 'active-capsule text-sky-400' : 'text-slate-500 hover:text-white hover:bg-white/[0.05]'}
                `}
              >
                {/* Magnetic Interaction Layer */}
                <div className={`relative z-10 transition-all duration-700 group-hover:scale-125 group-active:scale-90 ${isActive ? 'drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]' : ''}`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                
                {/* Cinematic Tooltip */}
                <div className="absolute left-[110%] px-5 py-2.5 bg-[#081120]/95 backdrop-blur-3xl border border-white/10 rounded-[1rem] text-[9px] font-black uppercase tracking-[0.25em] text-white opacity-0 scale-90 translate-x-[-20px] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-500 pointer-events-none shadow-2xl ring-1 ring-white/5">
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Global Action Tier */}
        <div className="mt-auto pt-10 border-t border-white/10 w-full flex flex-col items-center gap-8">
          <button className="group relative w-12 h-12 rounded-[1.25rem] bg-white/[0.03] flex items-center justify-center text-slate-500 hover:text-sky-400 transition-all duration-500 hover:shadow-lg hover:shadow-sky-500/10">
            <span className="text-xl transition-transform duration-500 group-hover:scale-125">🔍</span>
          </button>
          <div className="relative w-12 h-12 rounded-full p-[1.5px] bg-gradient-to-tr from-sky-400 via-purple-500 to-indigo-600 animate-pulse-glow">
            <div className="w-full h-full rounded-full bg-[#050816] overflow-hidden ring-2 ring-[#050816]">
              <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" className="transition-transform duration-1000 hover:scale-125" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
