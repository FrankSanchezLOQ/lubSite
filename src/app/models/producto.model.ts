// ============================================================
// MODELO: Producto
// Refleja las tablas: categoria, marca, producto,
//                     presentacion, equivalencia
// ============================================================

export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  descripcion?: string;
  iconoUrl?: string;
}

export interface Marca {
  id: number;
  nombre: string;
  slug: string;
  logoUrl: string;
  descripcion?: string;
  activo: boolean;
  categorias: number[];
}

// Presentación: cada combinación de tamaño/envase de un producto
// Ejemplos: Cuarto 0.946L / Galón 3.785L / Caneca 19L / 250ml / 1Lb
export interface Presentacion {
  id: number;
  idProducto: number;
  nombre: string;         // 'Cuarto', 'Galón', 'Caneca', '250g', '1Lb', '500ml'
  unidad: string;         // 'L' | 'ml' | 'g' | 'Lb' | 'kg' | 'unidad'
  cantidad: number;       // 0.946 / 3.785 / 19 / 250 / 1
  referencia: string;     // referencia única por presentación: 'MOB-20W50-QT'
  precio: number;
  stock: number;
}

export interface Producto {
  id: number;
  idCategoria: number;
  idMarca: number;
  referencia: string;     // referencia base del producto
  nombre: string;
  descripcion?: string;
  imagenUrl: string;
  precio: number;         // precio base (presentación por defecto)
  stock: number;
  activo: boolean;
  // Presentaciones disponibles (vacío = producto sin variantes de tamaño)
  presentaciones: Presentacion[];
  // Atributos de aceites
  viscosidad?: string;
  tipoBase?: string;
  aplicacion?: string;
  // Atributos de filtros
  tipoFiltro?: string;
}

export interface Equivalencia {
  idProducto: number;
  idMarcaEquiv: number;
  nombreMarcaEquiv: string;
  referenciaEquiv: string;
  notas?: string;
}

export interface ItemCarrito {
  producto: Producto;
  presentacion: Presentacion | null;  // null = sin variante seleccionada
  cantidad: number;
}