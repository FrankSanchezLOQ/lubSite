import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  nombre: string;
  tipo: string;
  referencia: string;
  imagen?: string;
}

@Component({
  selector: 'app-catalogo-aceites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo-aceites.html',
  styleUrls: ['./catalogo-aceites.css'],
})

export class CatalogoAceites implements OnChanges, OnInit {

  @Input() marca: string = '';

  tipo: string = '';
  referencia: string = '';

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
      { nombre: 'Total 20W50', tipo: 'Moto', referencia: '20w50', imagen: '/beg.png' },
      { nombre: 'Total 10W40', tipo: 'Carro', referencia: '10w40', imagen: '/beg.png' }
    ]
  };

  ngOnInit() {
    this.filtrarProductos(); // ✅ carga inicial
  }

  ngOnChanges() {
    this.filtrarProductos(); // ✅ cuando cambia marca
  }

  filtrarProductos() {
    let productos: Producto[] =
      this.productosPorMarca[this.marca?.toLowerCase()] || [];

    if (this.tipo) {
      productos = productos.filter(p => p.tipo === this.tipo);
    }

    if (this.referencia) {
      productos = productos.filter(p => p.referencia === this.referencia);
    }

    this.productosFiltradosLista = productos;

    this.productosFiltrados.emit(productos.length);
  }

  get referenciasDisponibles() {
    const refs = this.productosPorMarca[this.marca?.toLowerCase()] || [];
    return [...new Set(refs.map(p => p.referencia))];
  }

  limpiarFiltros() {
    this.tipo = '';
    this.referencia = '';
    this.filtrarProductos(); // ✅ MUY IMPORTANTE
  }
}