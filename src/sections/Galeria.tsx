import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Placeholder para las imágenes - el usuario me va a pasar las fotos reales
interface Trabajo {
  id: string;
  categoria: string;
  imagen: string;
  titulo: string;
  descripcion: string;
}

// Por ahora uso las imágenes que ya tenemos como placeholders
// Cuando el usuario me pase fotos, las reemplazamos
const trabajos: Trabajo[] = [
  {
    id: '1',
    categoria: 'remeras',
    imagen: '/images/remera-personalizada-1.jpg',
    titulo: 'Remeras Estampadas full color',
    descripcion: 'Diseño personalizado con la mejor calidad',
  },
  {
    id: '2',
    categoria: 'remeras',
    imagen: '/images/remera-personalizada-2.jpg',
    titulo: 'Remera Sublimada',
    descripcion: 'Sublimación full color en poliester',
  },
  {
    id: '3',
    categoria: 'invierno',
    imagen: '/images/buzo-canguro.jpg',
    titulo: 'Buzo Canguro',
    descripcion: 'Buzo con capucha y estampado frontal y espalda',
  },
  {
    id: '4',
    categoria: 'invierno',
    imagen: '/images/chaleco.jpg',
    titulo: 'Chaleco Inflable',
    descripcion: 'Chaleco microfibra con bordado',
  },
  {
    id: '5',
    categoria: 'accesorios',
    imagen: '/images/laser-engraving-tumbler.jpg',
    titulo: 'Vaso Térmico',
    descripcion: 'Grabado láser en acero inoxidable',
  },
  {
    id: '6',
    categoria: 'accesorios',
    imagen: '/images/mate.jpg',
    titulo: 'Mate Personalizado',
    descripcion: 'Mate con grabado láser personalizado',
  },
  {
    id: '7',
    categoria: 'parches',
    imagen: '/images/parches-bordados.jpg',
    titulo: 'Parches Bordados',
    descripcion: 'Parches personalizados 2D y 3D',
  },
  {
    id: '8',
    categoria: 'llaveros',
    imagen: '/images/llavero-cinta.jpg',
    titulo: 'Llaveros Cinta',
    descripcion: 'Llaveros sublimados 15cm',
  },
  {
    id: '9',
    categoria: 'llaveros',
    imagen: '/images/llavero-cuero.jpg',
    titulo: 'Llaveros Cuero',
    descripcion: 'Llaveros cuero con grabado láser',
  },
  {
    id: '10',
    categoria: 'merchandising',
    imagen: '/images/products-collection.jpg',
    titulo: 'Kit Corporativo',
    descripcion: 'Kit completo de merchandising',
  },
];

const categoriasGaleria = [
  { id: 'todos', nombre: 'TODOS' },
  { id: 'remeras', nombre: 'REMERAS' },
  { id: 'invierno', nombre: 'INVIERNO' },
  { id: 'accesorios', nombre: 'ACCESORIOS' },
  { id: 'parches', nombre: 'PARCHES' },
  { id: 'llaveros', nombre: 'LLAVEROS' },
];

const Galeria = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [imagenAmpliada, setImagenAmpliada] = useState<Trabajo | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const trabajosFiltrados = categoriaActiva === 'todos' 
    ? trabajos 
    : trabajos.filter(t => t.categoria === categoriaActiva);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.galeria-content',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="relative py-24 bg-bonvivant-cream overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 industrial-pattern opacity-30" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center mb-12 galeria-content">
          <span className="text-bonvivant-red font-accent text-2xl mb-4 block">
            Nuestros trabajos
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-bonvivant-black mb-6">
            GALERÍA DE
            <span className="block text-bonvivant-gold">TRABAJOS</span>
          </h2>
          <p className="text-bonvivant-black/70 max-w-2xl mx-auto text-lg">
            Algunos de los proyectos que realizamos. Cada pieza es única y hecha con la mejor calidad.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 galeria-content">
          {categoriasGaleria.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`px-6 py-3 rounded-full font-display tracking-wider transition-all duration-300 ${
                categoriaActiva === cat.id
                  ? 'bg-bonvivant-black text-bonvivant-cream'
                  : 'bg-bonvivant-black/10 text-bonvivant-black hover:bg-bonvivant-black/20'
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative galeria-content">
          {/* Navigation Buttons */}
          <button
            onClick={() => scrollCarousel('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-bonvivant-black text-bonvivant-cream rounded-full flex items-center justify-center hover:bg-bonvivant-gold hover:text-bonvivant-black transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-bonvivant-black text-bonvivant-cream rounded-full flex items-center justify-center hover:bg-bonvivant-gold hover:text-bonvivant-black transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-16 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trabajosFiltrados.map((trabajo) => (
              <div
                key={trabajo.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] group cursor-pointer"
                onClick={() => setImagenAmpliada(trabajo)}
              >
                <div className="relative overflow-hidden rounded-xl bg-bonvivant-black shadow-industrial">
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={trabajo.imagen}
                      alt={trabajo.titulo}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bonvivant-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-bonvivant-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ZoomIn className="w-5 h-5 text-bonvivant-black" />
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display text-xl text-bonvivant-cream mb-1">
                      {trabajo.titulo}
                    </h3>
                    <p className="text-bonvivant-cream/70 text-sm">
                      {trabajo.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.min(trabajosFiltrados.length, 5) }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-bonvivant-black/20"
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {imagenAmpliada && (
        <div
          className="fixed inset-0 z-50 bg-bonvivant-black/95 flex items-center justify-center p-4"
          onClick={() => setImagenAmpliada(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-bonvivant-cream/10 rounded-full flex items-center justify-center hover:bg-bonvivant-red transition-colors"
            onClick={() => setImagenAmpliada(null)}
          >
            <X className="w-6 h-6 text-bonvivant-cream" />
          </button>
          
          <div
            className="max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imagenAmpliada.imagen}
              alt={imagenAmpliada.titulo}
              className="max-w-full max-h-[70vh] object-contain rounded-xl"
            />
            <div className="mt-4 text-center">
              <h3 className="font-display text-2xl text-bonvivant-cream">
                {imagenAmpliada.titulo}
              </h3>
              <p className="text-bonvivant-cream/70">
                {imagenAmpliada.descripcion}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Galeria;
