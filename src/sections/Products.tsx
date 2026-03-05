import React, { useState } from 'react';
import { AlertTriangle, Package, Check } from 'lucide-react';
import catalogoData from '../data/catalogo.json';

interface Producto {
  id: string;
  nombre: string;
  material: string;
  colores?: string[];
  metodos: string[];
  descripcion: string;
  imagen: string;
  no_sublimable?: boolean;
  solo_bordado?: boolean;
  solo_estampado?: boolean;
  pack?: number;
  cotizacion_especial?: boolean;
  servicio?: boolean;
  tamano?: string;
}

interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  advertencia?: string;
  productos: Producto[];
}

export default function Products() {
  const [categoriaActiva, setCategoriaActiva] = useState<string>('verano');

  const categorias: Categoria[] = catalogoData.categorias;
  const categoriaActual = categorias.find(c => c.id === categoriaActiva);

  const getMethodColor = (metodo: string) => {
    if (metodo.includes('Sublimación')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (metodo.includes('Bordado')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (metodo.includes('DTF')) return 'bg-green-100 text-green-800 border-green-200';
    if (metodo.includes('Estampado')) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (metodo.includes('Láser')) return 'bg-red-100 text-red-800 border-red-200';
    if (metodo.includes('3D')) return 'bg-pink-100 text-pink-800 border-pink-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAdvertenciaProducto = (producto: Producto) => {
    if (producto.no_sublimable) {
      return {
        texto: 'NO SUBLIMABLE',
        clase: 'bg-red-500 text-white',
        icono: <AlertTriangle size={14} className="mr-1" />
      };
    }
    if (producto.solo_bordado) {
      return {
        texto: 'SOLO BORDADO',
        clase: 'bg-blue-600 text-white',
        icono: <Check size={14} className="mr-1" />
      };
    }
    if (producto.solo_estampado) {
      return {
        texto: 'SOLO ESTAMPADO',
        clase: 'bg-orange-500 text-white',
        icono: <Check size={14} className="mr-1" />
      };
    }
    if (producto.pack) {
      return {
        texto: `PACK ${producto.pack}U`,
        clase: 'bg-blue-500 text-white',
        icono: <Package size={14} className="mr-1" />
      };
    }
    return null;
  };

  return (
    <section id="productos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            NUESTROS PRODUCTOS
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Más de 14 años de experiencia en indumentaria y accesorios personalizados. 
            Cotizamos según tu diseño, cantidad y especificaciones.
          </p>
        </div>

        {/* Tabs de Categorías */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`px-4 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${
                categoriaActiva === cat.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{cat.icono}</span>
              <span className="hidden sm:inline">{cat.nombre}</span>
            </button>
          ))}
        </div>

        {/* Advertencia de categoría */}
        {categoriaActual?.advertencia && (
          <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <div className="flex items-start">
              <AlertTriangle className="text-yellow-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-yellow-800 font-medium">{categoriaActual.advertencia}</p>
            </div>
          </div>
        )}

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriaActual?.productos.map((producto) => {
            const advertencia = getAdvertenciaProducto(producto);

            return (
              <div
                key={producto.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
              >
                {/* Imagen */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Producto';
                    }}
                  />
                  {advertencia && (
                    <div className={`absolute top-3 right-3 ${advertencia.clase} text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md`}>
                      {advertencia.icono}
                      {advertencia.texto}
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{producto.nombre}</h3>
                  <p className="text-sm text-gray-500 mb-3">{producto.material}</p>

                  {/* Métodos */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {producto.metodos.slice(0, 3).map((metodo, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full border ${getMethodColor(metodo)}`}
                      >
                        {metodo}
                      </span>
                    ))}
                    {producto.metodos.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        +{producto.metodos.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Descripción */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{producto.descripcion}</p>

                  {/* Colores */}
                  {producto.colores && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Colores disponibles:</p>
                      <div className="flex flex-wrap gap-1">
                        {producto.colores.map((color, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tamaño (para parches) */}
                  {producto.tamano && (
                    <p className="text-xs text-blue-600 font-medium mb-2">
                      Tamaño: {producto.tamano}
                    </p>
                  )}

                  {/* Botón */}
                  <a
                    href="#cotizador"
                    onClick={() => {
                      // Guardar en localStorage para preseleccionar en cotizador
                      localStorage.setItem('categoriaPreseleccionada', categoriaActual.id);
                      localStorage.setItem('productoPreseleccionado', producto.id);
                    }}
                    className="block w-full text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    Cotizar este producto
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota importante */}
        <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-start">
            <AlertTriangle className="text-red-600 mr-4 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-red-900 mb-2">Importante: Restricciones de Materiales</h4>
              <ul className="text-red-800 text-sm space-y-1">
                <li>• <strong>Algodón y Friza:</strong> NO son sublimables. Usar DTF, bordado o vinilo.</li>
                <li>• <strong>Polar:</strong> Solo permite bordado (no sublimación ni estampado).</li>
                <li>• <strong>Rompe vientos:</strong> Solo estampado (no bordado).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
