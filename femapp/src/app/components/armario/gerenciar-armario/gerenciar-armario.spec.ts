import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarArmario } from './gerenciar-armario';

describe('GerenciarArmario', () => {
  let component: GerenciarArmario;
  let fixture: ComponentFixture<GerenciarArmario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarArmario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarArmario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
