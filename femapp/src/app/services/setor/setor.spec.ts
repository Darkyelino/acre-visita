import { TestBed } from '@angular/core/testing';

import { SetorService } from './setor';

describe('SetorService', () => {
  let service: SetorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
