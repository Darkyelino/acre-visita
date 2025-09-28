import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueciSenha } from './esqueci-senha';

describe('EsqueciSenha', () => {
  let component: EsqueciSenha;
  let fixture: ComponentFixture<EsqueciSenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsqueciSenha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsqueciSenha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
