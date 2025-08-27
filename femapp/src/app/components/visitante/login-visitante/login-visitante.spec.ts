import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVisitante } from './login-visitante';

describe('LoginVisitante', () => {
  let component: LoginVisitante;
  let fixture: ComponentFixture<LoginVisitante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginVisitante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginVisitante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
