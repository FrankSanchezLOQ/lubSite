import { Component } from '@angular/core';
import { CatalogoAceites } from "../../catalogos/catalogo-aceites/catalogo-aceites";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  imports: [CatalogoAceites, CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {

  categoria: string = '';
  marca: string = '';

  constructor(private route: ActivatedRoute) {
    this.categoria = this.route.snapshot.params['categoria'];
    this.marca = this.route.snapshot.params['marca'];
  }

  
}
