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
    { name: 'Movies', icon: <MdMovie size={24} />, path: '#indian-cinema' },
    { name: 'Trending', icon: <FaFire size={24} />, path: '#trending' },
    { name: 'Watchlist', icon: <FaBookmark size={24} />, path: '/' },
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
        className={`fixed top-0 left-0 h-screen bg-slate-950/40 backdrop-blur-3xl border-r border-white/10 shadow-[0_0_60px_rgba(15,23,42,0.35)] z-50 flex flex-col transition-all duration-300
          ${isOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'}
        `}
      >
        {/* Toggle Button / Header */}
        <div className={`flex items-center p-6 ${isOpen ? 'justify-between' : 'justify-center'}`}>
          <Link to="/" className={`text-3xl font-extrabold text-sky-300 tracking-tighter transition-opacity ${!isOpen ? 'opacity-0 hidden' : 'opacity-100'}`}>
            OTT
          </Link>
          <button 
            onClick={toggleSidebar} 
            className="text-slate-300 hover:text-white transition-colors"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col gap-2 px-3 mt-4">
          {menuItems.map((item, index) => (
            <a 
              key={index} 
              href={item.path}
              className="flex items-center p-3 rounded-xl hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors cursor-pointer group"
              onClick={() => setIsOpen(false)}
            >
              <div className="shrink-0">{item.icon}</div>
              <span 
                className={`ml-5 font-semibold text-[15px] whitespace-nowrap transition-all duration-300
                  ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
                `}
              >
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
