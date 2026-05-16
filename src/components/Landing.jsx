import React from 'react';

const Landing = () => {
  return (
    <section className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/30 shadow-[0_35px_80px_rgba(15,23,42,0.45)] glass">
      <img
        src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=1920&h=1080"
        alt="Featured Trailer Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.2),transparent_24%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent" />
      <div className="relative z-20 flex h-full items-end p-6 md:p-12">
        <div className="w-full md:w-2/3 lg:w-1/2 rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl p-8 shadow-[0_24px_64px_rgba(15,23,42,0.35)] glass">
          <span className="inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-sky-100 bg-sky-500/15 rounded-full shadow-sm shadow-sky-500/10 mb-4">
            TMDB EXCLUSIVE
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight">
            Cinematic Universe
          </h1>
          <p className="text-slate-200 mb-8 text-sm md:text-base font-medium leading-relaxed">
            Welcome to the fully upgraded React OTT platform pulling real-time data from the TMDB API. Browse trending cinema, action blockbusters, and more.
          </p>
          <button className="inline-flex items-center gap-3 rounded-full bg-sky-400/95 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-300">
            Play Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
