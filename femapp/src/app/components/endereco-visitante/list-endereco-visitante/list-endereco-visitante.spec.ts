import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnderecoVisitante } from './list-endereco-visitante';

describe('ListEnderecoVisitante', () => {
  let component: ListEnderecoVisitante;
  let fixture: ComponentFixture<ListEnderecoVisitante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEnderecoVisitante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEnderecoVisitante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
