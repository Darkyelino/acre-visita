import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSetor } from './list-setor';

describe('ListSetor', () => {
  let component: ListSetor;
  let fixture: ComponentFixture<ListSetor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSetor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSetor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
