import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionalConsultaComponent } from './opcional-consulta.component';

describe('OpcionalConsultaComponent', () => {
  let component: OpcionalConsultaComponent;
  let fixture: ComponentFixture<OpcionalConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionalConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionalConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
