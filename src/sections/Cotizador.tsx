import { useState } from 'react';
import { Plus, Trash2, Upload, AlertTriangle, Package, Info } from 'lucide-react';
import catalogoData from '../data/catalogo.json';

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  color?: string;
  metodo?: string;
  diseno?: File;
  notas?: string;
}

interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  advertencia?: string;
  productos: any[];
}

export default function Cotizador() {
  const [pedido, setPedido] = useState<Producto[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');
  const [productoSeleccionado, setProductoSeleccionado] = useState<string>('');
  const [cantidad, setCantidad] = useState<number>(1);
  const [color, setColor] = useState<string>('');
  const [metodo, setMetodo] = useState<string>('');
  const [diseno, setDiseno] = useState<File | null>(null);
  const [notas, setNotas] = useState<string>('');
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: ''
  });
  const [enviado, setEnviado] = useState(false);

  const categorias: Categoria[] = catalogoData.categorias;

  const categoriaActual = categorias.find(c => c.id === categoriaSeleccionada);
  const productoActual = categoriaActual?.productos.find(p => p.id === productoSeleccionado);

  const agregarProducto = () => {
    if (!productoActual || cantidad < 1) return;

    const nuevoProducto: Producto = {
      id: Date.now().toString(),
      nombre: productoActual.nombre,
      categoria: categoriaActual?.nombre || '',
      cantidad,
      color: color || undefined,
      metodo: metodo || undefined,
      diseno: diseno || undefined,
      notas: notas || undefined
    };

    setPedido([...pedido, nuevoProducto]);

    // Resetear formulario
    setProductoSeleccionado('');
    setCantidad(1);
    setColor('');
    setMetodo('');
    setDiseno(null);
    setNotas('');
  };

  const eliminarProducto = (id: string) => {
    setPedido(pedido.filter(p => p.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí iría la lógica de envío al backend/email
    console.log('Enviando pedido:', { datosCliente, pedido });
    setEnviado(true);
  };

  const getAdvertenciaProducto = (producto: any) => {
    if (producto.no_sublimable) return '⚠️ NO SUBLIMABLE';
    if (producto.solo_bordado) return '⚠️ SOLO BORDADO';
    if (producto.solo_estampado) return '⚠️ SOLO ESTAMPADO';
    return null;
  };

  return (
    <section id="cotizador" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ARMÁ TU PEDIDO
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Seleccioná los productos, indicá cantidades y cargá tu diseño. Te enviamos un presupuesto a medida en menos de 24hs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario de Productos */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Plus className="mr-2" size={24} />
              Agregar Producto
            </h3>

            {/* Categorías - AHORA 6 EN GRID DE 3 COLUMNAS */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categorias.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategoriaSeleccionada(cat.id);
                      setProductoSeleccionado('');
                    }}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      categoriaSeleccionada === cat.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl mr-2">{cat.icono}</span>
                    <span className="text-sm font-medium">{cat.nombre}</span>
                  </button>
                ))}
              </div>
            </div>

            {categoriaActual && (
              <>
                {/* Advertencia de categoría */}
                {categoriaActual.advertencia && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
                    <AlertTriangle className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                    <p className="text-sm text-yellow-800">{categoriaActual.advertencia}</p>
                  </div>
                )}

                {/* Producto */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Producto *
                  </label>
                  <select
                    value={productoSeleccionado}
                    onChange={(e) => {
                      setProductoSeleccionado(e.target.value);
                      setColor('');
                      setMetodo('');
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar producto...</option>
                    {categoriaActual.productos.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.nombre} {getAdvertenciaProducto(prod) || ''}
                      </option>
                    ))}
                  </select>
                </div>

                {productoActual && (
                  <>
                    {/* Info del producto */}
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Material:</strong> {productoActual.material}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Métodos:</strong> {productoActual.metodos.join(', ')}
                      </p>
                      {productoActual.pack && (
                        <p className="text-sm text-blue-600 flex items-center">
                          <Package className="mr-1" size={14} />
                          Pack de {productoActual.pack} unidades
                        </p>
                      )}
                      {productoActual.cotizacion_especial && (
                        <p className="text-sm text-orange-600 flex items-center mt-2">
                          <Info className="mr-1" size={14} />
                          Cotización especial - Cargar imagen con medidas
                        </p>
                      )}
                    </div>

                    {/* Advertencias específicas */}
                    {productoActual.no_sublimable && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800 font-semibold">
                          ⚠️ IMPORTANTE: Este producto NO se puede sublimar.
                        </p>
                      </div>
                    )}
                    {productoActual.solo_bordado && (
                      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800 font-semibold">
                          ⚠️ SOLO BORDADO: Material polar que no admite otros métodos.
                        </p>
                      </div>
                    )}

                    {/* Color */}
                    {productoActual.colores && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color
                        </label>
                        <select
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          <option value="">Seleccionar color...</option>
                          {productoActual.colores.map((c: string) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Método de personalización */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Método de Personalización
                      </label>
                      <select
                        value={metodo}
                        onChange={(e) => setMetodo(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      >
                        <option value="">Seleccionar método...</option>
                        {productoActual.metodos.map((m: string) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    {/* Cantidad */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cantidad *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={cantidad}
                        onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                      {productoActual.pack && (
                        <p className="text-xs text-gray-500 mt-1">
                          Se vende en packs de {productoActual.pack} unidades
                        </p>
                      )}
                    </div>

                    {/* Diseño */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Archivo de Diseño
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                        <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                        <input
                          type="file"
                          accept="image/*,.pdf,.ai,.eps"
                          onChange={(e) => setDiseno(e.target.files?.[0] || null)}
                          className="hidden"
                          id="diseno-upload"
                        />
                        <label
                          htmlFor="diseno-upload"
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                        >
                          {diseno ? diseno.name : 'Clic para subir diseño'}
                        </label>
                      </div>
                      {productoActual.cotizacion_especial && (
                        <p className="text-xs text-orange-600 mt-1">
                          * Incluir medidas aproximadas en la descripción
                        </p>
                      )}
                    </div>

                    {/* Notas */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notas / Especificaciones
                      </label>
                      <textarea
                        value={notas}
                        onChange={(e) => setNotas(e.target.value)}
                        placeholder="Medidas, posición del diseño, colores específicos, etc."
                        className="w-full p-3 border border-gray-300 rounded-lg h-24"
                      />
                    </div>

                    <button
                      onClick={agregarProducto}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Agregar al Pedido
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Resumen del Pedido */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Tu Pedido ({pedido.length} productos)
            </h3>

            {pedido.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Package className="mx-auto mb-4" size={48} />
                <p>No hay productos en tu pedido</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {pedido.map((prod) => (
                    <div key={prod.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{prod.nombre}</h4>
                          <p className="text-sm text-gray-600">{prod.categoria}</p>
                          <div className="mt-2 text-sm text-gray-700">
                            <p>Cantidad: {prod.cantidad}</p>
                            {prod.color && <p>Color: {prod.color}</p>}
                            {prod.metodo && <p>Método: {prod.metodo}</p>}
                            {prod.notas && <p className="text-gray-500 italic">{prod.notas}</p>}
                          </div>
                        </div>
                        <button
                          onClick={() => eliminarProducto(prod.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Datos del Cliente */}
                <form onSubmit={handleSubmit} className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Tus Datos</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nombre completo *"
                      required
                      value={datosCliente.nombre}
                      onChange={(e) => setDatosCliente({...datosCliente, nombre: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      required
                      value={datosCliente.email}
                      onChange={(e) => setDatosCliente({...datosCliente, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono *"
                      required
                      value={datosCliente.telefono}
                      onChange={(e) => setDatosCliente({...datosCliente, telefono: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Empresa (opcional)"
                      value={datosCliente.empresa}
                      onChange={(e) => setDatosCliente({...datosCliente, empresa: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Solicitar Cotización
                  </button>
                </form>
              </>
            )}

            {enviado && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-green-800 font-semibold">¡Pedido enviado!</p>
                <p className="text-sm text-green-700">Te contactaremos en menos de 24hs.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
