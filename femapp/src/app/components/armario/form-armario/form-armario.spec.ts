import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArmario } from './form-armario';

describe('FormArmario', () => {
  let component: FormArmario;
  let fixture: ComponentFixture<FormArmario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormArmario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormArmario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
