import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionalCadastroComponent } from './opcional-cadastro.component';

describe('OpcionalCadastroComponent', () => {
  let component: OpcionalCadastroComponent;
  let fixture: ComponentFixture<OpcionalCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionalCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionalCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
