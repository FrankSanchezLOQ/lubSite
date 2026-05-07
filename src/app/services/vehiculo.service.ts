import { Injectable } from '@angular/core';
import {
  TipoAplicacion,
  FabricanteVehiculo,
  ModeloVehiculo,
  CompatibilidadFiltro,
  FiltrosBusqueda,
} from '../models/vehiculo.model';
import { Producto } from '../models/producto.model';
import { CatalogoService } from './catalogo.service';

// ============================================================
// SERVICIO: VehiculoService
//
// Maneja toda la lógica en cascada del catálogo de filtros:
// Tipo → Fabricante → Modelo → Año → Cilindrada → Filtros
//
// HOY: datos mock.
// FUTURO: reemplazar cada método por this.http.get('/api/...')
// ============================================================

@Injectable({ providedIn: 'root' })
export class VehiculoService {

  constructor(private catalogoService: CatalogoService) {}

  // ----------------------------------------------------------
  // DATOS MOCK
  // ----------------------------------------------------------

  private tipos: TipoAplicacion[] = [
    { id: 1, nombre: 'Automóvil' },
    { id: 2, nombre: 'Motocicleta' },
    { id: 3, nombre: 'Pesado / Camión' },
    { id: 4, nombre: 'Maquinaria' },
  ];

  private fabricantes: FabricanteVehiculo[] = [
    { id: 1, idTipo: 1, nombre: 'Chevrolet' },
    { id: 2, idTipo: 1, nombre: 'Renault' },
    { id: 3, idTipo: 1, nombre: 'Kia' },
    { id: 4, idTipo: 1, nombre: 'Mazda' },
    { id: 5, idTipo: 1, nombre: 'Toyota' },
    { id: 6, idTipo: 2, nombre: 'Yamaha' },
    { id: 7, idTipo: 2, nombre: 'Honda' },
    { id: 8, idTipo: 2, nombre: 'Suzuki' },
    { id: 9, idTipo: 3, nombre: 'International' },
    { id: 10, idTipo: 3, nombre: 'Volvo' },
    { id: 11, idTipo: 4, nombre: 'Caterpillar' },
  ];

  // Cada modelo define el RANGO de años y el cilindraje.
  // Un mismo nombre puede tener varias filas si cambió el motor en años distintos.
  private modelos: ModeloVehiculo[] = [
    { id: 1,  idFabricante: 1, nombre: 'Dmax Diesel',   anioDesde: 2012, anioHasta: 2022, cilindrajeCc: 2500, motorDescripcion: '2.5L Turbo Diesel' },
    { id: 2,  idFabricante: 1, nombre: 'Spark GT',       anioDesde: 2010, anioHasta: 2020, cilindrajeCc: 1200, motorDescripcion: '1.2L Gasolina' },
    { id: 3,  idFabricante: 1, nombre: 'Aveo',           anioDesde: 2008, anioHasta: 2018, cilindrajeCc: 1600, motorDescripcion: '1.6L Gasolina' },
    { id: 4,  idFabricante: 2, nombre: 'Duster',         anioDesde: 2013, anioHasta: 2023, cilindrajeCc: 1600, motorDescripcion: '1.6L Gasolina' },
    { id: 5,  idFabricante: 2, nombre: 'Logan',          anioDesde: 2005, anioHasta: 2021, cilindrajeCc: 1400, motorDescripcion: '1.4L Gasolina' },
    { id: 6,  idFabricante: 3, nombre: 'Sportage',       anioDesde: 2014, anioHasta: 2022, cilindrajeCc: 2000, motorDescripcion: '2.0L Gasolina' },
    { id: 7,  idFabricante: 4, nombre: 'Mazda 3',        anioDesde: 2014, anioHasta: 2023, cilindrajeCc: 2000, motorDescripcion: '2.0L Gasolina' },
    { id: 8,  idFabricante: 5, nombre: 'Hilux Diesel',   anioDesde: 2010, anioHasta: 2023, cilindrajeCc: 2400, motorDescripcion: '2.4L Diesel' },
    { id: 9,  idFabricante: 6, nombre: 'FZ25',           anioDesde: 2016, anioHasta: 2023, cilindrajeCc: 250,  motorDescripcion: '250cc' },
    { id: 10, idFabricante: 6, nombre: 'MT03',           anioDesde: 2015, anioHasta: 2023, cilindrajeCc: 321,  motorDescripcion: '321cc' },
    { id: 11, idFabricante: 7, nombre: 'XR150',          anioDesde: 2015, anioHasta: 2023, cilindrajeCc: 150,  motorDescripcion: '150cc' },
    { id: 12, idFabricante: 7, nombre: 'CBR250',         anioDesde: 2011, anioHasta: 2022, cilindrajeCc: 250,  motorDescripcion: '250cc' },
    { id: 13, idFabricante: 8, nombre: 'GN125',          anioDesde: 2010, anioHasta: 2023, cilindrajeCc: 125,  motorDescripcion: '125cc' },
  ];

  // Tabla pivote: vincula modelo ↔ producto (filtro) con tipo de filtro
  private compatibilidad: CompatibilidadFiltro[] = [
    // Dmax Diesel → filtros Tecnifil y Baldwin
    { id: 1,  idModelo: 1, idProducto: 20, tipoFiltro: 'aceite' },
    { id: 2,  idModelo: 1, idProducto: 21, tipoFiltro: 'aire' },
    { id: 3,  idModelo: 1, idProducto: 22, tipoFiltro: 'combustible' },
    { id: 4,  idModelo: 1, idProducto: 23, tipoFiltro: 'aceite' },
    { id: 5,  idModelo: 1, idProducto: 24, tipoFiltro: 'aire' },
    // Spark GT
    { id: 6,  idModelo: 2, idProducto: 20, tipoFiltro: 'aceite' },
    { id: 7,  idModelo: 2, idProducto: 21, tipoFiltro: 'aire' },
    // Aveo
    { id: 8,  idModelo: 3, idProducto: 20, tipoFiltro: 'aceite' },
    // Duster
    { id: 9,  idModelo: 4, idProducto: 20, tipoFiltro: 'aceite' },
    { id: 10, idModelo: 4, idProducto: 21, tipoFiltro: 'aire' },
    // Sportage
    { id: 11, idModelo: 6, idProducto: 23, tipoFiltro: 'aceite' },
    { id: 12, idModelo: 6, idProducto: 25, tipoFiltro: 'aire' },
    // FZ25 (moto)
    { id: 13, idModelo: 9,  idProducto: 20, tipoFiltro: 'aceite' },
    // XR150 (moto)
    { id: 14, idModelo: 11, idProducto: 20, tipoFiltro: 'aceite' },
    // GN125 (moto)
    { id: 15, idModelo: 13, idProducto: 20, tipoFiltro: 'aceite' },
  ];

  // ----------------------------------------------------------
  // MÉTODOS EN CASCADA (lógica del formulario de filtros)
  // ----------------------------------------------------------

  getTipos(): TipoAplicacion[] {
    return this.tipos;
  }

  getFabricantes(idTipo: number): FabricanteVehiculo[] {
    return this.fabricantes.filter(f => f.idTipo === idTipo);
  }

  // Retorna los nombres únicos de modelos para un fabricante
  getNombresModelos(idFabricante: number): string[] {
    const nombres = this.modelos
      .filter(m => m.idFabricante === idFabricante)
      .map(m => m.nombre);
    return [...new Set(nombres)];
  }

  // Años disponibles para un fabricante + nombre de modelo
  getAnios(idFabricante: number, nombreModelo: string): number[] {
    const modelosFiltrados = this.modelos.filter(
      m => m.idFabricante === idFabricante && m.nombre === nombreModelo
    );
    const anios = new Set<number>();
    modelosFiltrados.forEach(m => {
      for (let y = m.anioDesde; y <= m.anioHasta; y++) anios.add(y);
    });
    return [...anios].sort((a, b) => b - a); // más reciente primero
  }

  // Cilindradas disponibles para fabricante + modelo + año
  getCilindradas(idFabricante: number, nombreModelo: string, anio: number): number[] {
    const modelosFiltrados = this.modelos.filter(
      m =>
        m.idFabricante === idFabricante &&
        m.nombre === nombreModelo &&
        anio >= m.anioDesde &&
        anio <= m.anioHasta
    );
    const ccs = modelosFiltrados.map(m => m.cilindrajeCc);
    return [...new Set(ccs)].sort((a, b) => a - b);
  }

  // Método principal: devuelve los filtros compatibles con el vehículo
  // Si se pasa slugMarca, filtra solo los productos de esa marca
  buscarFiltros(busqueda: FiltrosBusqueda, slugMarca?: string): Producto[] {
    // 1. Encontrar el/los modelos que coinciden con los 5 datos del vehículo
    const modelosMatch = this.modelos.filter(
      m =>
        m.idFabricante === busqueda.idFabricante &&
        m.nombre === busqueda.nombreModelo &&
        busqueda.anio >= m.anioDesde &&
        busqueda.anio <= m.anioHasta &&
        m.cilindrajeCc === busqueda.cilindrajeCc
    );

    if (modelosMatch.length === 0) return [];

    const modeloIds = modelosMatch.map(m => m.id);

    // 2. Obtener los ids de productos compatibles con esos modelos
    const productosCompatibles = this.compatibilidad
      .filter(c => modeloIds.includes(c.idModelo))
      .map(c => c.idProducto);

    const idsUnicos = [...new Set(productosCompatibles)];

    // 3. Obtener los productos completos desde CatalogoService
    // y filtrar por marca si se especificó
    const todosProductos = this.catalogoService['productos'] as Producto[];

    return todosProductos.filter(p => {
      if (!idsUnicos.includes(p.id)) return false;
      if (slugMarca) {
        const marcas = this.catalogoService['marcas'] as any[];
        const marca = marcas.find((m: any) => m.slug === slugMarca.toLowerCase());
        if (marca && p.idMarca !== marca.id) return false;
      }
      return p.activo;
    });
  }

  // Útil para obtener el tipo de filtro de un producto en un modelo dado
  getTipoFiltroDeProducto(idModelo: number, idProducto: number): string {
    const compat = this.compatibilidad.find(
      c => c.idModelo === idModelo && c.idProducto === idProducto
    );
    return compat?.tipoFiltro ?? '';
  }
}
