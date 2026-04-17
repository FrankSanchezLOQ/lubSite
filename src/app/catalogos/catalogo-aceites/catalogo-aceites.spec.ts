import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoAceites } from './catalogo-aceites';

describe('CatalogoAceites', () => {
  let component: CatalogoAceites;
  let fixture: ComponentFixture<CatalogoAceites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoAceites]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoAceites);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
