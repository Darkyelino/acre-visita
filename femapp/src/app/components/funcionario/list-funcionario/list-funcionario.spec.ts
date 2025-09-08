import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFuncionario } from './list-funcionario';

describe('ListFuncionario', () => {
  let component: ListFuncionario;
  let fixture: ComponentFixture<ListFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
