import { TestBed } from '@angular/core/testing';

import { Feedback } from './feedback';

describe('Feedback', () => {
  let service: Feedback;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Feedback);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
