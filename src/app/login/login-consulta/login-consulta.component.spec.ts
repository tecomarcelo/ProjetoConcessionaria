import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConsultaComponent } from './login-consulta.component';

describe('LoginConsultaComponent', () => {
  let component: LoginConsultaComponent;
  let fixture: ComponentFixture<LoginConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
