
declare module '*.json' {
  const value: any;
  export default value;
}

export interface Producto {
  id: string;
  nombre: string;
  material: string;
  colores?: string[];
  metodos: string[];
  descripcion: string;
  imagen: string;
  precio_base: number;
  no_sublimable?: boolean;
  solo_bordado?: boolean;
  solo_estampado?: boolean;
  pack?: number;
  cotizacion_especial?: boolean;
  servicio?: boolean;
  tamano?: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  advertencia?: string;
  productos: Producto[];
}

export interface CatalogoData {
  categorias: Categoria[];
}
