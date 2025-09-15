import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnderecoVisitante } from './form-endereco-visitante';

describe('FormEnderecoVisitante', () => {
  let component: FormEnderecoVisitante;
  let fixture: ComponentFixture<FormEnderecoVisitante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEnderecoVisitante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEnderecoVisitante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
