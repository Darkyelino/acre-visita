import { TestBed } from '@angular/core/testing';

import { ArmarioService } from './armario.service';

describe('ArmarioService', () => {
  let service: ArmarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
