import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarDocumentos } from './gerenciar-documentos';

describe('GerenciarDocumentos', () => {
  let component: GerenciarDocumentos;
  let fixture: ComponentFixture<GerenciarDocumentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarDocumentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarDocumentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
