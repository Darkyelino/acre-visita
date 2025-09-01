import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorioReserva } from './auditorio-reserva';

describe('AuditorioReserva', () => {
  let component: AuditorioReserva;
  let fixture: ComponentFixture<AuditorioReserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditorioReserva]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditorioReserva);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
