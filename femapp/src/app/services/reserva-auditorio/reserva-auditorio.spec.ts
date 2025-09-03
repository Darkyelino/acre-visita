import { TestBed } from '@angular/core/testing';

import { ReservaAuditorioService } from './reserva-auditorio';

describe('ReservaAuditorioService', () => {
  let service: ReservaAuditorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaAuditorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
