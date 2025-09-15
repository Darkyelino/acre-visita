import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasVisitas } from './minhas-visitas';

describe('MinhasVisitas', () => {
  let component: MinhasVisitas;
  let fixture: ComponentFixture<MinhasVisitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhasVisitas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasVisitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
