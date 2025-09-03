import { TestBed } from '@angular/core/testing';

import { Visita } from './visita';

describe('Visita', () => {
  let service: Visita;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Visita);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
