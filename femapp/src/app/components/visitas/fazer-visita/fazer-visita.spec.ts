import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazerVisita } from './fazer-visita';

describe('FazerVisita', () => {
  let component: FazerVisita;
  let fixture: ComponentFixture<FazerVisita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FazerVisita]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FazerVisita);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
