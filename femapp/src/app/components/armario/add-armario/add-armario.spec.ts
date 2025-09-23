import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArmario } from './add-armario';

describe('AddArmario', () => {
  let component: AddArmario;
  let fixture: ComponentFixture<AddArmario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddArmario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArmario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
