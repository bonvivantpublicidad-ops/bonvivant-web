import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'PILA 128 - Lobos-Buenos Aires, Argentina',
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+549 2227 500835',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'Bonvivantpublicidad@gmail.com',
    },
    {
      icon: Clock,
      title: 'Horario',
      content: 'Lun - Vie: 9:00 - 18:00',
    },
  ];

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative py-24 bg-bonvivant-gold overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/geometric-industrial-pattern.jpg')`,
            backgroundSize: '400px',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - Info */}
          <div className="contact-content">
            <span className="text-bonvivant-red font-accent text-2xl mb-4 block">
              Estemos en contacto
            </span>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-bonvivant-black mb-6">
              CONTACTANOS
            </h2>
            <p className="text-bonvivant-black/70 text-lg mb-10 max-w-md">
              ¿Tenés un proyecto en mente? Escribinos y te ayudamos a hacerlo realidad.
            </p>

            {/* Contact info cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-bonvivant-black/5 rounded-xl hover:bg-bonvivant-black/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-bonvivant-black flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-bonvivant-gold" />
                    </div>
                    <div>
                      <div className="font-display text-sm text-bonvivant-black/60 mb-1">
                        {info.title}
                      </div>
                      <div className="text-bonvivant-black font-medium">
                        {info.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social links */}
            <div>
              <div className="font-display text-sm text-bonvivant-black/60 mb-4">
                SEGUINOS
              </div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-bonvivant-black flex items-center justify-center hover:bg-bonvivant-red transition-colors group"
                >
                  <Instagram className="w-5 h-5 text-bonvivant-gold group-hover:text-bonvivant-cream transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/bonvivantpublicidad"
                      target="_blank"
                      rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-bonvivant-black flex items-center justify-center hover:bg-bonvivant-red transition-colors group"
                >
                  <Facebook className="w-5 h-5 text-bonvivant-gold group-hover:text-bonvivant-cream transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/Bonvivant.grafica"
                      target="_blank"
                      rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-bonvivant-cream/10 flex items-center justify-center hover:bg-bonvivant-gold transition-colors group"
                 >
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="contact-content">
            <div className="bg-bonvivant-black rounded-2xl p-8 shadow-industrial">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bonvivant-gold flex items-center justify-center animate-pulse-glow">
                    <Send className="w-8 h-8 text-bonvivant-black" />
                  </div>
                  <h3 className="font-display text-3xl text-bonvivant-cream mb-4">
                    ¡MENSAJE ENVIADO!
                  </h3>
                  <p className="text-bonvivant-cream/70">
                    Gracias por contactarnos. Te responderemos a la brevedad.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl text-bonvivant-cream mb-6">
                    ENVIANOS UN MENSAJE
                  </h3>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="relative">
                      <label className="block text-bonvivant-cream/60 text-sm mb-2">
                        Nombre
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          required
                          placeholder="Tu nombre"
                          className="bg-transparent border-0 border-b-2 border-bonvivant-cream/20 rounded-none text-bonvivant-cream placeholder:text-bonvivant-cream/30 focus:border-bonvivant-gold focus:ring-0 transition-colors"
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                        />
                        <div
                          className={`absolute bottom-0 left-0 h-0.5 bg-bonvivant-gold transition-all duration-500 ${
                            focusedField === 'name' ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label className="block text-bonvivant-cream/60 text-sm mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Input
                          type="email"
                          required
                          placeholder="tu@email.com"
                          className="bg-transparent border-0 border-b-2 border-bonvivant-cream/20 rounded-none text-bonvivant-cream placeholder:text-bonvivant-cream/30 focus:border-bonvivant-gold focus:ring-0 transition-colors"
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                        />
                        <div
                          className={`absolute bottom-0 left-0 h-0.5 bg-bonvivant-gold transition-all duration-500 ${
                            focusedField === 'email' ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <label className="block text-bonvivant-cream/60 text-sm mb-2">
                        Teléfono
                      </label>
                      <div className="relative">
                        <Input
                          type="tel"
                          placeholder="+54 11 1234-5678"
                          className="bg-transparent border-0 border-b-2 border-bonvivant-cream/20 rounded-none text-bonvivant-cream placeholder:text-bonvivant-cream/30 focus:border-bonvivant-gold focus:ring-0 transition-colors"
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                        />
                        <div
                          className={`absolute bottom-0 left-0 h-0.5 bg-bonvivant-gold transition-all duration-500 ${
                            focusedField === 'phone' ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <label className="block text-bonvivant-cream/60 text-sm mb-2">
                        Mensaje
                      </label>
                      <div className="relative">
                        <Textarea
                          required
                          placeholder="Contanos sobre tu proyecto..."
                          rows={4}
                          className="bg-transparent border-0 border-b-2 border-bonvivant-cream/20 rounded-none text-bonvivant-cream placeholder:text-bonvivant-cream/30 focus:border-bonvivant-gold focus:ring-0 transition-colors resize-none"
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                        />
                        <div
                          className={`absolute bottom-0 left-0 h-0.5 bg-bonvivant-gold transition-all duration-500 ${
                            focusedField === 'message' ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-bonvivant-gold text-bonvivant-black font-display tracking-wider hover:bg-bonvivant-red hover:text-bonvivant-cream transition-all duration-300 group mt-8"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-bonvivant-black border-t-transparent rounded-full animate-spin" />
                          ENVIANDO...
                        </span>
                      ) : (
                        <>
                          ENVIAR MENSAJE
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
