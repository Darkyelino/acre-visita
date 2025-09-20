import { TestBed } from '@angular/core/testing';

import { Cep } from './cep';

describe('Cep', () => {
  let service: Cep;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cep);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
