import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReserva } from './view-reserva';

describe('ViewReserva', () => {
  let component: ViewReserva;
  let fixture: ComponentFixture<ViewReserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReserva]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReserva);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
