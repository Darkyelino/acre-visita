import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazerFeedback } from './fazer-feedback';

describe('FazerFeedback', () => {
  let component: FazerFeedback;
  let fixture: ComponentFixture<FazerFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FazerFeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FazerFeedback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
