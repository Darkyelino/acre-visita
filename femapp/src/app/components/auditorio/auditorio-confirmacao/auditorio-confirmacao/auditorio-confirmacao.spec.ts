import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorioConfirmacao } from './auditorio-confirmacao';

describe('AuditorioConfirmacao', () => {
  let component: AuditorioConfirmacao;
  let fixture: ComponentFixture<AuditorioConfirmacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditorioConfirmacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditorioConfirmacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
