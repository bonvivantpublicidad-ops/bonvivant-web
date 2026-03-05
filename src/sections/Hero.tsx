import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Hero image entrance
      tl.fromTo(
        imageRef.current,
        { scale: 1.2, filter: 'blur(10px)' },
        { scale: 1, filter: 'blur(0px)', duration: 1.4 }
      );

      // Pattern rotation
      gsap.to(patternRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      });

      // Title character animation
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { y: '100%', rotateX: 90, opacity: 0 },
          {
            y: '0%',
            rotateX: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.03,
            ease: 'back.out(1.7)',
          },
          '-=1'
        );
      }

      // Subtitle entrance
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
        '-=0.4'
      );

      // Scroll parallax effect
      gsap.to(imageRef.current, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToCotizador = () => {
    const element = document.querySelector('#cotizador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleText = 'PERSONALIZÁ';
  const titleText2 = 'TU ESTILO';

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-bonvivant-black"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/images/hero-industrial-workspace.jpg"
          alt="Productos personalizados"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-bonvivant-black via-bonvivant-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bonvivant-black via-transparent to-bonvivant-black/50" />
      </div>

      {/* Geometric Pattern Overlay */}
      <div
        ref={patternRef}
        className="absolute top-1/2 right-0 w-[800px] h-[800px] opacity-10 pointer-events-none"
        style={{ transform: 'translate(30%, -50%)' }}
      >
        <img
          src="/images/geometric-industrial-pattern.jpg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-32">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bonvivant-gold/10 border border-bonvivant-gold/30 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-bonvivant-gold" />
              <span className="text-sm font-medium text-bonvivant-gold tracking-wider">
                PRODUCTOS PERSONALIZADOS DE CALIDAD
              </span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-bonvivant-cream leading-none mb-4"
              style={{ perspective: '1000px' }}
            >
              <span className="block overflow-hidden">
                {titleText.split('').map((char, i) => (
                  <span
                    key={i}
                    className="char inline-block"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <span className="block overflow-hidden text-bonvivant-gold">
                {titleText2.split('').map((char, i) => (
                  <span
                    key={i}
                    className="char inline-block"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-bonvivant-cream/80 max-w-xl mb-10 font-light leading-relaxed"
            >
              Desde remeras bordadas hasta vasos con grabado láser. 
              Cada pieza es única, hecha con la calidad y durabilidad que tu marca merece.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={scrollToCotizador}
                className="group bg-bonvivant-gold text-bonvivant-black font-display text-lg tracking-wider px-8 py-6 hover:bg-bonvivant-red hover:text-bonvivant-cream transition-all duration-300 shadow-gold hover:shadow-red"
              >
                PEDIR PRESUPUESTO
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const element = document.querySelector('#productos');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-bonvivant-cream/30 text-bonvivant-cream font-display text-lg tracking-wider px-8 py-6 hover:bg-bonvivant-cream/10 hover:border-bonvivant-gold transition-all duration-300"
              >
                VER PRODUCTOS
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
              {[
                { value: '500+', label: 'Clientes' },
                { value: '10K+', label: 'Proyectos' },
                { value: '5★', label: 'Rating' },
              ].map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="font-display text-3xl sm:text-4xl text-bonvivant-gold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-bonvivant-cream/60 tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bonvivant-cream to-transparent z-20" />
    </section>
  );
};

export default Hero;
