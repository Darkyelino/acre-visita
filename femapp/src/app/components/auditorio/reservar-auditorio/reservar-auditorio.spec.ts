import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarAuditorio } from './reservar-auditorio';

describe('ReservarAuditorio', () => {
  let component: ReservarAuditorio;
  let fixture: ComponentFixture<ReservarAuditorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservarAuditorio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservarAuditorio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
