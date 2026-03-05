import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, Users, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Award,
    title: 'Calidad Premium',
    description: 'Materiales de primera calidad y acabados impecables',
  },
  {
    icon: Users,
    title: 'Atención Personalizada',
    description: 'Te acompañamos en todo el proceso de diseño',
  },
  {
    icon: Clock,
    title: 'Entrega Puntual',
    description: 'Cumplimos con los plazos acordados siempre',
  },
  {
    icon: Zap,
    title: 'Producción Rápida',
    description: 'Tiempos de producción optimizados',
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax (reverse)
      gsap.fromTo(
        imageRef.current,
        { y: 100 },
        {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Features stagger
      gsap.fromTo(
        '.feature-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="relative py-24 bg-bonvivant-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bonvivant-black via-bonvivant-black to-bonvivant-red/5" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <span className="text-bonvivant-gold font-accent text-2xl mb-4 block">
              Conocenos
            </span>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-bonvivant-cream mb-6">
              ¿QUIÉNES
              <span className="block text-bonvivant-gold">SOMOS?</span>
            </h2>

            <div className="space-y-4 text-bonvivant-cream/80 text-lg leading-relaxed mb-8">
              <p>
                En <span className="text-bonvivant-gold font-medium">Bonvivant</span>, nos especializamos en crear productos personalizados que reflejan tu identidad. Desde remeras bordadas hasta vasos con grabado láser, cada pieza es única.
              </p>
              <p>
                Trabajamos con <span className="text-bonvivant-red font-medium">calidad y durabilidad</span> como pilares fundamentales. Nuestro equipo de diseñadores y técnicos está listo para llevar tus ideas a la realidad.
              </p>
              <p>
                Ya sea que necesites uniformes para tu equipo, merchandising para tu empresa, productos para un evento especial, o simplemente algo único para vos, estamos aquí para ayudarte.
              </p>
            </div>

            <Button
              onClick={() => {
                const element = document.querySelector('#cotizador');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-bonvivant-gold text-bonvivant-black font-display tracking-wider hover:bg-bonvivant-red hover:text-bonvivant-cream transition-all duration-300 group"
            >
              PEDIR PRESUPUESTO
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div
              ref={imageRef}
              className="relative"
              style={{ willChange: 'transform' }}
            >
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-industrial">
                <img
                  src="/images/workwear-detail.jpg"
                  alt="Bonvivant trabajo detalle"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bonvivant-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-bonvivant-gold rounded-xl p-6 shadow-gold">
                <div className="font-display text-4xl text-bonvivant-black">14+</div>
                <div className="text-bonvivant-black/70 text-sm">Años de<br />experiencia</div>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-bonvivant-gold/30 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card group p-6 bg-bonvivant-cream/5 border border-bonvivant-cream/10 rounded-xl hover:bg-bonvivant-gold/10 hover:border-bonvivant-gold/30 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-bonvivant-gold/20 flex items-center justify-center mb-4 group-hover:bg-bonvivant-gold group-hover:scale-110 transition-all duration-500">
                  <Icon className="w-6 h-6 text-bonvivant-gold group-hover:text-bonvivant-black transition-colors" />
                </div>
                <h3 className="font-display text-xl text-bonvivant-cream mb-2">
                  {feature.title}
                </h3>
                <p className="text-bonvivant-cream/60 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
