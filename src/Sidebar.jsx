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

      {/* Fixed High-Fidelity Navigation Rail */}
      <aside 
        className="fixed top-8 left-8 bottom-8 w-[110px] glass-panel smokey-edge z-50 flex flex-col items-center py-12 rounded-[3rem] gpu-accelerated light-sweep"
      >
        {/* Optical Branding */}
        <div className="mb-20">
          <Link to="/" className="group block h-14 w-14 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-sky-500/20 ring-1 ring-white/10 transition-all duration-500 hover:scale-110 active:scale-95">
             <span className="text-[10px] font-black text-white tracking-widest">OTT</span>
             {/* Luminous Glow Pulse */}
             <div className="absolute inset-0 bg-sky-400/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </div>

        {/* Strict Grid Navigation */}
        <nav className="flex-1 flex flex-col gap-6 w-full px-3">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={index} 
                to={item.path}
                className={`group relative w-full aspect-square rounded-[1.5rem] flex items-center justify-center transition-all duration-500 
                  ${isActive ? 'active-capsule text-sky-400' : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.03]'}
                `}
              >
                <div className={`relative z-10 transition-all duration-500 group-hover:scale-110 ${isActive ? 'drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]' : ''}`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                
                {/* Tooltip on Hover */}
                <div className="absolute left-[110%] px-4 py-2 bg-slate-900/90 backdrop-blur-xl border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500 pointer-events-none whitespace-nowrap shadow-2xl">
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile - Bottom Alignment */}
        <div className="mt-auto pt-8 border-t border-white/5 w-full flex flex-col items-center gap-6">
          <button className="w-12 h-12 rounded-[1.25rem] bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
            🔍
          </button>
          <div className="w-12 h-12 rounded-full p-[1px] bg-gradient-to-tr from-sky-400 to-purple-500">
            <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden ring-2 ring-slate-950">
              <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
