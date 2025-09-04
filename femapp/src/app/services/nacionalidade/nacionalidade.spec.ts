import { TestBed } from '@angular/core/testing';

import { NacionalidadeService } from './nacionalidade';

describe('NacionalidadeService', () => {
  let service: NacionalidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NacionalidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
