import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Plus, Minus, Upload, X, Shirt, Coffee, Award, Package, 
  Send, Check, FileImage, AlertCircle, Sun, Snowflake, AlertTriangle, HardHat, Key
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

// Categorías de productos - AHORA 6 CATEGORÍAS
const categorias = [
  { id: 'verano', nombre: 'VERANO', icon: Sun, color: 'text-bonvivant-gold' },
  { id: 'invierno', nombre: 'INVIERNO', icon: Snowflake, color: 'text-bonvivant-sky-blue' },
  { id: 'gorras', nombre: 'GORRAS', icon: HardHat, color: 'text-bonvivant-gold' },
  { id: 'parches', nombre: 'PARCHES', icon: Award, color: 'text-bonvivant-red' },
  { id: 'llaveros', nombre: 'LLAVEROS', icon: Key, color: 'text-bonvivant-gold' },
  { id: 'laser', nombre: 'LÁSER', icon: Coffee, color: 'text-bonvivant-cream' },
];

// Productos organizados por categoría
const productosBase = [
  // === VERANO ===
  {
    id: 'remera-spum-blanca',
    categoria: 'verano',
    nombre: 'Remera SPUM Blanca',
    descripcion: '100% Poliéster SPUM - SOLO SUBLIMACIÓN',
    icon: Shirt,
    imagen: '/images/remera-spum-blanca.jpg',
    colores: ['Blanco'],
    talles: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    tiposPersonalizado: ['Sublimación'],
    restriccion: 'Solo sublimación'
  },
  {
    id: 'remera-spum-gris',
    categoria: 'verano',
    nombre: 'Remera SPUM Gris Melange',
    descripcion: '100% Poliéster SPUM - SOLO SUBLIMACIÓN',
    icon: Shirt,
    imagen: '/images/remera-spum-gris.jpg',
    colores: ['Gris Melange'],
    talles: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    tiposPersonalizado: ['Sublimación'],
    restriccion: 'Solo sublimación'
  },
  {
    id: 'remera-algodon',
    categoria: 'verano',
    nombre: 'Remera Algodón',
    descripcion: '100% algodón peinado, 24/1, 180-200gsm - NO SUBLIMABLE',
    icon: Shirt,
    imagen: '/images/remera-personalizada-1.jpg',
    colores: ['Blanco', 'Negro', 'Gris', 'Azul marino', 'Rojo', 'azul francia', 'Verde', 'Amarillo', 'Naranja'],
    talles: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    tiposPersonalizado: ['Bordado', 'Estampado DTG', 'Transfer', 'Vinilo textil'],
    restriccion: 'NO SUBLIMABLE'
  },
  {
    id: 'chomba-pique',
    categoria: 'verano',
    nombre: 'Chomba Piqué',
    descripcion: 'Poliéster, ideal para uniformes',
    icon: Shirt,
    imagen: '/images/chomba-pique.jpg',
    colores: ['Blanco', 'Negro', 'Azul', 'Gris'],
    talles: ['S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Sublimación', 'Bordado'],
  },
  {
    id: 'musculosa',
    categoria: 'verano',
    nombre: 'Musculosa',
    descripcion: '100% algodón o poliester, ideal para deporte',
    icon: Shirt,
    imagen: '/images/musculosa.jpg',
    colores: ['Blanco', 'Negro', 'Gris', 'Azul marino', 'Rojo', 'Verde'],
    talles: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Bordado', 'Estampado', 'Sublimación', 'Vinilo textil'],
  },
  {
    id: 'sudadera-sin-mangas',
    categoria: 'verano',
    nombre: 'Sudadera Sin Mangas',
    descripcion: 'Frisa liviana o algodón, ideal para entrenar',
    icon: Shirt,
    imagen: '/images/remera-personalizada-2.jpg',
    colores: ['Blanco', 'Negro', 'Gris', 'Azul marino', 'Rojo'],
    talles: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Bordado', 'Estampado', 'Sublimación'],
  },

  // === INVIERNO ===
  {
    id: 'buzo-canguro',
    categoria: 'invierno',
    nombre: 'Buzo Canguro',
    descripcion: 'Frisa o algodón, con bolsillo delantero',
    icon: Shirt,
    imagen: '/images/buzo-canguro.jpg',
    colores: ['Negro', 'Gris', 'Azul marino', 'Rojo', 'Verde', 'Beige'],
    talles: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    tiposPersonalizado: ['Bordado', 'Estampado', 'Vinilo textil'],
  },
  {
    id: 'buzo-redondo',
    categoria: 'invierno',
    nombre: 'Buzo Cuello Redondo',
    descripcion: 'Frisa premium, cuello redondo clásico',
    icon: Shirt,
    imagen: '/images/buzo-canguro.jpg',
    colores: ['Negro', 'Gris', 'Azul marino', 'Rojo', 'Verde'],
    talles: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    tiposPersonalizado: ['Bordado', 'Estampado', 'Vinilo textil'],
  },  
  {
    id: 'campera-friza-capucha',
    categoria: 'invierno',
    nombre: 'Campera Friza con Capucha',
    descripcion: 'Friza/Algodón - NO SUBLIMABLE',
    icon: Shirt,
    imagen: '/images/campera-friza.jpg',
    colores: ['Negro', 'Gris', 'Azul', 'Verde'],
    talles: ['S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Bordado', 'DTF'],
  },
  {
    id: 'buzo-polar-medio-cierre',
    categoria: 'invierno',
    nombre: 'Buzo Polar Medio Cierre',
    descripcion: 'Polar grueso - SOLO BORDADO',
    icon: Shirt,
    imagen: '/images/buzo-polar.jpg',
    colores: ['Negro', 'Azul Marino', 'Gris'],
    talles: ['S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Bordado'],
    restriccion: 'SOLO BORDADO'
  },
  {
    id: 'campera-polar',
    categoria: 'invierno',
    nombre: 'Campera de Polar',
    descripcion: 'Polar - SOLO BORDADO',
    icon: Shirt,
    imagen: '/images/campera-polar.jpg',
    colores: ['Negro', 'Azul', 'Gris'],
    talles: ['S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Bordado'],
    restriccion: 'SOLO BORDADO'
  },
  {
    id: 'chaleco-polar',
    categoria: 'invierno',
    nombre: 'Chaleco de Polar',
    descripcion: 'Polar cálido - SOLO BORDADO',
    icon: Shirt,
    imagen: '/images/chaleco.jpg',
    colores: ['Negro', 'Azul Marino', 'Gris'],
    talles: ['S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Bordado'],
    restriccion: 'SOLO BORDADO'
  },
  {
    id: 'chaleco-inflable',
    categoria: 'invierno',
    nombre: 'Chaleco Inflable',
    descripcion: 'trucker, relleno guata - NO SUBLIMABLE',
    icon: Shirt,
    imagen: '/images/campera-friza.jpg',
    colores: ['Negro', 'Blanco', 'Azul'],
    talles: ['S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Bordado', 'DTF'],
    restriccion: 'NO SUBLIMABLE'
  },
  {
    id: 'campera-inflable-trucker',
    categoria: 'invierno',
    nombre: 'Campera Inflable Trucker',
    descripcion: 'Tela Trucker resistente, ideal para exterior',
    icon: Shirt,
    imagen: '/images/campera-trucker.jpg',
    colores: ['Negro', 'Azul', 'Naranja', 'Verde'],
    talles: ['S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Estampado', 'Bordado'],
  },
  {
    id: 'campera-rompeviento',
    categoria: 'invierno',
    nombre: 'Campera Rompe Viento',
    descripcion: 'Microfibra - SOLO ESTAMPADO',
    icon: Shirt,
    imagen: '/images/rompeviento.jpg',
    colores: ['Negro', 'Azul', 'Rojo', 'Verde'],
    talles: ['S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Estampado'],
    restriccion: 'SOLO ESTAMPADO'
  },
  {
    id: 'chaleco',
    categoria: 'invierno',
    nombre: 'Chaleco Inflable',
    descripcion: 'Microfibra inflable, solo bordado',
    icon: Shirt,
    imagen: '/images/chaleco.jpg',
    colores: ['Negro', 'Gris', 'Azul marino', 'Rojo', 'Verde', 'Naranja'],
    talles: ['S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Bordado (única opción)'],
  },

  // === GORRAS ===
  {
    id: 'gorra-trucker-blanco',
    categoria: 'gorras',
    nombre: 'Trucker Poliéster Frente Blanco',
    descripcion: 'Frente blanco sublimable',
    icon: Package,
    imagen: '/images/gorra-trucker-blanco.jpg',
    colores: ['Negro', 'Gris', 'Azul marino', 'Rojo', 'Verde ingles', 'Naranja', 'Azul francia', 'Verde Benetton', 'Bordo', 'Verde militar', 'Blanco', 'Violeta', 'CAMUFLADO'],
    talles: ['Ajustable'],
    tiposPersonalizado: ['Sublimación', 'DTF', 'Parche Bordado'],
  },
  {
    id: 'gorra-trucker-color',
    categoria: 'gorras',
    nombre: 'Trucker Poliéster Frente Color',
    descripcion: 'Frente color',
    icon: Package,
    imagen: '/images/gorra-trucker-color.jpg',
    colores: ['Negro', 'Gris', 'Azul marino', 'Rojo', 'Verde ingles', 'Naranja', 'Azul francia', 'Verde Benetton', 'Bordo', 'Verde militar', 'Blanco', 'Violeta', 'CAMUFLADO'],
    talles: ['Ajustable'],
    tiposPersonalizado: ['DTF', 'Parche Bordado'],
  },
  {
    id: 'gorra-trucker-gabardina',
    categoria: 'gorras',
    nombre: 'Trucker Gabardina',
    descripcion: 'Gabardina resistente',
    icon: Package,
    imagen: '/images/gorra-trucker-gabardina.jpg',
    colores: ['Negro', 'Azul', 'Blanca', 'Verde', 'Rojo', 'Arena', 'Gris', 'Francia', 'CAMUFLADO'],
    talles: ['Ajustable'],
    tiposPersonalizado: ['DTF', 'Parche Bordado'],
  },
  {
    id: 'gorra-5gajos',
    categoria: 'gorras',
    nombre: 'Gabardina 5 Gajos Velcro',
    descripcion: '5 gajos con cierre velcro',
    icon: Package,
    imagen: '/images/gorra-5gajos.jpg',
    colores: ['Negro', 'Azul', 'Blanca', 'Verde', 'Rojo', 'Arena', 'Gris', 'Francia'],
    talles: ['Ajustable'],
    tiposPersonalizado: ['DTF', 'Parche Bordado'],
  },
  {
    id: 'gorra-6gajos',
    categoria: 'gorras',
    nombre: 'Gabardina 6 Gajos Hebilla',
    descripcion: '6 gajos con hebilla metálica',
    icon: Package,
    imagen: '/images/gorra-6gajos.jpg',
    colores: ['Negro', 'Azul', 'Blanca', 'Verde', 'Rojo', 'Arena', 'Gris', 'Francia'],
    talles: ['Ajustable'],
    tiposPersonalizado: ['DTF', 'Parche Bordado'],
  },
  {
    id: 'piluso',
    categoria: 'gorras',
    nombre: 'Piluso',
    descripcion: 'Algodón/Gabardina',
    icon: Package,
    imagen: '/images/piluso.jpg',
    colores: ['Negro', 'Azul', 'Blanca', 'Verde', 'Rojo', 'Arena', 'Gris', 'Francia', 'CAMUFLADO'],
    talles: ['Ajustable'],
    tiposPersonalizado: ['DTF', 'Parche Bordado'],
  },
  {
    id: 'australiano',
    categoria: 'gorras',
    nombre: 'Australiano',
    descripcion: 'Más grande que piluso',
    icon: Package,
    imagen: '/images/australiano.jpg',
    colores: ['Negro', 'Azul', 'Blanca', 'Verde', 'Rojo', 'Arena', 'Gris', 'Francia', 'CAMUFLADO'],
    talles: ['Ajustable'],
    tiposPersonalizado: ['DTF', 'Parche Bordado'],
  },
  {
    id: 'gorro-lana',
    categoria: 'gorras',
    nombre: 'Gorro de Lana',
    descripcion: 'Lana acrílica - SOLO PARCHE BORDADO',
    icon: Package,
    imagen: '/images/gorro-lana.jpg',
    colores: ['Negro', 'Gris', 'Azul', 'Rojo', 'Verde'],
    talles: ['Único'],
    tiposPersonalizado: ['Parche Bordado'],
    restriccion: 'SOLO BORDADO'
  },

  // === PARCHES ===
  {
    id: 'parche-redondo',
    categoria: 'parches',
    nombre: 'Parche Redondo 6.5cm',
    descripcion: 'Pack 12 unidades',
    icon: Award,
    imagen: '/images/parche-redondo.jpg',
    colores: ['A definir según diseño'],
    talles: ['6.5cm diámetro'],
    tiposPersonalizado: ['Bordado'],
    pack: 12
  },
  {
    id: 'parche-cuadrado',
    categoria: 'parches',
    nombre: 'Parche Cuadrado 6.5cm',
    descripcion: 'Pack 12 unidades',
    icon: Award,
    imagen: '/images/parche-cuadrado.jpg',
    colores: ['A definir según diseño'],
    talles: ['6.5 x 6.5 cm'],
    tiposPersonalizado: ['Bordado'],
    pack: 12
  },
  {
    id: 'parche-rectangular',
    categoria: 'parches',
    nombre: 'Parche Rectangular',
    descripcion: 'Pack 12 unidades',
    icon: Award,
    imagen: '/images/parche-rectangular.jpg',
    colores: ['A definir según diseño'],
    talles: ['6.5 x 6.5 cm aprox'],
    tiposPersonalizado: ['Bordado'],
    pack: 12
  },
  {
    id: 'aplique-personalizado',
    categoria: 'parches',
    nombre: 'Aplique Personalizado',
    descripcion: 'Cargar imagen con medidas y cantidades para cotizar',
    icon: Award,
    imagen: '/images/aplique.jpg',
    colores: ['Personalizado'],
    talles: ['A definir'],
    tiposPersonalizado: ['Cotización especial'],
    cotizacion_especial: true
  },

  // === LLAVEROS ===
  {
    id: 'llavero-lanyard',
    categoria: 'llaveros',
    nombre: 'Llavero Lanyard 15cm',
    descripcion: 'Cinta con argolla y gancho alambre, remachado',
    icon: Package,
    imagen: '/images/llavero-lanyard.jpg',
    colores: ['Full color'],
    talles: ['15cm'],
    tiposPersonalizado: ['Estampado un lado', 'Estampado ambos lados'],
  },
  {
    id: 'llavero-cuero',
    categoria: 'llaveros',
    nombre: 'Llavero Cuero Corto',
    descripcion: 'Cuero sintético premium',
    icon: Package,
    imagen: '/images/llavero-cuero.jpg',
    colores: ['Negro', 'Marrón', 'Café'],
    talles: ['Corto'],
    tiposPersonalizado: ['Grabado láser'],
  },
  {
    id: 'llavero-3d',
    categoria: 'llaveros',
    nombre: 'Llavero Impreso 3D',
    descripcion: 'PLA/Resina personalizado',
    icon: Package,
    imagen: '/images/llavero-3d.jpg',
    colores: ['A definir'],
    talles: ['Personalizado'],
    tiposPersonalizado: ['Impresión 3D'],
  },
  {
    id: 'llavero-sub-redondo',
    categoria: 'llaveros',
    nombre: 'Sublimado Redondo',
    descripcion: 'MDF/Metal',
    icon: Package,
    imagen: '/images/llavero-redondo.jpg',
    colores: ['Personalizado'],
    talles: ['Redondo'],
    tiposPersonalizado: ['Una cara', 'Ambas caras'],
  },
  {
    id: 'llavero-sub-cuadrado',
    categoria: 'llaveros',
    nombre: 'Sublimado Cuadrado',
    descripcion: 'MDF/Metal',
    icon: Package,
    imagen: '/images/llavero-cuadrado.jpg',
    colores: ['Personalizado'],
    talles: ['Cuadrado'],
    tiposPersonalizado: ['Una cara', 'Ambas caras'],
  },
  {
    id: 'llavero-sub-rectangular',
    categoria: 'llaveros',
    nombre: 'Sublimado Rectangular',
    descripcion: 'MDF/Metal',
    icon: Package,
    imagen: '/images/llavero-rectangular.jpg',
    colores: ['Personalizado'],
    talles: ['Rectangular'],
    tiposPersonalizado: ['Una cara', 'Ambas caras'],
  },
  {
    id: 'llavero-sub-ovalado',
    categoria: 'llaveros',
    nombre: 'Sublimado Ovalado',
    descripcion: 'MDF/Metal',
    icon: Package,
    imagen: '/images/llavero-ovalado.jpg',
    colores: ['Personalizado'],
    talles: ['Ovalado'],
    tiposPersonalizado: ['Una cara', 'Ambas caras'],
  },
  {
    id: 'llavero-sub-especial',
    categoria: 'llaveros',
    nombre: 'Formato Especial',
    descripcion: 'MDF/Metal - Formatos específicos',
    icon: Package,
    imagen: '/images/llavero-especial.jpg',
    colores: ['Personalizado'],
    talles: ['Especial'],
    tiposPersonalizado: ['Una cara', 'Ambas caras'],
  },

  // === LÁSER ===
  {
    id: 'servicio-laser',
    categoria: 'laser',
    nombre: 'Servicio Grabado Láser',
    descripcion: 'Servicio profesional de grabado',
    icon: Coffee,
    imagen: '/images/laser.jpg',
    colores: ['Varios'],
    talles: ['A definir'],
    tiposPersonalizado: ['Grabado Láser'],
    servicio: true
  },
  {
    id: 'mate-termico',
    categoria: 'laser',
    nombre: 'Mate Térmico Acero',
    descripcion: 'Tipo Stanley, acero inoxidable',
    icon: Coffee,
    imagen: '/images/mate-termico.jpg',
    colores: ['Negro', 'Blanco', 'Rosa', 'Verde', 'Azul'],
    talles: ['Único'],
    tiposPersonalizado: ['Grabado láser', 'DTF UV'],
  },
  {
    id: 'vasito-termico',
    categoria: 'laser',
    nombre: 'Vasito Térmico',
    descripcion: 'Acero inoxidable',
    icon: Coffee,
    imagen: '/images/vasito-termico.jpg',
    colores: ['Negro', 'Blanco', 'Rosa', 'Verde', 'Azul'],
    talles: ['Único'],
    tiposPersonalizado: ['Grabado láser', 'DTF UV'],
  },
  {
    id: 'mate-redondo',
    categoria: 'laser',
    nombre: 'Mate Redondo Térmico',
    descripcion: 'Acero inoxidable',
    icon: Coffee,
    imagen: '/images/mate-redondo.jpg',
    colores: ['Negro', 'Blanco', 'Rosa', 'Verde', 'Azul'],
    talles: ['Único'],
    tiposPersonalizado: ['Grabado láser', 'DTF UV'],
  },
  {
    id: 'mate-madera',
    categoria: 'laser',
    nombre: 'Mate de Madera',
    descripcion: 'Madera natural',
    icon: Coffee,
    imagen: '/images/mate-madera.jpg',
    colores: ['Madera natural'],
    talles: ['Único'],
    tiposPersonalizado: ['Grabado láser'],
  },
  {
    id: 'vaso-termico',
    categoria: 'laser',
    nombre: 'Vaso Térmico',
    descripcion: 'Acero inoxidable con tapa',
    icon: Coffee,
    imagen: '/images/vaso-termico.jpg',
    colores: ['Negro', 'Blanco', 'Rosa', 'Verde', 'Azul'],
    talles: ['Único'],
    tiposPersonalizado: ['Grabado láser', 'DTF UV'],
  },
  {
    id: 'termo-media-manija',
    categoria: 'laser',
    nombre: 'Termo Media Manija',
    descripcion: 'Acero inoxidable',
    icon: Coffee,
    imagen: '/images/termo-media-manija.jpg',
    colores: ['Negro', 'Metalizado'],
    talles: ['Único'],
    tiposPersonalizado: ['Grabado láser'],
  },
  {
    id: 'bombilla-plana',
    categoria: 'laser',
    nombre: 'Bombilla Plana',
    descripcion: 'Acero inoxidable grabada',
    icon: Coffee,
    imagen: '/images/bombilla.jpg',
    colores: ['Plateado', 'Negro', 'Dorado'],
    talles: ['Único'],
    tiposPersonalizado: ['Grabado láser'],
  },
  {
    id: 'virola-mate',
    categoria: 'laser',
    nombre: 'Grabado Virolas',
    descripcion: 'Virolas de mates',
    icon: Coffee,
    imagen: '/images/virola.jpg',
    colores: ['Metal/Alpaca'],
    talles: ['A definir'],
    tiposPersonalizado: ['Grabado láser'],
    servicio: true
  },
];

// FORMSPREE ENDPOINT
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdalwzaq';

interface ItemCotizacion {
  id: string;
  productoId: string;
  color: string;
  cantidadesPorTalle: Record<string, number>;
  tipoPersonalizado: string;
  observaciones: string;
  archivo: File | null;
}

const Cotizador = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<ItemCotizacion[]>([]);
  const [mostrarSelector, setMostrarSelector] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState<string | null>(null);
  const [colorSeleccionado, setColorSeleccionado] = useState('');
  const [cantidadesPorTalle, setCantidadesPorTalle] = useState<Record<string, number>>({});
  const [tipoPersonalizado, setTipoPersonalizado] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [previewArchivo, setPreviewArchivo] = useState<string | null>(null);

  // Datos de contacto
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const productoActual = productosBase.find(p => p.id === productoSeleccionado);
  const productosFiltrados = categoriaSeleccionada 
    ? productosBase.filter(p => p.categoria === categoriaSeleccionada)
    : [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cotizador-content',
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivo(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewArchivo(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const agregarItem = () => {
    if (!productoSeleccionado || !colorSeleccionado || !tipoPersonalizado) return;

    const totalCantidad = Object.values(cantidadesPorTalle).reduce((a, b) => a + b, 0);
    if (totalCantidad === 0) return;

    const nuevoItem: ItemCotizacion = {
      id: Date.now().toString(),
      productoId: productoSeleccionado,
      color: colorSeleccionado,
      cantidadesPorTalle: { ...cantidadesPorTalle },
      tipoPersonalizado,
      observaciones,
      archivo,
    };

    setItems([...items, nuevoItem]);

    // Resetear formulario
    setProductoSeleccionado(null);
    setCategoriaSeleccionada(null);
    setColorSeleccionado('');
    setCantidadesPorTalle({});
    setTipoPersonalizado('');
    setObservaciones('');
    setArchivo(null);
    setPreviewArchivo(null);
    setMostrarSelector(false);
  };

  const eliminarItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getProductoInfo = (productoId: string) => {
    return productosBase.find(p => p.id === productoId);
  };

  const getTotalUnidades = () => {
    return items.reduce((total, item) => {
      return total + Object.values(item.cantidadesPorTalle).reduce((a, b) => a + b, 0);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setEnviando(true);

    // Preparar datos para Formspree
    const formData = {
      _subject: `Nuevo pedido de cotización - ${nombre}`,
      nombre,
      email,
      telefono,
      mensaje,
      productos: items.map(item => {
        const producto = getProductoInfo(item.productoId);
        return {
          producto: producto?.nombre,
          color: item.color,
          cantidades: item.cantidadesPorTalle,
          total: Object.values(item.cantidadesPorTalle).reduce((a, b) => a + b, 0),
          tipoPersonalizado: item.tipoPersonalizado,
          observaciones: item.observaciones
        };
      }),
      totalUnidades: getTotalUnidades()
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setEnviando(false);
        setEnviado(true);
      } else {
        alert('Hubo un error al enviar el pedido. Intentá de nuevo.');
        setEnviando(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el pedido. Intentá de nuevo.');
      setEnviando(false);
    }
  };

  const resetForm = () => {
    setProductoSeleccionado(null);
    setCategoriaSeleccionada(null);
    setColorSeleccionado('');
    setCantidadesPorTalle({});
    setTipoPersonalizado('');
    setObservaciones('');
    setArchivo(null);
    setPreviewArchivo(null);
  };

  return (
    <section
      id="cotizador"
      ref={sectionRef}
      className="relative py-24 bg-bonvivant-black overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('/images/texture-concrete-industrial.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bonvivant-black via-transparent to-bonvivant-black" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center mb-12 cotizador-content">
          <span className="text-bonvivant-gold font-accent text-2xl mb-4 block">
            Cotizá tu proyecto
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-bonvivant-cream mb-6">
            ARMÁ TU
            <span className="text-bonvivant-red"> PEDIDO</span>
          </h2>
          <p className="text-bonvivant-cream/70 max-w-2xl mx-auto text-lg">
            Seleccioná los productos, indicá cantidades y cargá tu diseño. 
            Te enviamos un presupuesto a medida en menos de 24hs.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left side - Product selector */}
          <div className="lg:col-span-3 cotizador-content">
            {/* Add Product Button */}
            {!mostrarSelector && (
              <button
                onClick={() => setMostrarSelector(true)}
                className="w-full p-8 border-2 border-dashed border-bonvivant-cream/30 rounded-xl hover:border-bonvivant-gold hover:bg-bonvivant-gold/5 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-bonvivant-cream/10 flex items-center justify-center group-hover:bg-bonvivant-gold group-hover:scale-110 transition-all duration-300">
                    <Plus className="w-8 h-8 text-bonvivant-cream group-hover:text-bonvivant-black" />
                  </div>
                  <span className="font-display text-xl text-bonvivant-cream">
                    AGREGAR PRODUCTO
                  </span>
                  <span className="text-bonvivant-cream/50 text-sm">
                    Elegí el tipo de producto y personalización
                  </span>
                </div>
              </button>
            )}

            {/* Category Selector - AHORA 6 CATEGORÍAS EN GRID DE 3 */}
            {mostrarSelector && !categoriaSeleccionada && (
              <div className="bg-bonvivant-cream/5 border border-bonvivant-cream/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl text-bonvivant-cream">
                    SELECCIONÁ UNA CATEGORÍA
                  </h3>
                  <button
                    onClick={() => setMostrarSelector(false)}
                    className="w-8 h-8 rounded-full bg-bonvivant-cream/10 flex items-center justify-center hover:bg-bonvivant-red transition-colors"
                  >
                    <X className="w-4 h-4 text-bonvivant-cream" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {categorias.map((categoria) => {
                    const Icon = categoria.icon;
                    return (
                      <button
                        key={categoria.id}
                        onClick={() => setCategoriaSeleccionada(categoria.id)}
                        className="flex flex-col items-center gap-4 p-6 bg-bonvivant-black/50 border border-bonvivant-cream/10 rounded-lg hover:border-bonvivant-gold hover:bg-bonvivant-gold/10 transition-all duration-300"
                      >
                        <div className={`w-16 h-16 rounded-full bg-bonvivant-cream/10 flex items-center justify-center`}>
                          <Icon className={`w-8 h-8 ${categoria.color}`} />
                        </div>
                        <span className="font-display text-lg text-bonvivant-cream">
                          {categoria.nombre}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Product Selector */}
            {categoriaSeleccionada && !productoSeleccionado && (
              <div className="bg-bonvivant-cream/5 border border-bonvivant-cream/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl text-bonvivant-cream">
                    SELECCIONÁ UN PRODUCTO
                  </h3>
                  <button
                    onClick={() => setCategoriaSeleccionada(null)}
                    className="w-8 h-8 rounded-full bg-bonvivant-cream/10 flex items-center justify-center hover:bg-bonvivant-red transition-colors"
                  >
                    <X className="w-4 h-4 text-bonvivant-cream" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {productosFiltrados.map((producto) => {
                    const Icon = producto.icon;
                    return (
                      <button
                        key={producto.id}
                        onClick={() => setProductoSeleccionado(producto.id)}
                        className="flex items-start gap-4 p-4 bg-bonvivant-black/50 border border-bonvivant-cream/10 rounded-lg hover:border-bonvivant-gold hover:bg-bonvivant-gold/10 transition-all duration-300 text-left"
                      >
                        <div className="w-12 h-12 rounded-lg bg-bonvivant-cream/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-bonvivant-gold" />
                        </div>
                        <div className="flex-1">
                          <div className="font-display text-lg text-bonvivant-cream">
                            {producto.nombre}
                          </div>
                          <div className="text-bonvivant-cream/50 text-sm">
                            {producto.descripcion}
                          </div>
                          {producto.restriccion && (
                            <div className="mt-2 text-bonvivant-red text-xs font-bold flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {producto.restriccion}
                            </div>
                          )}
                          {producto.pack && (
                            <div className="mt-2 text-bonvivant-gold text-xs font-bold">
                              PACK {producto.pack} UNIDADES
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Product Configuration Form */}
            {productoSeleccionado && productoActual && (
              <div className="bg-bonvivant-cream/5 border border-bonvivant-cream/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={productoActual.imagen}
                      alt={productoActual.nombre}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-display text-2xl text-bonvivant-cream">
                        {productoActual.nombre}
                      </h3>
                      <p className="text-bonvivant-cream/50 text-sm">
                        {productoActual.descripcion}
                      </p>
                      {productoActual.restriccion && (
                        <div className="mt-1 text-bonvivant-red text-sm font-bold flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {productoActual.restriccion}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={resetForm}
                    className="w-8 h-8 rounded-full bg-bonvivant-cream/10 flex items-center justify-center hover:bg-bonvivant-red transition-colors"
                  >
                    <X className="w-4 h-4 text-bonvivant-cream" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Color selection */}
                  <div>
                    <label className="block text-bonvivant-cream/60 text-sm mb-3">
                      Color <span className="text-bonvivant-red">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {productoActual.colores.map((color) => (
                        <button
                          key={color}
                          onClick={() => setColorSeleccionado(color)}
                          className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                            colorSeleccionado === color
                              ? 'bg-bonvivant-gold border-bonvivant-gold text-bonvivant-black'
                              : 'bg-bonvivant-black/50 border-bonvivant-cream/20 text-bonvivant-cream hover:border-bonvivant-cream/50'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Talle quantities */}
                  <div>
                    <label className="block text-bonvivant-cream/60 text-sm mb-3">
                      Cantidad por talle <span className="text-bonvivant-red">*</span>
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                      {productoActual.talles.map((talle) => (
                        <div key={talle} className="text-center">
                          <div className="font-display text-sm text-bonvivant-cream mb-2">
                            {talle}
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setCantidadesPorTalle(prev => ({
                                ...prev,
                                [talle]: Math.max(0, (prev[talle] || 0) - 1)
                              }))}
                              className="w-6 h-6 rounded bg-bonvivant-cream/10 flex items-center justify-center hover:bg-bonvivant-red transition-colors"
                            >
                              <Minus className="w-3 h-3 text-bonvivant-cream" />
                            </button>
                            <span className="w-8 text-center text-bonvivant-cream font-display">
                              {cantidadesPorTalle[talle] || 0}
                            </span>
                            <button
                              onClick={() => setCantidadesPorTalle(prev => ({
                                ...prev,
                                [talle]: (prev[talle] || 0) + 1
                              }))}
                              className="w-6 h-6 rounded bg-bonvivant-cream/10 flex items-center justify-center hover:bg-bonvivant-gold transition-colors"
                            >
                              <Plus className="w-3 h-3 text-bonvivant-cream" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {Object.values(cantidadesPorTalle).reduce((a, b) => a + b, 0) > 0 && (
                      <div className="mt-3 text-bonvivant-gold text-sm">
                        Total: {Object.values(cantidadesPorTalle).reduce((a, b) => a + b, 0)} unidades
                      </div>
                    )}
                  </div>

                  {/* Personalization type */}
                  <div>
                    <label className="block text-bonvivant-cream/60 text-sm mb-3">
                      Tipo de personalizado <span className="text-bonvivant-red">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {productoActual.tiposPersonalizado.map((tipo) => (
                        <button
                          key={tipo}
                          onClick={() => setTipoPersonalizado(tipo)}
                          className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                            tipoPersonalizado === tipo
                              ? 'bg-bonvivant-gold border-bonvivant-gold text-bonvivant-black'
                              : 'bg-bonvivant-black/50 border-bonvivant-cream/20 text-bonvivant-cream hover:border-bonvivant-cream/50'
                          }`}
                        >
                          {tipo}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* File upload */}
                  <div>
                    <label className="block text-bonvivant-cream/60 text-sm mb-3">
                      Adjuntar diseño (opcional)
                    </label>
                    <div className="relative">
                      {!archivo ? (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-bonvivant-cream/30 rounded-lg cursor-pointer hover:border-bonvivant-gold hover:bg-bonvivant-gold/5 transition-all duration-300">
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="w-8 h-8 text-bonvivant-cream/50" />
                            <span className="text-bonvivant-cream/50 text-sm">
                              Arrastrá o hacé clic para subir
                            </span>
                            <span className="text-bonvivant-cream/30 text-xs">
                              JPG, PNG, PDF, AI, EPS (máx. 10MB)
                            </span>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf,.ai,.eps"
                            onChange={handleFileChange}
                          />
                        </label>
                      ) : (
                        <div className="flex items-center gap-4 p-4 bg-bonvivant-gold/10 border border-bonvivant-gold/30 rounded-lg">
                          {previewArchivo ? (
                            <img
                              src={previewArchivo}
                              alt="Preview"
                              className="w-16 h-16 rounded object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded bg-bonvivant-cream/10 flex items-center justify-center">
                              <FileImage className="w-8 h-8 text-bonvivant-gold" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-bonvivant-cream truncate">
                              {archivo.name}
                            </div>
                            <div className="text-bonvivant-cream/50 text-sm">
                              {(archivo.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setArchivo(null);
                              setPreviewArchivo(null);
                            }}
                            className="w-8 h-8 rounded-full bg-bonvivant-cream/10 flex items-center justify-center hover:bg-bonvivant-red transition-colors"
                          >
                            <X className="w-4 h-4 text-bonvivant-cream" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Observations */}
                  <div>
                    <label className="block text-bonvivant-cream/60 text-sm mb-3">
                      Observaciones (opcional)
                    </label>
                    <Textarea
                      placeholder="Ubicación del diseño, colores específicos, etc."
                      value={observaciones}
                      onChange={(e) => setObservaciones(e.target.value)}
                      className="bg-bonvivant-black/50 border-bonvivant-cream/20 text-bonvivant-cream placeholder:text-bonvivant-cream/30 focus:border-bonvivant-gold resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Add button */}
                  <Button
                    onClick={agregarItem}
                    disabled={!colorSeleccionado || Object.values(cantidadesPorTalle).reduce((a, b) => a + b, 0) === 0 || !tipoPersonalizado}
                    className="w-full bg-bonvivant-gold text-bonvivant-black font-display tracking-wider hover:bg-bonvivant-red hover:text-bonvivant-cream transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    AGREGAR AL PEDIDO
                  </Button>
                </div>
              </div>
            )}

            {/* Items List */}
            {items.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="font-display text-xl text-bonvivant-cream">
                  PRODUCTOS AGREGADOS ({items.length})
                </h3>
                {items.map((item) => {
                  const producto = getProductoInfo(item.productoId);
                  if (!producto) return null;
                  const totalUnidades = Object.values(item.cantidadesPorTalle).reduce((a, b) => a + b, 0);

                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 bg-bonvivant-cream/5 border border-bonvivant-cream/10 rounded-lg"
                    >
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-display text-lg text-bonvivant-cream">
                              {producto.nombre}
                            </div>
                            <div className="text-bonvivant-gold text-sm">
                              {totalUnidades} unidades · {item.color} · {item.tipoPersonalizado}
                            </div>
                            {item.archivo && (
                              <div className="flex items-center gap-1 text-bonvivant-cream/50 text-xs mt-1">
                                <FileImage className="w-3 h-3" />
                                {item.archivo.name}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => eliminarItem(item.id)}
                            className="w-8 h-8 rounded-full bg-bonvivant-cream/10 flex items-center justify-center hover:bg-bonvivant-red transition-colors flex-shrink-0"
                          >
                            <X className="w-4 h-4 text-bonvivant-cream" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right side - Contact form */}
          <div className="lg:col-span-2 cotizador-content">
            <div className="sticky top-32">
              <div className="bg-bonvivant-cream/5 backdrop-blur-sm border border-bonvivant-cream/10 rounded-xl p-6">
                {enviado ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bonvivant-gold flex items-center justify-center animate-pulse">
                      <Check className="w-8 h-8 text-bonvivant-black" />
                    </div>
                    <h3 className="font-display text-3xl text-bonvivant-cream mb-4">
                      ¡PEDIDO ENVIADO!
                    </h3>
                    <p className="text-bonvivant-cream/70">
                      Te contactaremos en menos de 24hs con tu presupuesto.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-2xl text-bonvivant-cream mb-2">
                      TUS DATOS
                    </h3>
                    <p className="text-bonvivant-cream/50 text-sm mb-6">
                      Para enviarte el presupuesto
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-bonvivant-cream/60 text-sm mb-2">
                          Nombre <span className="text-bonvivant-red">*</span>
                        </label>
                        <Input
                          type="text"
                          required
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          placeholder="Tu nombre"
                          className="bg-bonvivant-black/50 border-bonvivant-cream/20 text-bonvivant-cream placeholder:text-bonvivant-cream/30 focus:border-bonvivant-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-bonvivant-cream/60 text-sm mb-2">
                          Email <span className="text-bonvivant-red">*</span>
                        </label>
                        <Input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@email.com"
                          className="bg-bonvivant-black/50 border-bonvivant-cream/20 text-bonvivant-cream placeholder:text-bonvivant-cream/30 focus:border-bonvivant-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-bonvivant-cream/60 text-sm mb-2">
                          Teléfono <span className="text-bonvivant-red">*</span>
                        </label>
                        <Input
                          type="tel"
                          required
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          placeholder="+54 11 1234-5678"
                          className="bg-bonvivant-black/50 border-bonvivant-cream/20 text-bonvivant-cream placeholder:text-bonvivant-cream/30 focus:border-bonvivant-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-bonvivant-cream/60 text-sm mb-2">
                          Mensaje (opcional)
                        </label>
                        <Textarea
                          value={mensaje}
                          onChange={(e) => setMensaje(e.target.value)}
                          placeholder="¿Algo más que quieras contarnos?"
                          className="bg-bonvivant-black/50 border-bonvivant-cream/20 text-bonvivant-cream placeholder:text-bonvivant-cream/30 focus:border-bonvivant-gold resize-none"
                          rows={3}
                        />
                      </div>

                      {/* Summary */}
                      {items.length > 0 && (
                        <div className="p-4 bg-bonvivant-gold/10 border border-bonvivant-gold/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-bonvivant-cream/70">Productos</span>
                            <span className="text-bonvivant-cream">{items.length}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-bonvivant-cream/70">Total unidades</span>
                            <span className="text-bonvivant-gold font-display text-xl">
                              {getTotalUnidades()}
                            </span>
                          </div>
                        </div>
                      )}

                      {items.length === 0 && (
                        <div className="flex items-start gap-2 p-3 bg-bonvivant-red/10 border border-bonvivant-red/30 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-bonvivant-red flex-shrink-0 mt-0.5" />
                          <p className="text-bonvivant-cream/70 text-sm">
                            Agregá al menos un producto para poder cotizar.
                          </p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={items.length === 0 || !nombre || !email || !telefono || enviando}
                        className="w-full bg-bonvivant-gold text-bonvivant-black font-display tracking-wider hover:bg-bonvivant-red hover:text-bonvivant-cream transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {enviando ? (
                          <span className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-bonvivant-black border-t-transparent rounded-full animate-spin" />
                            ENVIANDO...
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            PEDIR PRESUPUESTO
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
      </div>
    </section>
  );
};

export default Cotizador;
