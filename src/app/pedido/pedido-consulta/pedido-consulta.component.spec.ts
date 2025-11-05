import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoConsultaComponent } from './pedido-consulta.component';

describe('PedidoConsultaComponent', () => {
  let component: PedidoConsultaComponent;
  let fixture: ComponentFixture<PedidoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
