import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarReservas } from './gerenciar-reservas';

describe('GerenciarReservas', () => {
  let component: GerenciarReservas;
  let fixture: ComponentFixture<GerenciarReservas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarReservas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarReservas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
