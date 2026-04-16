import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Producto {
  nombre: string;
  tipo: string;
  referencia: string;
  imagen?: string;
}

@Component({
  selector: 'app-catalogo-aceites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo-aceites.html',
  styleUrl: './catalogo-aceites.css',
})

export class CatalogoAceites implements OnChanges {

  @Input() marca: string = '';
  @Input() tipo: string = '';
  @Input() referencia: string = '';

  @Output() productosFiltrados = new EventEmitter<number>();

  productosFiltradosLista: Producto[] = [];

  productosPorMarca: Record<string, Producto[]> = {
  mobil: [
    { nombre: 'Mobil 20W50', tipo: 'Moto', referencia: '20w50', imagen: '/beg.png' },
    { nombre: 'Mobil 10W30', tipo: 'Carro', referencia: '10w30', imagen: '/beg.png' }
  ],
  shell: [
    { nombre: 'Shell 20W50', tipo: 'Moto', referencia: '20w50', imagen: '/beg.png' },
    { nombre: 'Shell 5W30', tipo: 'Carro', referencia: '5w30', imagen: '/beg.png' }
  ],
  castrol: [
    { nombre: 'Castrol 20W50', tipo: 'Moto', referencia: '20w50', imagen: '/beg.png' },
    { nombre: 'Castrol 10W40', tipo: 'Carro', referencia: '10w40', imagen: '/beg.png' }
  ],
  total: [
    { nombre: 'total 20W50', tipo: 'Moto', referencia: '20w50', imagen: '/beg.png' },
    { nombre: 'total 10W40', tipo: 'Carro', referencia: '10w40', imagen: '/beg.png' }
  ]
};

  //Este metodo se ejcuta cada que cambian los filtros
  ngOnChanges(){
    this.filtrarProductos();
  }

  filtrarProductos() {
    let productos: Producto[] = this.productosPorMarca[this.marca?.toLowerCase()] || [];

    if (this.tipo) {
      productos = productos.filter(p => p.tipo === this.tipo);
    }

    if (this.referencia) {
      productos = productos.filter(p => p.referencia === this.referencia);
    }

    //guardamos resultados
    this.productosFiltradosLista = productos;

    //Envia la cantidad filtrada al padre.
    this.productosFiltrados.emit(productos.length);
    } 
}
