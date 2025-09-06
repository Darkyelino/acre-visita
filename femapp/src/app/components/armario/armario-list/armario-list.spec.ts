import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmarioList } from './armario-list';

describe('ArmarioList', () => {
  let component: ArmarioList;
  let fixture: ComponentFixture<ArmarioList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmarioList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmarioList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
