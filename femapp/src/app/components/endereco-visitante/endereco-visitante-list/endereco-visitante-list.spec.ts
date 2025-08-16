import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoVisitanteList } from './endereco-visitante-list';

describe('EnderecoVisitanteList', () => {
  let component: EnderecoVisitanteList;
  let fixture: ComponentFixture<EnderecoVisitanteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnderecoVisitanteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnderecoVisitanteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
