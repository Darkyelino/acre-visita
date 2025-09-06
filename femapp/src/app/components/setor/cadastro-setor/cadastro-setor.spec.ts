import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroSetor } from './cadastro-setor';

describe('CadastroSetor', () => {
  let component: CadastroSetor;
  let fixture: ComponentFixture<CadastroSetor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroSetor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroSetor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
