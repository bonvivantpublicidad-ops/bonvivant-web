import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Eye, FileText, Sun, Snowflake, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface Categoria {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ElementType;
  items: string[];
}

const categorias: Categoria[] = [
  {
    id: 'verano',
    title: 'INDUMENTARIA',
    subtitle: 'VERANO',
    description: 'Remeras, musculosas y sudaderas sin mangas. 100% algodón o poliester, ideales para el calor.',
    image: '/images/remera-personalizada-1.jpg',
    icon: Sun,
    items: ['Remeras algodón', 'Musculosas', 'Sudaderas sin mangas'],
  },
  {
    id: 'invierno',
    title: 'INDUMENTARIA',
    subtitle: 'INVIERNO',
    description: 'Buzos, camperas y chalecos. Frisa, polar y microfibra para el frío.',
    image: '/images/buzo-canguro.jpg',
    icon: Snowflake,
    items: ['Buzos canguro', 'Buzos cuello redondo', 'Camperas polar', 'Chalecos inflables'],
  },
  {
    id: 'accesorios',
    title: 'ACCESORIOS',
    subtitle: 'PERSONALIZADOS',
    description: 'Vasos térmicos, termos, mates, llaveros y más. Grabado láser y DTF UV.',
    image: '/images/mate.jpg',
    icon: Package,
    items: ['Vasos térmicos', 'Termos', 'Mates', 'Llaveros'],
  },
  {
    id: 'bordados',
    title: 'PARCHES',
    subtitle: 'BORDADOS',
    description: 'Parches personalizados para uniformes, gorras y cualquier prenda. Bordado 2D y 3D.',
    image: '/images/parches-bordados.jpg',
    icon: Package,
    items: ['Parches bordados', 'Gorras', 'Escudos'],
  },
];

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Horizontal scroll
      const container = containerRef.current;
      if (container) {
        const scrollWidth = container.scrollWidth - window.innerWidth;

        gsap.to(container, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCotizador = () => {
    const element = document.querySelector('#cotizador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="productos"
      ref={sectionRef}
      className="relative min-h-screen bg-bonvivant-cream overflow-hidden"
    >
      {/* Industrial pattern background */}
      <div className="absolute inset-0 industrial-pattern opacity-50" />

      {/* Vertical Title */}
      <div
        ref={titleRef}
        className="absolute left-4 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-20"
      >
        <h2
          className="font-display text-4xl sm:text-5xl lg:text-6xl text-bonvivant-black/10 writing-mode-vertical"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          NUESTROS PRODUCTOS
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex items-center gap-8 pl-20 sm:pl-32 lg:pl-40 pr-8 h-screen"
        style={{ width: 'fit-content' }}
      >
        {/* Section Header Card */}
        <div className="flex-shrink-0 w-[300px] sm:w-[400px] h-[70vh] flex flex-col justify-center">
          <span className="text-bonvivant-red font-accent text-2xl mb-4">
            Lo que hacemos
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-bonvivant-black mb-6">
            PRODUCTOS
            <span className="block text-bonvivant-gold">PERSONALIZADOS</span>
          </h2>
          <p className="text-bonvivant-black/70 mb-8 max-w-sm">
            Más de 14 años de experiencia en indumentaria y accesorios personalizados. 
            Cotizamos según tu diseño, cantidad y especificaciones.
          </p>
          <Button
            onClick={scrollToCotizador}
            className="w-fit bg-bonvivant-black text-bonvivant-cream font-display tracking-wider hover:bg-bonvivant-red transition-all duration-300 group"
          >
            PEDIR PRESUPUESTO
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Category Cards */}
        {categorias.map((categoria, index) => {
          const Icon = categoria.icon;
          const isHovered = hoveredCard === categoria.id;
          
          return (
            <div
              key={categoria.id}
              className="flex-shrink-0 w-[350px] sm:w-[400px] lg:w-[450px] h-[70vh] relative group"
              onMouseEnter={() => setHoveredCard(categoria.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card */}
              <div className="relative w-full h-full bg-bonvivant-black rounded-lg overflow-hidden shadow-industrial">
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={categoria.image}
                    alt={categoria.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-bonvivant-black via-bonvivant-black/50 to-transparent transition-opacity duration-500 ${
                      isHovered ? 'opacity-90' : 'opacity-70'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isHovered ? 'bg-bonvivant-gold' : 'bg-bonvivant-cream/20'
                    }`}>
                      <Icon className={`w-6 h-6 transition-colors ${
                        isHovered ? 'text-bonvivant-black' : 'text-bonvivant-cream'
                      }`} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl text-bonvivant-cream/60 mb-0">
                    {categoria.title}
                  </h3>
                  <h3
                    className={`font-display text-4xl sm:text-5xl text-bonvivant-gold mb-2 transition-transform duration-500 ${
                      isHovered ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  >
                    {categoria.subtitle}
                  </h3>

                  {/* Description */}
                  <p className="text-bonvivant-cream/70 text-sm mb-4">
                    {categoria.description}
                  </p>

                  {/* Items list */}
                  <ul className="space-y-1 mb-4">
                    {categoria.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-bonvivant-cream/60 text-xs">
                        <span className="w-1 h-1 bg-bonvivant-gold rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div
                    className={`flex gap-2 transition-all duration-500 ${
                      isHovered
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={scrollToCotizador}
                      className="border-bonvivant-cream/30 text-bonvivant-cream hover:bg-bonvivant-cream hover:text-bonvivant-black"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver más
                    </Button>
                    <Button
                      size="sm"
                      onClick={scrollToCotizador}
                      className="bg-bonvivant-gold text-bonvivant-black hover:bg-bonvivant-red hover:text-bonvivant-cream"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Cotizar
                    </Button>
                  </div>
                </div>

                {/* Index Number */}
                <div className="absolute top-6 right-6 font-display text-6xl text-bonvivant-cream/10">
                  0{index + 1}
                </div>
              </div>
            </div>
          );
        })}

        {/* End Card - CTA */}
        <div className="flex-shrink-0 w-[300px] sm:w-[350px] h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bonvivant-gold flex items-center justify-center animate-pulse">
              <FileText className="w-8 h-8 text-bonvivant-black" />
            </div>
            <h3 className="font-display text-3xl text-bonvivant-black mb-4">
              ¿TENÉS UN PROYECTO<br />EN MENTE?
            </h3>
            <p className="text-bonvivant-black/70 mb-6">
              Contanos qué necesitás y te mandamos un presupuesto a medida.
            </p>
            <Button
              onClick={scrollToCotizador}
              className="bg-bonvivant-red text-bonvivant-cream font-display tracking-wider hover:bg-bonvivant-black transition-all duration-300"
            >
              PEDIR PRESUPUESTO
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
