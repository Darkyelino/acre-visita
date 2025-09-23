import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArmario } from './list-armario';

describe('ListArmario', () => {
  let component: ListArmario;
  let fixture: ComponentFixture<ListArmario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListArmario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListArmario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
