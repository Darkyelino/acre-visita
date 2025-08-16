import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoVisitanteForm } from './endereco-visitante-form';

describe('EnderecoVisitanteForm', () => {
  let component: EnderecoVisitanteForm;
  let fixture: ComponentFixture<EnderecoVisitanteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnderecoVisitanteForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnderecoVisitanteForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
