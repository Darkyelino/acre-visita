import { TestBed } from '@angular/core/testing';

import { ReservaAuditorio } from './reserva-auditorio';

describe('ReservaAuditorio', () => {
  let service: ReservaAuditorio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaAuditorio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
