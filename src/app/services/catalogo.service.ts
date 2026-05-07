import { Injectable } from '@angular/core';
import { Categoria, Marca, Producto, Equivalencia, Presentacion } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class CatalogoService {

  private categorias: Categoria[] = [
    { id: 1, nombre: 'Aceites',  slug: 'aceites' },
    { id: 2, nombre: 'Filtros',  slug: 'filtros' },
    { id: 3, nombre: 'Grasas',   slug: 'grasas' },
    { id: 4, nombre: 'Aditivos', slug: 'aditivos' },
  ];

  private marcas: Marca[] = [
    { id: 1,  nombre: 'Mobil',     slug: 'mobil',     logoUrl: '/mobil.jpg',     activo: true, categorias: [1] },
    { id: 2,  nombre: 'Castrol',   slug: 'castrol',   logoUrl: '/castrol.jpg',   activo: true, categorias: [1] },
    { id: 3,  nombre: 'Shell',     slug: 'shell',     logoUrl: '/shell.jpg',     activo: true, categorias: [1] },
    { id: 4,  nombre: 'Total',     slug: 'total',     logoUrl: '/total.jpg',     activo: true, categorias: [1] },
    { id: 5,  nombre: 'Tecnifil',  slug: 'tecnifil',  logoUrl: '/tecnifil.png',  activo: true, categorias: [2] },
    { id: 6,  nombre: 'Baldwin',   slug: 'baldwin',   logoUrl: '/baldwin.jpg',   activo: true, categorias: [2] },
    { id: 7,  nombre: 'Donsson',   slug: 'donsson',   logoUrl: '/donsson.png',   activo: true, categorias: [2] },
    { id: 8,  nombre: 'Donaldson', slug: 'donaldson', logoUrl: '/donaldson.jpg', activo: true, categorias: [2] },
    { id: 9,  nombre: 'Superkote', slug: 'superkote', logoUrl: '/superkote.png', activo: true, categorias: [3] },
    { id: 10, nombre: 'BEG',       slug: 'beg',       logoUrl: '/beg.png',       activo: true, categorias: [3] },
    { id: 11, nombre: 'Special',   slug: 'special',   logoUrl: '/special.png',   activo: true, categorias: [3] },
    { id: 12, nombre: 'Motodo',    slug: 'motodo',    logoUrl: '/motodo.png',     activo: true, categorias: [3] },
    { id: 13, nombre: 'Molyven',   slug: 'molyven',   logoUrl: '/molyven.jpg',   activo: true, categorias: [4] },
    { id: 14, nombre: 'Simoniz',   slug: 'simoniz',   logoUrl: '/simoniz.png',   activo: true, categorias: [4] },
    { id: 15, nombre: 'CRC',       slug: 'crc',       logoUrl: '/crc.png',       activo: true, categorias: [4] },
  ];

  private productos: Producto[] = [
    // ── ACEITES MOBIL ──────────────────────────────────────
    {
      id: 1, idCategoria: 1, idMarca: 1,
      referencia: 'MOB-20W50', nombre: 'Mobil Super 20W50',
      imagenUrl: '/mobil.jpg', precio: 18000, stock: 50, activo: true,
      viscosidad: '20W50', tipoBase: 'Mineral', aplicacion: 'Carro',
      presentaciones: [
        { id: 1, idProducto: 1, nombre: 'Pinta',  unidad: 'L', cantidad: 0.473, referencia: 'MOB-20W50-PT', precio: 18000, stock: 50 },
        { id: 2, idProducto: 1, nombre: 'Cuarto', unidad: 'L', cantidad: 0.946, referencia: 'MOB-20W50-QT', precio: 28900, stock: 40 },
        { id: 3, idProducto: 1, nombre: 'Galón',  unidad: 'L', cantidad: 3.785, referencia: 'MOB-20W50-GL', precio: 98000, stock: 20 },
        { id: 4, idProducto: 1, nombre: 'Caneca', unidad: 'L', cantidad: 19,    referencia: 'MOB-20W50-CN', precio: 420000, stock: 5 },
      ],
    },
    {
      id: 2, idCategoria: 1, idMarca: 1,
      referencia: 'MOB-10W30', nombre: 'Mobil 1 10W30 Full Syn',
      imagenUrl: '/mobil.jpg', precio: 35000, stock: 30, activo: true,
      viscosidad: '10W30', tipoBase: 'Sintético', aplicacion: 'Carro',
      presentaciones: [
        { id: 5, idProducto: 2, nombre: 'Cuarto', unidad: 'L', cantidad: 0.946, referencia: 'MOB-10W30-QT', precio: 52000, stock: 30 },
        { id: 6, idProducto: 2, nombre: 'Galón',  unidad: 'L', cantidad: 3.785, referencia: 'MOB-10W30-GL', precio: 185000, stock: 12 },
      ],
    },
    {
      id: 3, idCategoria: 1, idMarca: 1,
      referencia: 'MOB-15W40', nombre: 'Mobil Delvac 15W40',
      imagenUrl: '/mobil.jpg', precio: 30000, stock: 25, activo: true,
      viscosidad: '15W40', tipoBase: 'Semisintético', aplicacion: 'Maquinaria',
      presentaciones: [
        { id: 7,  idProducto: 3, nombre: 'Cuarto', unidad: 'L', cantidad: 0.946, referencia: 'MOB-15W40-QT', precio: 38000, stock: 25 },
        { id: 8,  idProducto: 3, nombre: 'Galón',  unidad: 'L', cantidad: 3.785, referencia: 'MOB-15W40-GL', precio: 130000, stock: 10 },
        { id: 9,  idProducto: 3, nombre: 'Caneca', unidad: 'L', cantidad: 19,    referencia: 'MOB-15W40-CN', precio: 580000, stock: 4 },
        { id: 10, idProducto: 3, nombre: 'Tambor', unidad: 'L', cantidad: 55,    referencia: 'MOB-15W40-TB', precio: 1600000, stock: 2 },
      ],
    },
    {
      id: 4, idCategoria: 1, idMarca: 1,
      referencia: 'MOB-20W50M', nombre: 'Mobil Moto 20W50',
      imagenUrl: '/mobil.jpg', precio: 15000, stock: 40, activo: true,
      viscosidad: '20W50', tipoBase: 'Mineral', aplicacion: 'Moto',
      presentaciones: [
        { id: 11, idProducto: 4, nombre: 'Pinta',  unidad: 'L', cantidad: 0.473, referencia: 'MOB-20W50M-PT', precio: 15000, stock: 40 },
        { id: 12, idProducto: 4, nombre: 'Cuarto', unidad: 'L', cantidad: 0.946, referencia: 'MOB-20W50M-QT', precio: 22000, stock: 30 },
      ],
    },
    // ── ACEITES CASTROL ─────────────────────────────────────
    {
      id: 5, idCategoria: 1, idMarca: 2,
      referencia: 'CAS-20W50', nombre: 'Castrol GTX 20W50',
      imagenUrl: '/castrol.jpg', precio: 17000, stock: 45, activo: true,
      viscosidad: '20W50', tipoBase: 'Mineral', aplicacion: 'Carro',
      presentaciones: [
        { id: 13, idProducto: 5, nombre: 'Pinta',  unidad: 'L', cantidad: 0.473, referencia: 'CAS-20W50-PT', precio: 17000, stock: 45 },
        { id: 14, idProducto: 5, nombre: 'Cuarto', unidad: 'L', cantidad: 0.946, referencia: 'CAS-20W50-QT', precio: 27500, stock: 35 },
        { id: 15, idProducto: 5, nombre: 'Galón',  unidad: 'L', cantidad: 3.785, referencia: 'CAS-20W50-GL', precio: 95000, stock: 15 },
      ],
    },
    {
      id: 6, idCategoria: 1, idMarca: 2,
      referencia: 'CAS-5W30', nombre: 'Castrol Edge 5W30',
      imagenUrl: '/castrol.jpg', precio: 42000, stock: 20, activo: true,
      viscosidad: '5W30', tipoBase: 'Sintético', aplicacion: 'Carro',
      presentaciones: [
        { id: 16, idProducto: 6, nombre: 'Cuarto', unidad: 'L', cantidad: 0.946, referencia: 'CAS-5W30-QT', precio: 61000, stock: 20 },
        { id: 17, idProducto: 6, nombre: 'Galón',  unidad: 'L', cantidad: 3.785, referencia: 'CAS-5W30-GL', precio: 220000, stock: 8 },
      ],
    },
    // ── ACEITES SHELL ────────────────────────────────────────
    {
      id: 7, idCategoria: 1, idMarca: 3,
      referencia: 'SHE-20W50', nombre: 'Shell Helix 20W50',
      imagenUrl: '/shell.jpg', precio: 16000, stock: 50, activo: true,
      viscosidad: '20W50', tipoBase: 'Mineral', aplicacion: 'Carro',
      presentaciones: [
        { id: 18, idProducto: 7, nombre: 'Pinta',  unidad: 'L', cantidad: 0.473, referencia: 'SHE-20W50-PT', precio: 16000, stock: 50 },
        { id: 19, idProducto: 7, nombre: 'Cuarto', unidad: 'L', cantidad: 0.946, referencia: 'SHE-20W50-QT', precio: 26000, stock: 40 },
        { id: 20, idProducto: 7, nombre: 'Galón',  unidad: 'L', cantidad: 3.785, referencia: 'SHE-20W50-GL', precio: 90000, stock: 18 },
      ],
    },
    // ── FILTROS ─────────────────────────────────────────────
    {
      id: 20, idCategoria: 2, idMarca: 5,
      referencia: 'TF-OF120', nombre: 'Filtro Aceite Tecnifil OF120',
      imagenUrl: '/tecnifil.png', precio: 18000, stock: 60, activo: true,
      tipoFiltro: 'aceite', presentaciones: [],
    },
    {
      id: 21, idCategoria: 2, idMarca: 5,
      referencia: 'TF-AF220', nombre: 'Filtro Aire Tecnifil AF220',
      imagenUrl: '/tecnifil.png', precio: 22000, stock: 40, activo: true,
      tipoFiltro: 'aire', presentaciones: [],
    },
    {
      id: 22, idCategoria: 2, idMarca: 5,
      referencia: 'TF-CF110', nombre: 'Filtro Combustible TF-CF110',
      imagenUrl: '/tecnifil.png', precio: 27000, stock: 30, activo: true,
      tipoFiltro: 'combustible', presentaciones: [],
    },
    {
      id: 23, idCategoria: 2, idMarca: 6,
      referencia: 'BW-B99', nombre: 'Baldwin B99 Aceite',
      imagenUrl: '/baldwin.jpg', precio: 24000, stock: 35, activo: true,
      tipoFiltro: 'aceite', presentaciones: [],
    },
    {
      id: 24, idCategoria: 2, idMarca: 6,
      referencia: 'BW-PA4786', nombre: 'Baldwin PA4786 Aire',
      imagenUrl: '/baldwin.jpg', precio: 31000, stock: 25, activo: true,
      tipoFiltro: 'aire', presentaciones: [],
    },
    {
      id: 25, idCategoria: 2, idMarca: 8,
      referencia: 'DON-P171853', nombre: 'Donaldson P171853 Aire',
      imagenUrl: '/donaldson.jpg', precio: 33000, stock: 20, activo: true,
      tipoFiltro: 'aire', presentaciones: [],
    },
    // ── GRASAS ──────────────────────────────────────────────
    {
      id: 30, idCategoria: 3, idMarca: 9,
      referencia: 'SK-G', nombre: 'Superkote Grasa EP2',
      imagenUrl: '/superkote.png', precio: 15000, stock: 80, activo: true,
      presentaciones: [
        { id: 50, idProducto: 30, nombre: '250g',  unidad: 'g',  cantidad: 250,  referencia: 'SK-G-250',  precio: 15000, stock: 80 },
        { id: 51, idProducto: 30, nombre: '1 Lb',  unidad: 'Lb', cantidad: 1,    referencia: 'SK-G-1LB',  precio: 22000, stock: 50 },
        { id: 52, idProducto: 30, nombre: '1 Kg',  unidad: 'kg', cantidad: 1,    referencia: 'SK-G-1KG',  precio: 45000, stock: 30 },
        { id: 53, idProducto: 30, nombre: '5 Lb',  unidad: 'Lb', cantidad: 5,    referencia: 'SK-G-5LB',  precio: 95000, stock: 10 },
      ],
    },
    // ── ADITIVOS ─────────────────────────────────────────────
    {
      id: 40, idCategoria: 4, idMarca: 13,
      referencia: 'MOL-A', nombre: 'Molyven Aditivo Motor',
      imagenUrl: '/molyven.jpg', precio: 28000, stock: 40, activo: true,
      presentaciones: [
        { id: 60, idProducto: 40, nombre: '150ml', unidad: 'ml', cantidad: 150, referencia: 'MOL-A-150', precio: 18000, stock: 40 },
        { id: 61, idProducto: 40, nombre: '300ml', unidad: 'ml', cantidad: 300, referencia: 'MOL-A-300', precio: 28000, stock: 30 },
        { id: 62, idProducto: 40, nombre: '1L',    unidad: 'L',  cantidad: 1,   referencia: 'MOL-A-1L',  precio: 75000, stock: 15 },
      ],
    },
    {
      id: 41, idCategoria: 4, idMarca: 15,
      referencia: 'CRC-5056', nombre: 'CRC Limpiador Carburador',
      imagenUrl: '/crc.png', precio: 22000, stock: 45, activo: true,
      presentaciones: [
        { id: 63, idProducto: 41, nombre: '300ml', unidad: 'ml', cantidad: 300, referencia: 'CRC-5056-300', precio: 22000, stock: 45 },
        { id: 64, idProducto: 41, nombre: '500ml', unidad: 'ml', cantidad: 500, referencia: 'CRC-5056-500', precio: 35000, stock: 20 },
      ],
    },
  ];

  private equivalencias: Equivalencia[] = [
    { idProducto: 20, idMarcaEquiv: 6, nombreMarcaEquiv: 'Baldwin',   referenciaEquiv: 'BW-B99',      notas: 'Equivalente directo' },
    { idProducto: 20, idMarcaEquiv: 8, nombreMarcaEquiv: 'Donaldson', referenciaEquiv: 'DON-P557966', notas: 'Compatible' },
    { idProducto: 23, idMarcaEquiv: 5, nombreMarcaEquiv: 'Tecnifil',  referenciaEquiv: 'TF-OF120',    notas: 'Equivalente directo' },
    { idProducto: 21, idMarcaEquiv: 8, nombreMarcaEquiv: 'Donaldson', referenciaEquiv: 'DON-P171853', notas: 'Equivalente directo' },
  ];

  // ── Métodos públicos ────────────────────────────────────────

  getCategorias(): Categoria[] { return this.categorias; }

  getMarcasPorCategoria(slugCategoria: string): Marca[] {
    const cat = this.categorias.find(c => c.slug === slugCategoria);
    if (!cat) return [];
    return this.marcas.filter(m => m.activo && m.categorias.includes(cat.id));
  }

  getMarcaPorSlug(slug: string): Marca | undefined {
    return this.marcas.find(m => m.slug === slug.toLowerCase());
  }

  getProductos(slugCategoria: string, slugMarca: string): Producto[] {
    const cat   = this.categorias.find(c => c.slug === slugCategoria);
    const marca = this.marcas.find(m => m.slug === slugMarca.toLowerCase());
    if (!cat || !marca) return [];
    return this.productos.filter(
      p => p.activo && p.idCategoria === cat.id && p.idMarca === marca.id
    );
  }

  getEquivalencias(idProducto: number): Equivalencia[] {
    return this.equivalencias.filter(e => e.idProducto === idProducto);
  }

  // Expone el array interno para que VehiculoService pueda acceder a los filtros
  get todosLosProductos(): Producto[] { return this.productos; }
}