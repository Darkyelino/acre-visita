import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarVisita } from './gerenciar-visita';

describe('GerenciarVisita', () => {
  let component: GerenciarVisita;
  let fixture: ComponentFixture<GerenciarVisita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarVisita]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarVisita);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
