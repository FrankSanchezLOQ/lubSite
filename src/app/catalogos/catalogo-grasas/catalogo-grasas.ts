import { Component, Input, OnChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { CatalogoService } from '../../services/catalogo.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-catalogo-grasas',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './catalogo-grasas.html',
  styleUrl: './catalogo-grasas.css',
})
export class CatalogoGrasas implements OnChanges {

  @Input() marca = '';

  private catalogoService = inject(CatalogoService);
  carritoService          = inject(CarritoService);

  filtroNombre = '';
  private todosLosProductos: Producto[] = [];
  productosFiltrados: Producto[]        = [];
  agregadoId: number | null             = null;

  ngOnChanges(): void {
    this.todosLosProductos = this.catalogoService.getProductos('grasas', this.marca);
    this.limpiarFiltros();
  }

  filtrar(): void {
    const term = this.filtroNombre.toLowerCase().trim();
    this.productosFiltrados = term
      ? this.todosLosProductos.filter(p =>
          p.nombre.toLowerCase().includes(term) ||
          p.referencia.toLowerCase().includes(term))
      : [...this.todosLosProductos];
  }

  limpiarFiltros(): void {
    this.filtroNombre = '';
    this.filtrar();
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregar(producto);
    this.agregadoId = producto.id;
    setTimeout(() => (this.agregadoId = null), 1500);
  }
}
