import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSenha } from './reset-senha';

describe('ResetSenha', () => {
  let component: ResetSenha;
  let fixture: ComponentFixture<ResetSenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetSenha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetSenha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
