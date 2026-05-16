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

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-screen smokey-border smokey-edge z-50 flex flex-col transition-all duration-500
          ${isOpen ? 'w-72 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-28'}
        `}
      >
        {/* Toggle Button / Header */}
        <div className={`flex items-center p-8 mb-10 ${isOpen ? 'justify-between' : 'justify-center'}`}>
          <div className={`h-12 w-12 bg-gradient-to-br from-sky-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg ${!isOpen ? '' : 'hidden'}`}>
             <span className="text-[10px] font-black text-white">OTT</span>
          </div>
          <Link to="/" className={`text-4xl font-black text-white tracking-tighter transition-all ${!isOpen ? 'opacity-0 hidden' : 'opacity-100'}`}>
            OTT<span className="text-sky-400">.</span>
          </Link>
          <button 
            onClick={toggleSidebar} 
            className="text-slate-300 hover:text-white transition-all p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:scale-110 active:scale-95"
          >
            <FaBars size={20} />
          </button>
        </div>

        {/* Search Module */}
        <div className={`px-6 mb-10 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search movies..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all"
            />
            <span className="absolute left-4 top-4 text-slate-500 group-focus-within:text-sky-400 transition-colors">🔍</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col gap-5 px-6">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className="group relative flex items-center p-4 rounded-2xl text-slate-300 hover:text-white transition-all duration-500 hover-z-axis bg-white/[0.02] hover:bg-white/[0.08]"
              onClick={() => setIsOpen(false)}
            >
              <div className="shrink-0 text-2xl group-hover:text-sky-400 transition-colors">{item.icon}</div>
              <span 
                className={`ml-6 font-bold text-[15px] tracking-wide transition-all duration-300
                  ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
                `}
              >
                {item.name}
              </span>
              
              {/* Active Glow Indicator */}
              <div className="absolute left-[-24px] w-2 h-8 bg-sky-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-all blur-sm" />
              <div className="absolute left-[-24px] w-1 h-8 bg-sky-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
