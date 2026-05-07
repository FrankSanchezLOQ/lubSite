import { Component, Input, OnChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { CatalogoService } from '../../services/catalogo.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto, Presentacion } from '../../models/producto.model';

@Component({
  selector: 'app-catalogo-aceites',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './catalogo-aceites.html',
  styleUrl: './catalogo-aceites.css',
})
export class CatalogoAceites implements OnChanges {

  @Input() marca = '';

  private catalogoService = inject(CatalogoService);
  carritoService          = inject(CarritoService);

  filtroAplicacion = '';
  filtroViscosidad = '';
  filtroBase       = '';

  private todosLosProductos: Producto[] = [];
  productosFiltrados: Producto[]        = [];
  agregadoId: number | null             = null;

  // Presentación seleccionada por producto (clave: id del producto)
  presentacionSeleccionada: Record<number, Presentacion | null> = {};

  ngOnChanges(): void {
    this.todosLosProductos = this.catalogoService.getProductos('aceites', this.marca);
    this.limpiarFiltros();
  }

  get viscosidadesDisponibles(): string[] {
    const v = this.todosLosProductos.map(p => p.viscosidad ?? '').filter(Boolean);
    return [...new Set(v)].sort();
  }

  filtrar(): void {
    this.productosFiltrados = this.todosLosProductos.filter(p => {
      const porAplicacion = !this.filtroAplicacion || p.aplicacion === this.filtroAplicacion;
      const porViscosidad = !this.filtroViscosidad || p.viscosidad === this.filtroViscosidad;
      const porBase       = !this.filtroBase       || p.tipoBase   === this.filtroBase;
      return porAplicacion && porViscosidad && porBase;
    });
    // Inicializar presentación por defecto (la primera) para cada producto
    this.productosFiltrados.forEach(p => {
      if (p.presentaciones.length > 0 && !this.presentacionSeleccionada[p.id]) {
        this.presentacionSeleccionada[p.id] = p.presentaciones[0];
      }
    });
  }

  limpiarFiltros(): void {
    this.filtroAplicacion = '';
    this.filtroViscosidad = '';
    this.filtroBase       = '';
    this.presentacionSeleccionada = {};
    this.filtrar();
  }

  // Precio a mostrar: el de la presentación seleccionada o el base
  precioActual(producto: Producto): number {
    const pres = this.presentacionSeleccionada[producto.id];
    return pres ? pres.precio : producto.precio;
  }

  agregarAlCarrito(producto: Producto): void {
    const presentacion = this.presentacionSeleccionada[producto.id] ?? null;
    this.carritoService.agregar(producto, presentacion);
    this.agregadoId = producto.id;
    setTimeout(() => (this.agregadoId = null), 1500);
  }
}