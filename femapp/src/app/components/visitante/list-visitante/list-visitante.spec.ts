import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVisitante } from './list-visitante';

describe('ListVisitante', () => {
  let component: ListVisitante;
  let fixture: ComponentFixture<ListVisitante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVisitante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVisitante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
