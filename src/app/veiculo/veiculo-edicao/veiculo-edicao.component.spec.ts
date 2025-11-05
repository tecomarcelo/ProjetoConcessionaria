import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoEdicaoComponent } from './veiculo-edicao.component';

describe('VeiculoEdicaoComponent', () => {
  let component: VeiculoEdicaoComponent;
  let fixture: ComponentFixture<VeiculoEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiculoEdicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiculoEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
