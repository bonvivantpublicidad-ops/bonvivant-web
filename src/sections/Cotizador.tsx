import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Plus, Minus, Upload, X, Shirt, Coffee, Award, Package, 
  Send, Check, FileImage, AlertCircle, Sun, Snowflake 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

// FORMSPREE ENDPOINT
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdalwzaq';

// Categorías de productos
const categorias = [
  { id: 'verano', nombre: 'VERANO', icon: Sun, color: 'text-bonvivant-gold' },
  { id: 'invierno', nombre: 'INVIERNO', icon: Snowflake, color: 'text-bonvivant-cream' },
  { id: 'accesorios', nombre: 'ACCESORIOS', icon: Package, color: 'text-bonvivant-red' },
];

// Productos organizados por categoría
const productosBase = [
  // === VERANO ===
  {
    id: 'remera-algodon',
    categoria: 'verano',
    nombre: 'Remera Algodón',
    descripcion: '100% algodón peinado, 180-200gsm',
    icon: Shirt,
    imagen: '/images/remera-personalizada-1.jpg',
    colores: ['Blanco', 'Negro', 'Gris', 'Azul marino', 'Rojo', 'Verde', 'Amarillo', 'Naranja'],
    talles: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    tiposPersonalizado: ['Bordado', 'Estampado DTG', 'Transfer', 'Sublimación', 'Vinilo textil'],
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
    id: 'buzo-medio-cierre',
    categoria: 'invierno',
    nombre: 'Buzo Medio Cierre',
    descripcion: 'Frisa con cierre medio, estilo moderno',
    icon: Shirt,
    imagen: '/images/buzo-canguro.jpg',
    colores: ['Negro', 'Gris', 'Azul marino', 'Rojo'],
    talles: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Bordado', 'Estampado'],
  },
  {
    id: 'campera-polar',
    categoria: 'invierno',
    nombre: 'Campera Polar',
    descripcion: 'Polar térmico, ideal para el frío',
    icon: Shirt,
    imagen: '/images/chaleco.jpg',
    colores: ['Negro', 'Gris', 'Azul marino', 'Rojo', 'Verde'],
    talles: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tiposPersonalizado: ['Bordado', 'Estampado'],
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
  
  // === ACCESORIOS ===
  {
    id: 'vaso-termico',
    categoria: 'accesorios',
    nombre: 'Vaso Térmico',
    descripcion: 'Acero inoxidable 304, 500ml',
    icon: Coffee,
    imagen: '/images/laser-engraving-tumbler.jpg',
    colores: ['Plateado', 'Negro mate', 'Dorado', 'Azul', 'Rosa', 'Blanco'],
    talles: ['Único'],
    tiposPersonalizado: ['Grabado láser', 'DTF UV (color)'],
  },
  {
    id: 'termo',
    categoria: 'accesorios',
    nombre: 'Termo',
    descripcion: 'Acero inoxidable, 1L con manija',
    icon: Coffee,
    imagen: '/images/laser-engraving-tumbler.jpg',
    colores: ['Plateado', 'Negro', 'Azul', 'Verde', 'Rojo'],
    talles: ['Único'],
    tiposPersonalizado: ['Grabado láser', 'DTF UV (color)'],
  },
  {
    id: 'mate',
    categoria: 'accesorios',
    nombre: 'Mate',
    descripcion: 'Acero inoxidable con bombilla incluida',
    icon: Coffee,
    imagen: '/images/mate.jpg',
    colores: ['Plateado', 'Negro', 'Dorado', 'Azul'],
    talles: ['Único'],
    tiposPersonalizado: ['Grabado láser', 'DTF UV (color)'],
  },
  {
    id: 'bombilla',
    categoria: 'accesorios',
    nombre: 'Bombilla',
    descripcion: 'Acero inoxidable, personalizable',
    icon: Coffee,
    imagen: '/images/mate.jpg',
    colores: ['Plateado', 'Negro', 'Dorado'],
    talles: ['Único'],
    tiposPersonalizado: ['Grabado láser'],
  },
  {
    id: 'parches',
    categoria: 'accesorios',
    nombre: 'Parches Bordados',
    descripcion: 'Parches personalizados para coser o termoadhesivos',
    icon: Award,
    imagen: '/images/parches-bordados.jpg',
    colores: ['A definir según diseño'],
    talles: ['5x5cm', '7x7cm', '10x10cm', 'Personalizado'],
    tiposPersonalizado: ['Bordado 2D', 'Bordado 3D', 'Con adhesivo', 'Para coser'],
  },
  {
    id: 'gorra',
    categoria: 'accesorios',
    nombre: 'Gorra',
    descripcion: 'Gorra trucker o snapback, ajustable',
    icon: Package,
    imagen: '/images/products-collection.jpg',
    colores: ['Negro', 'Blanco', 'Gris', 'Azul marino', 'Rojo', 'Beige'],
    talles: ['Ajustable'],
    tiposPersonalizado: ['Bordado frontal', 'Bordado lateral', 'Parche'],
  },
  {
    id: 'llavero-cinta',
    categoria: 'accesorios',
    nombre: 'Llavero Cinta 15cm',
    descripcion: 'Cinta de 15cm con sublimación full color',
    icon: Package,
    imagen: '/images/llavero-cinta.jpg',
    colores: ['Full color personalizado'],
    talles: ['15cm'],
    tiposPersonalizado: ['Sublimación full color'],
  },
  {
    id: 'llavero-cuero',
    categoria: 'accesorios',
    nombre: 'Llavero Cuero',
    descripcion: 'Cuero sintético premium con grabado láser',
    icon: Package,
    imagen: '/images/llavero-cuero.jpg',
    colores: ['Negro', 'Marrón', 'Café'],
    talles: ['Rectangular', 'Redondo', 'Personalizado'],
    tiposPersonalizado: ['Grabado láser'],
  },
];

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
  const [error, setError] = useState<string | null>(null);

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
      if (file.size > 10 * 1024 * 1024) {
        setError('El archivo no puede superar los 10MB');
        return;
      }
      setArchivo(file);
      setError(null);
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
    setError(null);
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

  // Generar el texto del pedido para enviar
  const generarPedidoTexto = () => {
    let texto = `=== NUEVO PEDIDO DE COTIZACIÓN ===\n\n`;
    texto += `Cliente: ${nombre}\n`;
    texto += `Email: ${email}\n`;
    texto += `Teléfono: ${telefono}\n`;
    if (mensaje) texto += `Mensaje: ${mensaje}\n`;
    texto += `\n=== PRODUCTOS SOLICITADOS ===\n\n`;
    
    items.forEach((item, index) => {
      const producto = getProductoInfo(item.productoId);
      if (producto) {
        const totalUnidades = Object.values(item.cantidadesPorTalle).reduce((a, b) => a + b, 0);
        texto += `${index + 1}. ${producto.nombre}\n`;
        texto += `   Color: ${item.color}\n`;
        texto += `   Total unidades: ${totalUnidades}\n`;
        texto += `   Personalizado: ${item.tipoPersonalizado}\n`;
        
        // Detalle por talle
        const tallesConCantidad = Object.entries(item.cantidadesPorTalle)
          .filter(([, cant]) => cant > 0)
          .map(([talle, cant]) => `${talle}: ${cant}`)
          .join(', ');
        texto += `   Detalle: ${tallesConCantidad}\n`;
        
        if (item.observaciones) {
          texto += `   Observaciones: ${item.observaciones}\n`;
        }
        if (item.archivo) {
          texto += `   Archivo adjunto: ${item.archivo.name}\n`;
        }
        texto += `\n`;
      }
    });
    
    texto += `=== TOTAL ===\n`;
    texto += `Productos: ${items.length}\n`;
    texto += `Unidades totales: ${getTotalUnidades()}\n`;
    
    return texto;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Agregá al menos un producto');
      return;
    }
    
    setEnviando(true);
    setError(null);

    try {
      // Crear FormData para enviar
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('email', email);
      formData.append('telefono', telefono);
      formData.append('mensaje', mensaje || 'Sin mensaje adicional');
      formData.append('pedido', generarPedidoTexto());
      formData.append('totalProductos', items.length.toString());
      formData.append('totalUnidades', getTotalUnidades().toString());
      formData.append('_subject', `Nuevo pedido de cotización - ${nombre}`);
      formData.append('_replyto', email);

      // Adjuntar archivos si hay
      items.forEach((item, index) => {
        if (item.archivo) {
          formData.append(`archivo_${index}`, item.archivo);
        }
      });

      // Enviar a Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setEnviado(true);
        // Resetear todo
        setItems([]);
        setNombre('');
        setEmail('');
        setTelefono('');
        setMensaje('');
      } else {
        setError('Hubo un error al enviar. Por favor intentá de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión. Verificá tu conexión a internet.');
    } finally {
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
    setError(null);
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

            {/* Category Selector */}
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

                <div className="grid sm:grid-cols-3 gap-4">
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
                        <div>
                          <div className="font-display text-lg text-bonvivant-cream">
                            {producto.nombre}
                          </div>
                          <div className="text-bonvivant-cream/50 text-sm">
                            {producto.descripcion}
                          </div>
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

                    {/* Error message */}
                    {error && (
                      <div className="mb-4 p-3 bg-bonvivant-red/10 border border-bonvivant-red/30 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-bonvivant-red flex-shrink-0 mt-0.5" />
                          <p className="text-bonvivant-cream/70 text-sm">{error}</p>
                        </div>
                      </div>
                    )}

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

                      {items.length === 0 && !error && (
                        <div className="flex items-start gap-2 p-3 bg-bonvivant-cream/5 border border-bonvivant-cream/20 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-bonvivant-cream/50 flex-shrink-0 mt-0.5" />
                          <p className="text-bonvivant-cream/50 text-sm">
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
