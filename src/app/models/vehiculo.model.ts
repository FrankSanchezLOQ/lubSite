// ============================================================
// MODELO: Vehículo
// Refleja las tablas: tipo_aplicacion, fabricante_vehiculo,
//                     modelo_vehiculo, compatibilidad_filtro
// ============================================================

export interface TipoAplicacion {
  id: number;
  nombre: string;       // 'Automóvil' | 'Motocicleta' | 'Pesado / Camión' | 'Maquinaria'
  descripcion?: string;
}

export interface FabricanteVehiculo {
  id: number;
  idTipo: number;       // FK → tipo_aplicacion
  nombre: string;       // 'Chevrolet', 'Renault', 'Yamaha', etc.
}

export interface ModeloVehiculo {
  id: number;
  idFabricante: number; // FK → fabricante_vehiculo
  nombre: string;       // 'Dmax Diesel', 'Spark GT', 'FZ25', etc.
  anioDesde: number;    // año inicial del rango, ej: 2012
  anioHasta: number;    // año final del rango, ej: 2022
  cilindrajeCc: number; // ej: 2500, 1200, 250
  motorDescripcion?: string; // '2.5L Turbo Diesel', '1.2L Gasolina', etc.
}

export interface CompatibilidadFiltro {
  id: number;
  idModelo: number;     // FK → modelo_vehiculo
  idProducto: number;   // FK → producto (debe ser un filtro)
  tipoFiltro: 'aceite' | 'aire' | 'combustible' | 'ac' | 'hidraulico';
  notas?: string;
}

// DTO que el servicio usa internamente para la búsqueda en cascada
export interface FiltrosBusqueda {
  idTipo: number;
  idFabricante: number;
  nombreModelo: string;
  anio: number;
  cilindrajeCc: number;
}
