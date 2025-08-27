import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVisitante } from './cadastro-visitante';

describe('CadastroVisitante', () => {
  let component: CadastroVisitante;
  let fixture: ComponentFixture<CadastroVisitante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroVisitante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroVisitante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
