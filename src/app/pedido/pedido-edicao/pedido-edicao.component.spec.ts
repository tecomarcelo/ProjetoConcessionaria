import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoEdicaoComponent } from './pedido-edicao.component';

describe('PedidoEdicaoComponent', () => {
  let component: PedidoEdicaoComponent;
  let fixture: ComponentFixture<PedidoEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoEdicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
