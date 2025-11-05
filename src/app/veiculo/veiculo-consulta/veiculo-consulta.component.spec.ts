import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoConsultaComponent } from './veiculo-consulta.component';

describe('VeiculoConsultaComponent', () => {
  let component: VeiculoConsultaComponent;
  let fixture: ComponentFixture<VeiculoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiculoConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiculoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
