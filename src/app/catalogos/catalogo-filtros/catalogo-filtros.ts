import { Component, Input, OnChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe, NgClass } from '@angular/common';
import { VehiculoService } from '../../services/vehiculo.service';
import { CatalogoService } from '../../services/catalogo.service';
import { CarritoService } from '../../services/carrito.service';
import { TipoAplicacion, FabricanteVehiculo, FiltrosBusqueda } from '../../models/vehiculo.model';
import { Producto, Equivalencia } from '../../models/producto.model';

@Component({
  selector: 'app-catalogo-filtros',
  imports: [FormsModule, TitleCasePipe, NgClass],
  templateUrl: './catalogo-filtros.html',
  styleUrl: './catalogo-filtros.css',
})
export class CatalogoFiltros implements OnChanges {

  @Input() marca = '';

  private vehiculoService = inject(VehiculoService);
  private catalogoService = inject(CatalogoService);
  carritoService          = inject(CarritoService);

  tipos:       TipoAplicacion[]     = [];
  fabricantes: FabricanteVehiculo[] = [];
  modelos:     string[]             = [];
  anios:       number[]             = [];
  cilindradas: number[]             = [];

  idTipoSel      = 0;
  idFabSel       = 0;
  modeloSel      = '';
  anioSel        = 0;
  cilindradaSel  = 0;

  resultados:         Producto[]   = [];
  buscado             = false;
  agregadoId:         number | null = null;
  modalAbierto        = false;
  productoModal:      Producto | null = null;
  equivalenciasModal: Equivalencia[] = [];

  ngOnChanges(): void {
    this.tipos = this.vehiculoService.getTipos();
    this.resetDesde('tipo');
  }

  onTipoChange(): void {
    this.resetDesde('tipo');
    if (!this.idTipoSel) return;
    this.fabricantes = this.vehiculoService.getFabricantes(this.idTipoSel);
  }

  onFabricanteChange(): void {
    this.resetDesde('fabricante');
    if (!this.idFabSel) return;
    this.modelos = this.vehiculoService.getNombresModelos(this.idFabSel);
  }

  onModeloChange(): void {
    this.resetDesde('modelo');
    if (!this.modeloSel) return;
    this.anios = this.vehiculoService.getAnios(this.idFabSel, this.modeloSel);
  }

  onAnioChange(): void {
    this.resetDesde('anio');
    if (!this.anioSel) return;
    this.cilindradas = this.vehiculoService.getCilindradas(this.idFabSel, this.modeloSel, this.anioSel);
    if (this.cilindradas.length === 1) this.cilindradaSel = this.cilindradas[0];
  }

  get puedesBuscar(): boolean {
    return !!(this.idTipoSel && this.idFabSel && this.modeloSel && this.anioSel && this.cilindradaSel);
  }

  buscarFiltros(): void {
    const busqueda: FiltrosBusqueda = {
      idTipo:       this.idTipoSel,
      idFabricante: this.idFabSel,
      nombreModelo: this.modeloSel,
      anio:         this.anioSel,
      cilindrajeCc: this.cilindradaSel,
    };
    this.resultados = this.vehiculoService.buscarFiltros(busqueda, this.marca || undefined);
    this.buscado = true;
  }

  tipoFiltroLabel(producto: Producto): string {
    const labels: Record<string, string> = {
      aceite: 'Aceite', aire: 'Aire motor', combustible: 'Combustible',
      ac: 'Aire acondicionado', hidraulico: 'Hidráulico',
    };
    return labels[producto.tipoFiltro ?? ''] ?? '';
  }

  tipoFiltroColor(producto: Producto): string {
    const colores: Record<string, string> = {
      aceite: 'tag-aceite', aire: 'tag-aire', combustible: 'tag-combustible',
      ac: 'tag-ac', hidraulico: 'tag-hidraulico',
    };
    return colores[producto.tipoFiltro ?? ''] ?? '';
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregar(producto);
    this.agregadoId = producto.id;
    setTimeout(() => (this.agregadoId = null), 1500);
  }

  abrirModal(producto: Producto): void {
    this.productoModal      = producto;
    this.equivalenciasModal = this.catalogoService.getEquivalencias(producto.id);
    this.modalAbierto       = true;
  }

  cerrarModal(): void {
    this.modalAbierto  = false;
    this.productoModal = null;
  }

  limpiarFiltros(): void {
    this.resetDesde('tipo');
    this.idTipoSel = 0;
    this.resultados = [];
    this.buscado    = false;
  }

  private resetDesde(desde: 'tipo' | 'fabricante' | 'modelo' | 'anio'): void {
    if (desde === 'tipo')                                           { this.fabricantes = []; this.idFabSel = 0; }
    if (desde === 'tipo' || desde === 'fabricante')                { this.modelos = []; this.modeloSel = ''; }
    if (desde === 'tipo' || desde === 'fabricante' || desde === 'modelo') { this.anios = []; this.anioSel = 0; }
    if (desde !== 'anio')                                          { this.cilindradas = []; this.cilindradaSel = 0; }
    this.resultados = [];
    this.buscado    = false;
  }
}