import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDocumento } from './form-documento';

describe('FormDocumento', () => {
  let component: FormDocumento;
  let fixture: ComponentFixture<FormDocumento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDocumento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDocumento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
