import { TestBed } from '@angular/core/testing';

import { EnderecoVisitante } from './endereco-visitante';

describe('EnderecoVisitante', () => {
  let service: EnderecoVisitante;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnderecoVisitante);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
