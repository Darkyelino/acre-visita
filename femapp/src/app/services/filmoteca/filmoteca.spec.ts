import { TestBed } from '@angular/core/testing';

import { Filmoteca } from './filmoteca';

describe('Filmoteca', () => {
  let service: Filmoteca;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Filmoteca);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
