import { TestBed } from '@angular/core/testing';

import { FilmotecaService } from './filmoteca';

describe('FilmotecaService', () => {
  let service: FilmotecaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmotecaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
