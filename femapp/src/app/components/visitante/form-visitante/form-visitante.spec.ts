import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVisitante } from './form-visitante';

describe('FormVisitante', () => {
  let component: FormVisitante;
  let fixture: ComponentFixture<FormVisitante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormVisitante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVisitante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
