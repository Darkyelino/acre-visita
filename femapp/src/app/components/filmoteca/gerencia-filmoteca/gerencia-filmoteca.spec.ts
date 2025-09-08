import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciaFilmoteca } from './gerencia-filmoteca';

describe('GerenciaFilmoteca', () => {
  let component: GerenciaFilmoteca;
  let fixture: ComponentFixture<GerenciaFilmoteca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciaFilmoteca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciaFilmoteca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
