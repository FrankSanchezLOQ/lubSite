import { Component, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  carritoService = inject(CarritoService);

  menuAbierto = false;

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  @HostListener('window:click', ['$event'])
  clickFuera(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar')) {
      this.menuAbierto = false;
    }
  }
}
