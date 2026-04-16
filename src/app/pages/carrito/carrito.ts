import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  productosAgregados = [
    { nombre: 'Aceite Mobil 5W-30', cantidad: 1, precio: 58000 },
    { nombre: 'Filtro Tecnifil PF-900', cantidad: 2, precio: 32000 },
  ];

  get total(): number {
    return this.productosAgregados.reduce((acum, item) => acum + item.cantidad * item.precio, 0);
  }
}
