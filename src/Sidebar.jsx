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
          ${isOpen ? 'w-72 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'}
        `}
      >
        {/* Toggle Button / Header */}
        <div className={`flex items-center w-full p-5 mb-6 ${isOpen ? 'justify-between' : 'justify-center'}`}>
          <div className={`h-10 w-10 bg-gradient-to-br from-sky-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg ${!isOpen ? '' : 'hidden'}`}>
             <span className="text-[8px] font-black text-white">OTT</span>
          </div>
          <Link to="/" className={`text-3xl font-black text-white tracking-tighter transition-all ${!isOpen ? 'opacity-0 hidden' : 'opacity-100'}`}>
            OTT<span className="text-sky-400">.</span>
          </Link>
          <button 
            onClick={toggleSidebar} 
            className={`text-slate-300 hover:text-white transition-all p-2.5 rounded-xl bg-white/5 hover:bg-white/10 ${isOpen ? '' : 'mt-2'}`}
          >
            <FaBars size={18} />
          </button>
        </div>

        {/* Search Module */}
        <div className={`px-4 mb-8 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
            />
            <span className="absolute left-3.5 top-3.5 text-slate-500">🔍</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className={`flex-1 flex flex-col gap-3 ${isOpen ? 'px-4' : 'px-2'}`}>
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className={`group relative flex items-center rounded-xl text-slate-300 hover:text-white transition-all duration-500 hover-z-axis bg-white/[0.02] hover:bg-white/[0.08]
                ${isOpen ? 'p-4 justify-start' : 'p-4 justify-center'}
              `}
              onClick={() => setIsOpen(false)}
            >
              <div className={`shrink-0 transition-colors ${isOpen ? 'text-xl' : 'text-2xl'} group-hover:text-sky-400`}>
                {item.icon}
              </div>
              <span 
                className={`ml-4 font-bold text-sm tracking-wide transition-all duration-300
                  ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
                `}
              >
                {item.name}
              </span>
              
              {/* Active Glow Indicator */}
              <div className="absolute left-0 w-1 h-6 bg-sky-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
