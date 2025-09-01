import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmarioListComponent } from './armario-list';

describe('ArmarioList', () => {
  let component: ArmarioListComponent;
  let fixture: ComponentFixture<ArmarioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmarioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
