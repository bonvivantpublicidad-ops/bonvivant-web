import { Instagram, Facebook, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    productos: [
      { name: 'Remeras Estampadass', href: '#productos' },
      { name: 'Grabado Láser', href: '#productos' },
      { name: 'Parches Bordados', href: '#productos' },
      { name: 'Merchandising', href: '#productos' },
    ],
    empresa: [
      { name: 'Sobre Nosotros', href: '#nosotros' },
      { name: 'Cómo Comprar', href: '#' },
      { name: 'Preguntas Frecuentes', href: '#' },
      { name: 'Términos y Condiciones', href: '#' },
    ],
    contacto: [
      { name: 'Bonvivantpublicidad@gmail.com', href: 'mailto:Bonvivantpublicidad@gmail.com' },
      { name: '+549 2227 500835', href: 'tel:+5492227500835' },
      { name: 'Lobos-Buenos Aires, Argentina', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-bonvivant-black pt-20 pb-8">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bonvivant-gold via-bonvivant-red to-bonvivant-gold" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Main footer content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#hero" className="flex items-center gap-3 mb-6">
              <img
                src="/images/logo-bonvivant.svg"
                alt="Bonvivant"
                className="h-12"
              />
              <span className="font-display text-xl text-bonvivant-cream tracking-wider">
                BONVIVANT
              </span>
            </a>
            <p className="text-bonvivant-cream/60 mb-6 max-w-xs">
              Indumentaria y merchandising industrial personalizado. 
              Calidad, precisión y estilo en cada pieza.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-bonvivant-cream/10 flex items-center justify-center hover:bg-bonvivant-gold transition-colors group"
              >
                <Instagram className="w-5 h-5 text-bonvivant-cream group-hover:text-bonvivant-black transition-colors" />
              </a>
              <a
                href="https://instagram.com/bonvivantpublicidad"
                    target="_blank"
                    rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-bonvivant-cream/10 flex items-center justify-center hover:bg-bonvivant-gold transition-colors group"
              >
                <Facebook className="w-5 h-5 text-bonvivant-cream group-hover:text-bonvivant-black transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/Bonvivant.grafica"
                    target="_blank"
                    rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-bonvivant-cream/10 flex items-center justify-center hover:bg-bonvivant-gold transition-colors group"
              >
                <Mail className="w-5 h-5 text-bonvivant-cream group-hover:text-bonvivant-black transition-colors" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-lg text-bonvivant-cream mb-6">
              PRODUCTOS
            </h4>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-bonvivant-cream/60 hover:text-bonvivant-gold transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-lg text-bonvivant-cream mb-6">
              EMPRESA
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-bonvivant-cream/60 hover:text-bonvivant-gold transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-bonvivant-cream mb-6">
              CONTACTO
            </h4>
            <ul className="space-y-3">
              {footerLinks.contacto.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-bonvivant-cream/60 hover:text-bonvivant-gold transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-bonvivant-cream/10 pt-12 mb-12">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="font-display text-2xl text-bonvivant-cream mb-4">
              SUSCRIBITE A NUESTRO NEWSLETTER
            </h4>
            <p className="text-bonvivant-cream/60 mb-6">
              Recibí las últimas novedades, promociones y descuentos exclusivos.
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 bg-bonvivant-cream/5 border border-bonvivant-cream/20 rounded-lg px-4 py-3 text-bonvivant-cream placeholder:text-bonvivant-cream/30 focus:border-bonvivant-gold focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-bonvivant-gold text-bonvivant-black font-display tracking-wider px-6 py-3 rounded-lg hover:bg-bonvivant-red hover:text-bonvivant-cream transition-all duration-300"
              >
                SUSCRIBIRME
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-bonvivant-cream/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-bonvivant-cream/40 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Bonvivant. Todos los derechos reservados.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-bonvivant-cream/60 hover:text-bonvivant-gold transition-colors group"
          >
            <span className="text-sm">VOLVER ARRIBA</span>
            <div className="w-8 h-8 rounded-full bg-bonvivant-cream/10 flex items-center justify-center group-hover:bg-bonvivant-gold transition-colors">
              <ArrowUp className="w-4 h-4 group-hover:text-bonvivant-black transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
