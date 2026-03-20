import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'

export default function MovieRow({ title, movies }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps'
  })

  // Optional: Add left/right scroll buttons
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="mb-8 relative group">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-slate-100 px-4 md:px-2">{title}</h2>
      
      {/* Embla Carousel Viewport */}
      <div className="overflow-hidden px-4 md:px-2" ref={emblaRef}>
        {/* Carousel Container */}
        <div className="flex gap-4 cursor-grab active:cursor-grabbing">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="flex-none w-32 md:w-44"
            >
              <div className="aspect-[2/3] rounded-lg overflow-hidden bg-slate-800 mb-3 shadow-md border border-slate-700 hover:border-slate-400 transition-colors">
                <img 
                  src={movie.image} 
                  alt={movie.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 pointer-events-none"
                  loading="lazy"
                />
              </div>
              <h3 className="text-sm font-medium text-slate-300 hover:text-white truncate transition-colors px-1">
                {movie.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons (Netflix Style) */}
      <button 
        onClick={scrollPrev}
        className="absolute left-0 lg:-left-4 top-1/2 mt-4 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer hidden md:block"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/w/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      
      <button 
        onClick={scrollNext}
        className="absolute right-0 lg:-right-4 top-1/2 mt-4 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer hidden md:block"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/w/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  )
}
