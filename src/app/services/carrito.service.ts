import { Injectable, computed, signal } from '@angular/core';
import { ItemCarrito, Producto, Presentacion } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {

  private _items = signal<ItemCarrito[]>([]);

  readonly items   = this._items.asReadonly();
  readonly conteo  = computed(() => this._items().reduce((acc, i) => acc + i.cantidad, 0));
  readonly total   = computed(() => this._items().reduce((acc, i) => {
    const precio = i.presentacion ? i.presentacion.precio : i.producto.precio;
    return acc + precio * i.cantidad;
  }, 0));
  readonly isEmpty = computed(() => this._items().length === 0);

  // Clave única: combina id de producto + id de presentación
  private clave(idProducto: number, presentacion: Presentacion | null): string {
    return presentacion ? `${idProducto}-${presentacion.id}` : `${idProducto}`;
  }

  agregar(producto: Producto, presentacion: Presentacion | null = null, cantidad = 1): void {
    const clave    = this.clave(producto.id, presentacion);
    const actuales = this._items();
    const existente = actuales.find(i => this.clave(i.producto.id, i.presentacion) === clave);

    if (existente) {
      this._items.set(actuales.map(i =>
        this.clave(i.producto.id, i.presentacion) === clave
          ? { ...i, cantidad: i.cantidad + cantidad }
          : i
      ));
    } else {
      this._items.set([...actuales, { producto, presentacion, cantidad }]);
    }
  }

  cambiarCantidad(idProducto: number, presentacionId: number | null, delta: number): void {
    const actuales = this._items();
    const item = actuales.find(i =>
      i.producto.id === idProducto &&
      (presentacionId === null ? i.presentacion === null : i.presentacion?.id === presentacionId)
    );
    if (!item) return;
    const nueva = item.cantidad + delta;
    if (nueva <= 0) {
      this._items.set(actuales.filter(i => i !== item));
    } else {
      this._items.set(actuales.map(i => i === item ? { ...i, cantidad: nueva } : i));
    }
  }

  eliminar(idProducto: number, presentacionId: number | null = null): void {
    this._items.set(this._items().filter(i =>
      !(i.producto.id === idProducto &&
        (presentacionId === null ? i.presentacion === null : i.presentacion?.id === presentacionId))
    ));
  }

  limpiar(): void { this._items.set([]); }

  precioItem(item: ItemCarrito): number {
    return item.presentacion ? item.presentacion.precio : item.producto.precio;
  }

  etiquetaItem(item: ItemCarrito): string {
    return item.presentacion
      ? `${item.producto.nombre} — ${item.presentacion.nombre}`
      : item.producto.nombre;
  }
}