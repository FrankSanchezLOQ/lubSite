import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo-filtros.html',
  styleUrl: './catalogo-filtros.css',
})
export class CatalogoFiltros {

  // 🔥 FILTROS SELECCIONADOS
  tipoSeleccionado: string = '';
  marcaSeleccionada: string = '';
  modeloSeleccionado: string = '';

  // 🔥 DATA BASE (simulada)
  tipos = ['Carro', 'Moto', 'Pesado'];

  marcasPorTipo: any = {
    Carro: ['Chevrolet', 'Renault', 'Mazda'],
    Moto: ['Yamaha', 'Honda'],
    Pesado: ['Volvo', 'Scania']
  };

  modelosPorMarca: any = {
    Chevrolet: ['Dmax', 'Spark'],
    Renault: ['Duster', 'Logan'],
    Mazda: ['Mazda 3'],
    Yamaha: ['FZ', 'R15'],
    Honda: ['CBR', 'XR'],
    Volvo: ['FH'],
    Scania: ['R450']
  };

  // 🔥 GETTERS DINÁMICOS

  get marcasDisponibles() {
    return this.marcasPorTipo[this.tipoSeleccionado] || [];
  }

  get modelosDisponibles() {
    return this.modelosPorMarca[this.marcaSeleccionada] || [];
  }

}