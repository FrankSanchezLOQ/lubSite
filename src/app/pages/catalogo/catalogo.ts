import { Component } from '@angular/core';
import { CatalogoAceites } from "../../catalogos/catalogo-aceites/catalogo-aceites";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  imports: [CatalogoAceites, CommonModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {

  onFiltroChange(){
    
  }

  limpiarFiltros() {
    this.tipoSeleccionado = '';
    this.referenciaSeleccionada = '';
  }

  totalProductos: number = 0;

  categoria: string = '';
  marca: string = '';

  tipoSeleccionado: string = '';
  referenciaSeleccionada: string = '';

  constructor(private route: ActivatedRoute) {
    this.categoria = this.route.snapshot.params['categoria'];
    this.marca = this.route.snapshot.params['marca'];
  }

  get referenciasDisponibles(){
    const referenciasPorMarca: any = {
      mobil: ['20w50', '15w40', '10w40'],
      shell: ['20w50', '15w40', '10w40'],
      castrol: ['20w50', '15w40', '10w40'],
      total: ['20w50', '15w40', '10w40']
    };

    return referenciasPorMarca[this.marca?.toLowerCase()] || [];
  }
  
}
