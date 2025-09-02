import { TestBed } from '@angular/core/testing';

import { Nacionalidade } from './nacionalidade';

describe('Nacionalidade', () => {
  let service: Nacionalidade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nacionalidade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
