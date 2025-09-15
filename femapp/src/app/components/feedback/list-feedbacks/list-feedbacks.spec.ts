import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeedbacks } from './list-feedbacks';

describe('ListFeedbacks', () => {
  let component: ListFeedbacks;
  let fixture: ComponentFixture<ListFeedbacks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFeedbacks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFeedbacks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
