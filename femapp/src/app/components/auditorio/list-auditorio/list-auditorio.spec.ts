import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuditorio } from './list-auditorio';

describe('ListAuditorio', () => {
  let component: ListAuditorio;
  let fixture: ComponentFixture<ListAuditorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAuditorio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAuditorio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
