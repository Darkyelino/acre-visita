import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedback } from './view-feedback';

describe('ViewFeedback', () => {
  let component: ViewFeedback;
  let fixture: ComponentFixture<ViewFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFeedback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
