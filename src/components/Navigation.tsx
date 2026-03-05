import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Productos', href: '#productos' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Cotizar', href: '#cotizador' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-bonvivant-black/95 backdrop-blur-md py-3 shadow-industrial'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-3 group"
            >
              <img
                src="/images/logo-bonvivant.svg"
                alt="Bonvivant"
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-10' : 'h-12'
                }`}
              />
              <span
                className={`font-display text-xl tracking-wider transition-colors duration-300 ${
                  isScrolled ? 'text-bonvivant-cream' : 'text-bonvivant-cream'
                }`}
              >
                BONVIVANT
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="font-display text-sm tracking-widest text-bonvivant-cream/80 hover:text-bonvivant-gold transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bonvivant-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-bonvivant-cream hover:text-bonvivant-gold hover:bg-transparent"
              >
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-bonvivant-cream hover:text-bonvivant-gold hover:bg-transparent relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-bonvivant-red text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </Button>
              <Button
                className="bg-bonvivant-gold text-bonvivant-black font-display tracking-wider hover:bg-bonvivant-red hover:text-bonvivant-cream transition-all duration-300"
              >
                PRESUPUESTO
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-bonvivant-cream"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-bonvivant-black/98 backdrop-blur-lg transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="font-display text-3xl tracking-widest text-bonvivant-cream hover:text-bonvivant-gold transition-colors duration-300"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {link.name}
            </a>
          ))}
          <Button
            className="mt-8 bg-bonvivant-gold text-bonvivant-black font-display tracking-wider hover:bg-bonvivant-red hover:text-bonvivant-cream transition-all duration-300"
            style={{
              transitionDelay: isMobileMenuOpen ? '400ms' : '0ms',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            PRESUPUESTO
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
