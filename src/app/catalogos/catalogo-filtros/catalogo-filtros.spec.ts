import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoFiltros } from './catalogo-filtros';

describe('CatalogoFiltros', () => {
  let component: CatalogoFiltros;
  let fixture: ComponentFixture<CatalogoFiltros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoFiltros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoFiltros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
