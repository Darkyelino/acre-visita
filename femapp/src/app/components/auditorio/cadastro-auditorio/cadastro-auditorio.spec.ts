import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAuditorio } from './cadastro-auditorio';

describe('CadastroAuditorio', () => {
  let component: CadastroAuditorio;
  let fixture: ComponentFixture<CadastroAuditorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAuditorio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroAuditorio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
