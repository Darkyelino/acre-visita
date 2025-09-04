import { TestBed } from '@angular/core/testing';

import { EnderecoVisitanteService } from './endereco-visitante';

describe('EnderecoVisitanteService', () => {
  let service: EnderecoVisitanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnderecoVisitanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
