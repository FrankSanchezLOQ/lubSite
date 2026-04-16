import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pasarela',
  imports: [FormsModule, RouterLink],
  templateUrl: './pasarela.html',
  styleUrl: './pasarela.css',
})
export class Pasarela {
  nombreTitular = '';
  numeroTarjeta = '';
  fechaVencimiento = '';
  cvv = '';
}
