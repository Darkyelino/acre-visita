import { TestBed } from '@angular/core/testing';

import { DocVisitanteService } from './doc-visitante';

describe('DocVisitanteService', () => {
  let service: DocVisitanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocVisitanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
