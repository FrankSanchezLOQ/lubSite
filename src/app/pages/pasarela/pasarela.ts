import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-pasarela',
  imports: [RouterLink, FormsModule],
  templateUrl: './pasarela.html',
  styleUrl: './pasarela.css',
})
export class Pasarela {
  carritoService = inject(CarritoService);

  // Datos de envío (no financieros)
  nombreContacto  = '';
  telefono        = '';
  direccionEnvio  = '';
  notas           = '';

  pedidoConfirmado = false;

  confirmarPedido(): void {
    if (!this.nombreContacto || !this.telefono) return;
    // FUTURO: this.http.post('/api/pedidos', { items, datosEnvio })
    this.pedidoConfirmado = true;
    this.carritoService.limpiar();
  }

  get formularioValido(): boolean {
    return !!(this.nombreContacto.trim() && this.telefono.trim());
  }
}