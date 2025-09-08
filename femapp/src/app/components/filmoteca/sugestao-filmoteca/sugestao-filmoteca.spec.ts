import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugestaoFilmoteca } from './sugestao-filmoteca';

describe('SugestaoFilmoteca', () => {
  let component: SugestaoFilmoteca;
  let fixture: ComponentFixture<SugestaoFilmoteca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SugestaoFilmoteca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SugestaoFilmoteca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
