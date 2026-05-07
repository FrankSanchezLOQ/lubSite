import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogoService } from '../../services/catalogo.service';
import { Marca } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  imports: [RouterLink],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {
  private catalogoService = inject(CatalogoService);

  marcasAceites:  Marca[] = this.catalogoService.getMarcasPorCategoria('aceites');
  marcasFiltros:  Marca[] = this.catalogoService.getMarcasPorCategoria('filtros');
  marcasGrasas:   Marca[] = this.catalogoService.getMarcasPorCategoria('grasas');
  marcasAditivos: Marca[] = this.catalogoService.getMarcasPorCategoria('aditivos');

  categorias = [
    { id: 'aceites',  label: 'Aceites' },
    { id: 'filtros',  label: 'Filtros' },
    { id: 'grasas',   label: 'Grasas' },
    { id: 'aditivos', label: 'Aditivos' },
  ];

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}