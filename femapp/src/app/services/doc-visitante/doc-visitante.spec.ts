import { TestBed } from '@angular/core/testing';

import { DocVisitante } from './doc-visitante';

describe('DocVisitante', () => {
  let service: DocVisitante;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocVisitante);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
