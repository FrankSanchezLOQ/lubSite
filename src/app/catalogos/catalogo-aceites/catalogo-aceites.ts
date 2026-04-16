import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo-aceites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo-aceites.html',
  styleUrl: './catalogo-aceites.css',
})
export class CatalogoAceites {
  @Input() marca: string = '';

  productosPorMarca: any = {
  mobil: [
    { nombre: 'Mobil 20W50', tipo: 'Moto', imagen: '/beg.png' },
    { nombre: 'Mobil 10W30', tipo: 'Carro', imagen: '/beg.png' }
  ],
  shell: [
    { nombre: 'Shell 20W50', tipo: 'Moto', imagen: '/beg.png' },
    { nombre: 'Shell 5W30', tipo: 'Carro', imagen: '/beg.png' }
  ],
  castrol: [
    { nombre: 'Castrol 20W50', tipo: 'Moto', imagen: '/beg.png' },
    { nombre: 'Castrol 10W40', tipo: 'Carro', imagen: '/beg.png' }
  ],
  total: [
    { nombre: 'total 20W50', tipo: 'Moto', imagen: '/beg.png' },
    { nombre: 'total 10W40', tipo: 'Carro', imagen: '/beg.png' }
  ]
};

get productos() {
  return this.productosPorMarca[this.marca?.toLowerCase()] || [];
}

}
