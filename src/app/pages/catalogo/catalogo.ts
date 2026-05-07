import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogoAceites }   from '../../catalogos/catalogo-aceites/catalogo-aceites';
import { CatalogoFiltros }   from '../../catalogos/catalogo-filtros/catalogo-filtros';
import { CatalogoGrasas }    from '../../catalogos/catalogo-grasas/catalogo-grasas';
import { CatalogoAditivos }  from '../../catalogos/catalogo-aditivos/catalogo-aditivos';

@Component({
  selector: 'app-catalogo',
  imports: [CatalogoAceites, CatalogoFiltros, CatalogoGrasas, CatalogoAditivos],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  private route = inject(ActivatedRoute);

  readonly categoria = this.route.snapshot.params['categoria'] as string;
  readonly marca     = this.route.snapshot.params['marca']     as string;
}