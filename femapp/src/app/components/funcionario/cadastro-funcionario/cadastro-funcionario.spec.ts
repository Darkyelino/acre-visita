import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFuncionario } from './cadastro-funcionario';

describe('CadastroFuncionario', () => {
  let component: CadastroFuncionario;
  let fixture: ComponentFixture<CadastroFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
